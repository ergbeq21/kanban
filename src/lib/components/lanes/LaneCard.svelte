<script>
    import IssueCard from "../IssueCard.svelte";
    import { isPast } from "date-fns";
	import PaginationControlls from "./PaginationControlls.svelte";

    let { list = $bindable(), dragOver, dropTo, startFrom, lane, title } = $props();

    let currentPage = $state(0);
    const itemsPerPage = 3;

    let count = $derived(list.length);
    let totalPages = $derived(Math.ceil(list.length / itemsPerPage));
    let paginatedList = $derived(
        list.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    );


    //info ueber list
    let pointsCount = $derived(
        list.reduce((total, issue) => total + (Number(issue.storyPoints) || 0), 0)
    );
    let avgPoints = $derived(pointsCount && count ? (pointsCount / count).toFixed(1) : 0);
    let overdueCount = $derived(
        list.filter(issue => issue.dueDate && isPast(new Date(issue.dueDate))).length
    );

    //pagination
    function prevPage() {
        if (currentPage > 0) currentPage -= 1;
    }

    function nextPage() {
        if (currentPage < totalPages - 1) currentPage += 1;
    }
</script>


<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
    ondragover={dragOver}
    ondrop={dropTo}
    class="bg-white border border-gray-300 rounded-md p-4 w-full flex flex-col gap-3"
>
    <h2 class="text-base font-semibold text-gray-800">{title}</h2>

    <div class="flex flex-col text-sm bg-gray-50 p-3 rounded-md border border-gray-200">
        <p class="text-gray-700">Issues: {count}</p>
        <p class="text-gray-700">Total Points: {pointsCount}</p>
        <p class="text-gray-700">Average Points per Issue: {avgPoints}</p>
        <p class="text-gray-700">Overdue: {overdueCount}</p>
    </div>

    {#if list.length === 0}
        <p class="text-gray-500 text-sm italic text-center py-4">No tasks available</p>
    {:else}
        {#each paginatedList as issue (issue)}
            <IssueCard {issue} bind:list={list} {startFrom} {lane} />
        {/each}
        
        <PaginationControlls {prevPage} {totalPages} {currentPage} {nextPage}/>
    {/if}
</section>