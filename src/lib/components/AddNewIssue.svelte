<script>
    let { doList = $bindable(), createIssue = $bindable(false) } = $props();


    let title = $state("");
    let description = $state("");
    let dueDate = $state("");
    let storyPoints = $state("");
    let priority = $state("Low");

    function handleCreate() {

        let issue = {
            title,
            description,
            dueDate,
            storyPoints,
            priority,
            createdAt: new Date().toISOString()
        };

        doList = [...doList, issue];

        createIssue = false;


        title = "";
        description = "";
        dueDate = "";
        storyPoints = "";
        priority = "Low";
    }
</script>

<div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl shadow-xl p-6 w-[400px]">
        <h2 class="text-xl font-bold mb-4">Create Issue</h2>

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
                onclick={() => createIssue = false}
                class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
                Cancel
            </button>
            <button 
                onclick={handleCreate}
                class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                Create
            </button>
        </div>
    </div>
</div>
