<script>
	import IssueCard from "../IssueCard.svelte";
    let { doingList = $bindable(), dragOver, dropToDoing, startFrom } = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section 
ondragover={dragOver}
ondrop={dropToDoing}
class="bg-gray-50 border border-gray-200 rounded-lg p-3 w-full flex flex-col gap-2 shadow-sm">
    <h2 class="text-sm font-semibold text-gray-700 mb-2">Doing</h2>
    
    {#if doingList.length === 0}
        <p class="text-gray-400 text-xs italic text-center py-4">No tasks</p>
    {:else}
        {#each doingList as issue (issue)}
            <IssueCard bind:list={doingList} {issue} {startFrom} lane="doing"/>
        {/each}
    {/if}
</section>
