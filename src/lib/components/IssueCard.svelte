<script>
	import { Trash2 } from 'lucide-svelte';
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
</script>

<article
	ondragstart={(event) => startFrom(issue, event)}
	draggable="true"
	class={`rounded-lg border p-2 w-full relative group transition-all duration-200
		${laneStyles[lane] || 'border-gray-200 bg-white'}`}>


	<button
		onclick={removeIssue}
		class="absolute bottom-2 right-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-600"
		title="Delete Issue">
		<Trash2 size={16} />
	</button>


	<div class="flex justify-between items-center mb-1">
		<h3 class="text-sm font-semibold truncate">{issue.title}</h3>
		<span
			class="px-1.5 py-0.5 text-[10px] rounded
				{issue.priority === 'High' ? 'bg-red-100 text-red-600' : ''}
				{issue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' : ''}
				{issue.priority === 'Low' ? 'bg-green-100 text-green-600' : ''}">
			{issue.priority}
		</span>
	</div>


	<p class="text-gray-700 text-xs mb-2 line-clamp-2">{issue.description}</p>


	<div class="grid grid-cols-1 gap-1 text-[11px] text-gray-500">
		<div>
			<span class="font-medium">Created:</span>
			{new Date(issue.createdAt).toLocaleDateString()}
		</div>
		<div>
			<span class="font-medium">Due:</span>
			{issue.dueDate ? new Date(issue.dueDate).toLocaleDateString() : '—'}
		</div>
		<div>
			<span class="font-medium">Points:</span> {issue.storyPoints}
		</div>
	</div>
</article>
