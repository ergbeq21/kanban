<script>
	import { onMount } from "svelte";
	import AddNewIssue from "$lib/components/AddNewIssue.svelte";
	import LaneCard from "$lib/components/lanes/LaneCard.svelte";
	import Header from "$lib/components/Header.svelte";

	let doList = $state([]);
	let doingList = $state([]);
	let doneList = $state([]);
	let archiveList = $state([]);

	let createIssue = $state(false);

	onMount(() => {
		doList = JSON.parse(localStorage.getItem("doList") || "[]");
		doingList = JSON.parse(localStorage.getItem("doingList") || "[]");
		doneList = JSON.parse(localStorage.getItem("doneList") || "[]");
		archiveList = JSON.parse(localStorage.getItem("archiveList") || "[]");
	});

	$effect(() => {
		localStorage.setItem("doList", JSON.stringify(doList));
		localStorage.setItem("doingList", JSON.stringify(doingList));
		localStorage.setItem("doneList", JSON.stringify(doneList));
		localStorage.setItem("archiveList", JSON.stringify(archiveList));
	});

	function dragOver(event) {
		event.preventDefault();
	}

	function startFrom(item, event) {
		event.dataTransfer.setData("text/plain", JSON.stringify(item));
	}

	function removeFromAllLists(itemId) {
		doList = doList.filter(i => i.id !== itemId);
		doingList = doingList.filter(i => i.id !== itemId);
		doneList = doneList.filter(i => i.id !== itemId);
		archiveList = archiveList.filter(i => i.id !== itemId);
	}

	function dropToDo(event) {
		event.preventDefault();
		const itemData = event.dataTransfer.getData("text/plain");
		if (!itemData) return;

		const item = JSON.parse(itemData);
		if (doList.find(i => i.id === item.id)) return;

		removeFromAllLists(item.id);
		doList = [...doList, item];
	}

	function dropToDoing(event) {
		event.preventDefault();
		const itemData = event.dataTransfer.getData("text/plain");
		if (!itemData) return;

		const item = JSON.parse(itemData);
		if (doingList.find(i => i.id === item.id)) return;

		removeFromAllLists(item.id);
		doingList = [...doingList, item];
	}

	async function dropToDone(event) {
		event.preventDefault();
		const itemData = event.dataTransfer.getData("text/plain");
		if (!itemData) return;

		const item = JSON.parse(itemData);
		if (doneList.find(i => i.id === item.id)) return;

		// Notification logic
		let permission = Notification.permission;
		if (permission !== "granted") {
			permission = await Notification.requestPermission();
		}
		if (permission === "granted") {
			new Notification("Task " + item.title + " is completed", {
				body: item.description
			});
		}

		removeFromAllLists(item.id);
		doneList = [...doneList, item];
	}

	function dropToArchived(event) {
		event.preventDefault();
		const itemData = event.dataTransfer.getData("text/plain");
		if (!itemData) return;

		const item = JSON.parse(itemData);
		if (archiveList.find(i => i.id === item.id)) return;

		removeFromAllLists(item.id);
		archiveList = [...archiveList, item];
	}

	// Function to export all items as CSV
	function exportToCSV() {
		// Combine all lists with lane information
		const allIssues = [
			...doList.map(issue => ({ ...issue, lane: "To Do" })),
			...doingList.map(issue => ({ ...issue, lane: "Doing" })),
			...doneList.map(issue => ({ ...issue, lane: "Done" })),
			...archiveList.map(issue => ({ ...issue, lane: "Archived" }))
		];

		// Define CSV headers
		const headers = ["ID", "Title", "Description", "Priority", "Created At", "Due Date", "Story Points", "Lane"];
		
		// Function to escape CSV values (handle commas, quotes, and newlines)
		function escapeCSV(value) {
			if (value === null || value === undefined) return "";
			const str = value.toString();
			if (str.includes(",") || str.includes('"') || str.includes("\n")) {
				return `"${str.replace(/"/g, '""')}"`;
			}
			return str;
		}

		// Convert issues to CSV rows
		const csvRows = [
			headers.join(","),
			...allIssues.map(issue =>
				[
					issue.id,
					escapeCSV(issue.title),
					escapeCSV(issue.description),
					escapeCSV(issue.priority),
					escapeCSV(issue.createdAt),
					escapeCSV(issue.dueDate),
					issue.storyPoints || "",
					escapeCSV(issue.lane)
				].join(",")
			)
		];

		// Create CSV content
		const csvContent = csvRows.join("\n");

		// Create a Blob and download link
		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.setAttribute("href", url);
		link.setAttribute("download", "issues_export.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}
</script>

{#if createIssue}
	<AddNewIssue bind:doList bind:createIssue />
{/if}

<Header bind:createIssue {exportToCSV}/>

<main class="p-4 flex gap-4 w-full h-[calc(100vh-80px)] overflow-x-auto">

	<!--Do list-->
	<LaneCard bind:list={doList} {dragOver} dropTo={dropToDo} {startFrom} lane="do" title="To Do"/>
	<!--Doing list-->
	<LaneCard bind:list={doingList} {dragOver} dropTo={dropToDoing} {startFrom} lane="doing" title="Doing"/>
	<!--Done list-->
	<LaneCard bind:list={doneList} {dragOver} dropTo={dropToDone} {startFrom} lane="done" title="Done"/>
	<!--Archived list-->
	<LaneCard bind:list={archiveList} {dragOver} dropTo={dropToArchived} {startFrom} lane="archived" title="Archived"/>
</main>