<script>
	let { sortBy = $bindable(), close } = $props();

	function select(value) {
		sortBy = value;
		close();
	}
</script>

<div class="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
	<dialog
		open
		class="bg-white rounded-2xl shadow-xl p-6 w-[400px] max-w-[90%] m-0 border border-gray-200"
		style="position: static; transform: none;"
	>
		<h2 class="text-lg font-semibold mb-5 text-gray-900 text-center">
			Sort Issues By
		</h2>

		<div class="flex flex-col gap-3">

			<button
				onclick={() => select('priority')}
				class={`p-4 rounded-lg border transition-all text-left ${
					sortBy === 'priority'
						? 'bg-blue-50 border-blue-400 text-blue-700 shadow-sm'
						: 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
				}`}
			>
				<span class="font-medium text-sm">Priority</span>
				<p class="text-xs text-gray-500">High → Low</p>
			</button>


			<button
				onclick={() => select('createdAt')}
				class={`p-4 rounded-lg border transition-all text-left ${
					sortBy === 'createdAt'
						? 'bg-blue-50 border-blue-400 text-blue-700 shadow-sm'
						: 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
				}`}
			>
				<span class="font-medium text-sm">Created Date</span>
                
				<p class="text-xs text-gray-500">Newest → Oldest</p>
			</button>
		</div>

		<div class="flex justify-end mt-6">
			<button
				class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition"
				onclick={close}
			>
				Cancel
			</button>
		</div>
	</dialog>
</div>
