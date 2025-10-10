<script>
    import { AlertCircle } from "lucide-svelte";
    import { v1 as uuidv1 } from 'uuid';

    let { doList = $bindable(), createIssue = $bindable(false) } = $props();

    let title = $state("");
    let description = $state("");
    let dueDate = $state("");
    let storyPoints = $state("");
    let priority = $state("Low");

    let isValid = $state(false);
    let dueDateError = $state("");

    function handleCreate() {
        let issue = {
            id: uuidv1(),
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
        dueDateError = "";
    }

    function checkDueDate(dateString) {
        const now = new Date();
        const selectedDate = new Date(dateString);

        if (selectedDate < now) {
            dueDateError = "Due date cannot be in the past";
        } else {
            dueDateError = "";
        }
    }

    $effect(() => {
        isValid = title !== "" && description !== "" && dueDate !== "" && storyPoints !== "" && priority !== "";

        if (dueDate !== "") {
            checkDueDate(dueDate);
        } else {
            dueDateError = "";
        }
    });
</script>


<div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl shadow-xl p-6 w-[500px]">
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
                onclick={() => createIssue = false}
                class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
                Cancel
            </button>
            <button 
                disabled={!isValid || dueDateError != ""}
                onclick={handleCreate}
                class={`${isValid && dueDateError == "" ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300'} px-4 py-2 rounded-lg  text-white transition`}>
                Create
            </button>
        </div>
    </div>
</div>
