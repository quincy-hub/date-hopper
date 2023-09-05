import DateHopper from "main";
import { App, Notice, Plugin } from "obsidian";

export function addAlterCommands(plugin: DateHopper) {
    plugin.addCommand({
        id: "next-day",
        name: "Add a day",
        editorCallback: (editor, view) => {
            plugin.adjustDate(editor, 'days', 1)
        },
    })

    plugin.addCommand({
        id: "previous-day",
        name: "Subtract a day",
        editorCallback: (editor, view) => {
            plugin.adjustDate(editor, 'days', -1)
        },
    })

    plugin.addCommand({
        id: "add-week",
        name: "Add a week",
        editorCallback: (editor, view) => {
            plugin.adjustDate(editor, 'days', 7)
        },
    })

    plugin.addCommand({
        id: "subtract-week",
        name: "Subtract a week",
        editorCallback: (editor, view) => {
            plugin.adjustDate(editor, 'days', -7)
        },
    })
}