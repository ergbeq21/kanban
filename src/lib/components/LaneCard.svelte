<script>
    import IssueCard from "./IssueCard.svelte";
    import { isPast } from "date-fns";

    let { list = $bindable(), dragOver, dropTo, startFrom, lane, title } = $props();

    let count = $derived(list.length);

    let pointsCount = $derived(
		list.reduce((total, issue) => total + (Number(issue.storyPoints) || 0), 0)
	);
    
    let avgPoints = $derived(pointsCount && count ? (pointsCount / count).toFixed(1) : 0);

    let overdueCount = $derived(
        list.filter(issue => issue.dueDate && isPast(new Date(issue.dueDate))).length
    );


</script>



<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
    ondragover={dragOver}
    ondrop={dropTo}
    class="bg-gray-50 border border-gray-200 rounded-lg p-3 w-full flex flex-col gap-2 shadow-sm">

        <h2 class="text-sm font-semibold text-gray-700 mb-2">{title}</h2>

        <div class="flex flex-col">
            <p>Issue count: {count}</p>
            <p>Points: {pointsCount}</p>
            <p>Avg points per issue: {avgPoints}</p>
            <p>Overdue: {overdueCount}</p>
        </div>
        
        {#if list.length === 0}
            <p class="text-gray-400 text-xs italic text-center py-4">No tasks</p>
        {:else}
            {#each list as issue (issue)}
                <IssueCard {issue} bind:list={list} {startFrom} {lane}/>
            {/each}
        {/if}

</section>
