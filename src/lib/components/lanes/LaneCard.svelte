<script>
    import IssueCard from "../IssueCard.svelte";
    import { isPast } from "date-fns";
    import PaginationControlls from "./PaginationControlls.svelte";
    import { ListChecks, Target, BarChart2, AlertTriangle, Search, X,ArrowUpWideNarrow } from "lucide-svelte";
	import SortingOptions from "./SortingOptions.svelte";

    let { list = $bindable(), dragOver, dropTo, startFrom, lane, title } = $props();

    let currentPage = $state(0);
    let search = $state('');
    const itemsPerPage = 3;

    const priorityOrder = { High: 1, Medium: 2, Low: 3 };

    let sortBy = $state("createdAt"); 

    //sort component
    let sortComponent = $state(false);
    function close(){
        sortComponent = false;
    }

    let filteredList = $derived(
        (search
            ? list.filter(issue =>
                issue.title?.toLowerCase().includes(search.toLowerCase())
            )
            : [...list]
        ).sort((a, b) => {
            if (sortBy === "priority") {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            } else if (sortBy === "createdAt") {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return 0;
        })
    );

    let count = $derived(filteredList.length);
    let totalPages = $derived(Math.ceil(filteredList.length / itemsPerPage));

    let paginatedList = $derived(
        filteredList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    );

    // Lane info based on filtered list
    let pointsCount = $derived(
        filteredList.reduce((total, issue) => total + (Number(issue.storyPoints) || 0), 0)
    );
    let avgPoints = $derived(pointsCount && count ? (pointsCount / count).toFixed(1) : 0);
    let overdueCount = $derived(
        filteredList.filter(issue => issue.dueDate && isPast(new Date(issue.dueDate))).length
    );

    //return to the prev page
    $effect(() => {
        if (currentPage >= totalPages && totalPages > 0) {
            currentPage = totalPages - 1;
        } else if (totalPages === 0) {
            currentPage = 0;
        }
    });


    //pagination controlls
    function prevPage() {
        if (currentPage > 0) currentPage -= 1;
    }

    function nextPage() {
        if (currentPage < totalPages - 1) currentPage += 1;
    }

    //remove the search text
    function clearSearch() {
        search = "";
        currentPage = 0;
    }


</script>


{#if sortComponent}
    <SortingOptions {close} bind:sortBy/>
{/if}


<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
    ondragover={dragOver}
    ondrop={dropTo}
    class="bg-white border border-gray-300 rounded-md p-4 w-full flex flex-col gap-3"
>
    <h2 class="text-base font-semibold text-gray-800 flex items-center gap-2">
        {title}
    </h2>

    <div class="flex flex-wrap items-center gap-3 text-sm bg-white p-3 rounded-md border border-gray-200">
        <span class="flex items-center gap-1 text-gray-700">
            <ListChecks size={14} /> Issues: {count}
        </span>
        <span class="flex items-center gap-1 text-gray-700">
            <Target size={14} /> Total Points: {pointsCount}
        </span>
        <span class="flex items-center gap-1 text-gray-700">
            <BarChart2 size={14} /> Avg Points: {avgPoints}
        </span>
        <span class="flex items-center gap-1 text-gray-700">
            <AlertTriangle size={14} class="text-red-500" /> Overdue: {overdueCount}
        </span>
    </div>

    <div class="flex flex-row gap-1 w-full items-center">
        <div class="relative w-full">
                <Search size={15} class="absolute left-2 top-2 text-gray-400" />
                <input
                    bind:value={search}
                    type="text"
                    class="w-full h-8 pl-8 pr-8 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                    placeholder="Search issues..."
                />
                {#if search}
                    <button
                        type="button"
                        onclick={clearSearch}
                        class="absolute right-2 top-2 text-gray-400 hover:text-gray-600 transition"
                        aria-label="Clear search"
                    >
                        <X size={15} />
                    </button>
                {/if}
        </div>
        <div>
            <button class="cursor-pointer text-gray-500" onclick={()=> sortComponent = true}>
                <ArrowUpWideNarrow size="25"/>
            </button>
        </div>
    </div>

    {#if filteredList.length === 0}
        <p class="text-gray-500 text-sm italic text-center py-4">
            {#if search}
                No issues match your search
            {:else}
                No tasks available
            {/if}
        </p>
    {:else}
       
        {#each paginatedList as issue (issue)}
            <IssueCard {issue} bind:list={list} {startFrom} {lane} />
        {/each}

        <PaginationControlls {prevPage} {totalPages} {currentPage} {nextPage} />
    {/if}
</section>