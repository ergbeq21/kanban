# Svelte Kanban Board

Ein **intuitives und modernes Kanban-Board**, entwickelt mit **Svelte** und **SvelteKit**.  
Organisiere und verfolge deine Aufgaben effizient: **Drag-and-Drop zwischen Lanes**, 
Prioritäten setzen, Fälligkeitstermine überwachen und
Aufgaben schnell verwalten – alles in einer schlanken, responsiven Oberfläche.

---

## Features

- Aufgaben erstellen, bearbeiten und löschen  
- Drag-and-Drop zwischen Lanes (`To Do`, `Doing`, `Done`, `Archived`)  
- Pagination & Suche für Aufgaben  
- Aufgabeninformationen: Titel, Beschreibung, Due-Date, Priorität, Story Points  
- Benachrichtigungen für erledigte Aufgaben  
- Einzelne Aufgaben als `.ICS` Kalenderereignis exportierbar  
- Sauberes, responsives Design mit **Lucide Icons**  

---

## Setup & Installation

### Voraussetzungen
- Node.js (v18+ empfohlen)  
- Paketmanager: npm, pnpm oder yarn

### Projekt erstellen
```bash
# Neues Svelte Projekt im aktuellen Ordner erstellen
npx sv create

# Oder Projekt in einem Unterordner erstellen
npx sv create my-app
