import DateHopper from "main";
import { Notice, editorEditorField, moment } from "obsidian";
import { DateTime, Settings as LuxSettings, Info as LuxInfo } from "luxon";

export function addInsertCommands(plugin: DateHopper) {
    plugin.addCommand({
        id: "insert-today",
        name: "Insert Today",
        editorCallback: (editor, view) => {
            editor.replaceSelection(`${DateTime.now().toISODate()}`)
        }
    })

    plugin.addCommand({
        id: "insert-tomorrow",
        name: "Insert Tomorrow",
        editorCallback: (editor, view) => {
            editor.replaceSelection(`${DateTime.now().plus({days: 1}).toISODate()}`)
        }
    })
    
    plugin.addCommand({
        id: "insert-yesterday",
        name: "Insert Yesterday",
        editorCallback: (editor, view) => {
            editor.replaceSelection(`${DateTime.now().minus({days: 1}).toISODate()}`)
        }
    })

    plugin.addCommand({
        id: "insert-start-of-month",
        name: "Insert Start of Month",
        editorCallback: (editor, view) => {
            editor.replaceSelection(`${DateTime.now().startOf('month').toISODate()}`)
        }
    })

    plugin.addCommand({
        id: "insert-end-of-month",
        name: "Insert End of Month",
        editorCallback: (editor, view) => {
            editor.replaceSelection(`${DateTime.now().endOf('month').toISODate()}`)
        }
    })

    plugin.addCommand({
        id: "insert-end-of-this-workweek",
        name: "Insert End of Work Week",
        editorCallback: (editor, view) => {
            const day = plugin.settings.endOfWorkWeek
            new Notice(day)
            console.log(DateTime.now())
            new Notice(`${DateTime.now()}`)
            editor.replaceSelection(moment().endOf('week').format('YYYY-MM-DD'))
        }
    })

    plugin.addCommand({
        id: 'lux-test',
        name: 'Luxon Testing',
        editorCallback: (editor, view) => {
            console.log(new LuxSettings())
            console.log(LuxInfo.weekdays())
            console.log(DateTime.now())
        }
    })
}
