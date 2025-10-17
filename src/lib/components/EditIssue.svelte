<script>
	import { AlertCircle } from "lucide-svelte";
	import { v1 as uuidv1 } from 'uuid';

	let { issue, editIssue = $bindable(), list = $bindable() } = $props();

	let title = $state(issue.title);
	let description = $state(issue.description);
	let dueDate = $state(issue.dueDate);
	let storyPoints = $state(issue.storyPoints);
	let priority = $state(issue.priority);

	let isValid = $state(false);
	let dueDateError = $state("");

	$effect(()=>{
		if (!title.trim()) return false;
		if (dueDate && new Date(dueDate) < new Date()) {
			dueDateError = "Due date cannot be in the past.";
			return false;
		}
		dueDateError = "";
		return true;
	})

	function saveUpdatedIssue() {

		const updatedIssue = {
			...issue,
			title: title.trim(),
			description: description.trim(),
			dueDate,
			storyPoints: Number(storyPoints),
			priority,
			updatedAt: new Date().toISOString()
		};

		list = list.map((i) => (i.id === issue.id ? updatedIssue : i));
		editIssue = false;
	}
</script>

<div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
	<dialog 
		open 
		class="bg-white rounded-2xl shadow-xl p-6 w-[500px] max-w-[90%] m-0"
		style="position: static; transform: none;"
	>
		<h2 class="text-xl font-bold mb-4">Edit Issue {issue.title}</h2>

		<div class="space-y-3">
			<input 
				bind:value={title}
				class="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
				placeholder="Title" />

			<textarea 
				bind:value={description}
				class="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
				rows="3"
				placeholder="Description"></textarea>

			<input 
				type="date"
				bind:value={dueDate}
				class="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

			{#if dueDateError !== ""}
				<p class="text-red-600 text-sm flex items-center gap-1 ml-2">
					<AlertCircle size={16} class="flex-shrink-0" />
					{dueDateError}
				</p>
			{/if}

			<input 
				type="number"
				bind:value={storyPoints}
				class="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Story Points" />

			<select 
				bind:value={priority}
				class="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
				<option>Low</option>
				<option>Medium</option>
				<option>High</option>
			</select>
		</div>

		<div class="flex justify-end gap-2 mt-5">
			<button 
				onclick={() => editIssue = false}
				class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
				Cancel
			</button>
			<button 
				disabled={dueDateError != ""}
				onclick={saveUpdatedIssue}
				class={`${dueDateError != "" ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-700"} px-4 py-2 rounded-lg  text-white transition`}>
				Save Changes
			</button>
		</div>
	</dialog>
</div>
