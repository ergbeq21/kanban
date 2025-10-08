<script>
    let { issue } = $props();
</script>

<div class="bg-white rounded-lg shadow p-2 border border-gray-200 w-full">
    <div class="flex justify-between items-center mb-1">
        <h3 class="text-sm font-semibold truncate">{issue.title}</h3>
        <span class="px-1.5 py-0.5 text-[10px] rounded 
            {issue.priority === 'High' ? 'bg-red-100 text-red-600' : ''}
            {issue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' : ''}
            {issue.priority === 'Low' ? 'bg-green-100 text-green-600' : ''}">
            {issue.priority}
        </span>
    </div>

    <p class="text-gray-700 text-xs mb-2 line-clamp-2">{issue.description}</p>

    <div class="grid grid-cols-2 gap-1 text-[11px] text-gray-500">
        <div>
            <span class="font-medium">Created:</span> 
            {new Date(issue.createdAt).toLocaleDateString()}
        </div>
        <div>
            <span class="font-medium">Due:</span> 
            {issue.dueDate ? new Date(issue.dueDate).toLocaleDateString() : "—"}
        </div>
        <div>
            <span class="font-medium">Points:</span> {issue.storyPoints}
        </div>
    </div>
</div>
