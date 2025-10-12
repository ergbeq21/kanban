/**
 * @param {Object} issue
 */
export function exportAsICS(issue) {
	if (!issue?.dueDate) {
		alert("This issue has no due date to export.");
		return;
	}

	const formatICSDate = (date) => {
		return new Date(date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
	};

	const dtStamp = formatICSDate(new Date());
	const dtStart = formatICSDate(issue.createdAt || new Date());
	const dtEnd = formatICSDate(issue.dueDate);

	const ics = [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"PRODID:-//YourApp//Issue Export//EN",
		"CALSCALE:GREGORIAN",
		"METHOD:PUBLISH",
		"BEGIN:VEVENT",
		`UID:${issue.id}@yourapp.com`,
		`DTSTAMP:${dtStamp}`,
		`DTSTART:${dtStart}`,
		`DTEND:${dtEnd}`,
		`SUMMARY:${issue.title?.replace(/\r?\n|\r/g, " ") || "No Title"}`,
		`DESCRIPTION:${(issue.description || "").replace(/\r?\n|\r/g, " ")}`,
		`PRIORITY:${issue.priority === "High" ? 1 : issue.priority === "Medium" ? 5 : 9}`,
		"END:VEVENT",
		"END:VCALENDAR"
	].join("\r\n");

	const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = `${issue.title.replace(/\s+/g, "_")}.ics`;
	a.click();

	URL.revokeObjectURL(url);
}
