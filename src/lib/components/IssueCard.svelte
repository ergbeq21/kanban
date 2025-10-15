<script>
	import { exportAsICS } from '$lib/utils/export';
	import { Trash2, Share2, Calendar,SquarePen } from 'lucide-svelte';
	import { format, formatDistanceToNow, isPast } from 'date-fns';
	import EditIssue from './EditIssue.svelte';

	let { issue, list = $bindable(), startFrom, lane } = $props();

	function removeIssue() {
		list = list.filter(i => i !== issue);
	}

	const laneStyles = {
		do: 'border-blue-300 bg-blue-50',
		doing: 'border-yellow-300 bg-yellow-50',
		done: 'border-green-300 bg-green-50',
		archived: 'border-gray-300 bg-gray-50 text-gray-400'
	};

	let isDueDateWarning = $state(false);

	$effect(() => {
		if (lane == "do" || lane == "doing") {
			if (issue?.dueDate) {
				const now = new Date();
				const dueDate = new Date(issue.dueDate);
				isDueDateWarning = dueDate < now;
			} else {
				isDueDateWarning = false;
			}
		}
	});

	// notification
	async function notify() {
		let permission = Notification.permission;
		if (permission !== "granted") {
			permission = await Notification.requestPermission();
		}
		if (permission === "granted") {
			new Notification("Task " + issue?.title + " is completed", {
				body: issue?.description
			});
		}
	}

	$effect(() => {
		if (lane === "done") {
			notify();
		}
	});

	// share 
	async function share() {
		await navigator.share({
			title: issue?.title,
			text: issue?.description || "No issue available",
		});
	}

	//export as ICS
	function handleExport() {
		exportAsICS(issue);
	}

	let editIssue = $state(false);
	let issueToEdit = $state(null);

	function handleEdit(issue){
		issueToEdit = issue;
		editIssue = true;
	}
</script>

<article
	ondragstart={(event) => startFrom(issue, event)}
	draggable="true"
	class={`
	${isDueDateWarning ? 'border-red-300 bg-red-50' : `${laneStyles[lane] || 'border-gray-200 bg-white'}`}
	 rounded-lg border p-3 w-full relative group transition-all duration-200`}>

	<button
		onclick={removeIssue}
		class="absolute bottom-2 right-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-600"
		title="Delete Issue">
		<Trash2 size={16} />
	</button>

	<div class="flex justify-between items-center mb-1">
		<div class="flex items-center gap-1">
			<h3 class="text-sm font-semibold truncate">{issue.title}</h3>
			{#if isDueDateWarning}
				<span class="text-[10px] text-red-600 font-semibold">(Due date is over)</span>
			{/if}
		</div>
		<div class="flex flex-row gap-1 items-center">
			<span
				class="px-1.5 py-0.5 text-[10px] rounded
					{issue.priority === 'High' ? 'bg-red-100 text-red-600' : ''}
					{issue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' : ''}
					{issue.priority === 'Low' ? 'bg-green-100 text-green-600' : ''}">
				{issue.priority}
			</span>

			<button title="Edit issue" class="cursor-pointer" onclick={()=> editIssue = true}>
				<SquarePen size={13}/>
			</button>

			<button onclick={handleExport} title="Export as .ics" class="cursor-pointer">
				<Calendar size={13}/>
			</button>

			<button onclick={share} title="Share" class="cursor-pointer">
				<Share2 size={13}/>
			</button>
		</div>
	</div>

	<p class="text-gray-700 text-xs mb-2 line-clamp-2">{issue.description}</p>

	<div class="grid grid-cols-1 gap-1 text-[11px] text-gray-500">
		<div>
			<span class="font-medium">Created:</span>
			{issue.createdAt ? format(new Date(issue.createdAt), "PP") : '—'}
			<span class="text-gray-400"> ({formatDistanceToNow(new Date(issue.createdAt))} ago)</span>
		</div>
		<div>
			<span class="font-medium">Due:</span>
			{issue.dueDate
				? `${format(new Date(issue.dueDate), "PP")} (${formatDistanceToNow(new Date(issue.dueDate))})`
				: '—'}
		</div>
		<div>
			<span class="font-medium">Points:</span> {issue.storyPoints}
		</div>
	</div>
</article>


{#if editIssue}

<EditIssue {issue} bind:editIssue/>

{/if}
