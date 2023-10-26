import { Component } from "$lib/classes/automaton";
import { activeView } from "$lib/globalState/activeProject";
import type { Location } from "$lib/classes/automaton/Location";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

// a record that stores the location with the key being the location's id field
export const locationRecord: Writable<Record<string, Location>> = writable({});

// update record
activeView.subscribe((view) => {
    if (view === undefined) return;
    if (view instanceof Component) {
        for (const location of view.locations) {
            locationRecord.update(currentRecord => {
                
                // Make a copy of the record, set the new value, and return it
                const updatedRecord = {...currentRecord}; // Using object spread to create a shallow copy
                updatedRecord[location.id] = location;
                return updatedRecord;
            });
        }
    }
});
