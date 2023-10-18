<script lang="ts">

import {Arrow_right} from "svelte-google-materialdesign-icons"

export const fileMenu = {
    items: [[,"New Project","Ctrl+Shift+N"], ["🗁"," Open Project", "Ctrl+O"], ["🗁","Recent Projects", ""], 
    ["🖪","Save Project", "Ctrl+S"], ["🖪","Save Project As", "Ctrl+Shift+S"], ["🗹","New Test Plan", "Ctrl+T"], 
    ["🖼","Export As Png", "Ctrl+L"], ["🖼","Export Without Border As Png", ""]],
    name: "File",
    open: false
};

export const editMenu = {
    items: [[<Arrow_right/>,"Move All Nodes Right", "Ctrl+→"], ["←","Move All Nodes Left", "Ctrl+←"], ["↑","Move All Nodes Up", "Ctrl+↑"],["↓","Move All Nodes Down", "Ctrl+↓"]],
    name: "Edit",
    open: false
};

export const viewMenu = {
    items: [["","Project Panel","Ctrl+P"], ["","Query Panel","Ctrl+G"], ["","Autoscalling",""], ["","Scalling",""], ["⊞","Split Canvas",""]],
    name: "View",
    open: false,
};


export const optionsMenu = {
    items: [["","UI Cache",""], ["","Periodic Query Execution",""], ["","Engine Options",""]],
    name: "Options",
    open: false
};

export const helpMenu = {
    items: [["?","Modelling Help",""], ["?","Testing Help",""], ["!","About",""]],
    name: "Help",
    open: false
};
</script>







