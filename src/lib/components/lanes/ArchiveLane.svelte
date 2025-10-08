<script>
	import IssueCard from "../IssueCard.svelte";
    let { archiveList = $bindable() } = $props();
</script>

<section class="bg-gray-50 border border-gray-200 rounded-lg p-3 w-full flex flex-col gap-2 shadow-sm">
    <h2 class="text-sm font-semibold text-gray-700 mb-2">Archived</h2>
    
    {#if archiveList.length === 0}
        <p class="text-gray-400 text-xs italic text-center py-4">No tasks</p>
    {:else}
        {#each archiveList as issue}
            <IssueCard {issue}/>
        {/each}
    {/if}
</section>
