<script>
	import IssueCard from "../IssueCard.svelte";
    let { doList = $bindable() } = $props();
</script>

<section class="bg-gray-50 border border-gray-200 rounded-lg p-3 w-full flex flex-col gap-2 shadow-sm">
    <h2 class="text-sm font-semibold text-gray-700 mb-2">To Do</h2>
    
    {#if doList.length === 0}
        <p class="text-gray-400 text-xs italic text-center py-4">No tasks</p>
    {:else}
        {#each doList as issue}
            <IssueCard {issue}/>
        {/each}
    {/if}
</section>
