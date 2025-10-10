<script>
	import IssueCard from "../IssueCard.svelte";
    let { doneList = $bindable(), dragOver,dropToDone,startFrom } = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section 
ondragover={dragOver}
ondrop={dropToDone}
class="bg-gray-50 border border-gray-200 rounded-lg p-3 w-full flex flex-col gap-2 shadow-sm">
    <h2 class="text-sm font-semibold text-gray-700 mb-2">Done</h2>
    
    {#if doneList.length === 0}
        <p class="text-gray-400 text-xs italic text-center py-4">No tasks</p>
    {:else}
        {#each doneList as issue}
            <IssueCard {issue} bind:list={doneList} {startFrom} lane="done"/>
        {/each}
    {/if}
</section>
