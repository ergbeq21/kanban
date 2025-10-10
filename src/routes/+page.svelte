<script>
	import AddNewIssue from "$lib/components/AddNewIssue.svelte";
	import ArchiveLane from "$lib/components/lanes/ArchiveLane.svelte";
	import DoingLane from "$lib/components/lanes/DoingLane.svelte";
	import DoLane from "$lib/components/lanes/DoLane.svelte";
	import DoneLane from "$lib/components/lanes/DoneLane.svelte";

	let doList = $state([]);
	let doingList = $state([]);
	let doneList = $state([]);
	let archiveList = $state([]);
	let createIssue = $state(false);

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

	function dropToDone(event) {
		event.preventDefault();
		const itemData = event.dataTransfer.getData("text/plain");
		if (!itemData) return;

		const item = JSON.parse(itemData);
		if (doneList.find(i => i.id === item.id)) return;

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
</script>

{#if createIssue}
	<AddNewIssue bind:doList bind:createIssue />
{/if}

<header class="w-full flex items-center justify-end p-4 bg-gray-100 shadow">
	<button
		class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
		onclick={() => (createIssue = true)}>
		Add Task
	</button>
</header>

<main class="p-4 flex gap-4 w-full h-[calc(100vh-80px)] overflow-x-auto">
	<DoLane class="flex-1" bind:doList {dragOver} {dropToDo} {startFrom} />
	<DoingLane class="flex-1" bind:doingList {dragOver} {dropToDoing} {startFrom}/>
	<DoneLane class="flex-1" bind:doneList {dragOver} {dropToDone} {startFrom}/>
	<ArchiveLane class="flex-1" bind:archiveList {dragOver} {dropToArchived}{startFrom}/>
</main>
