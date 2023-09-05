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
            const endDay = plugin.settings.endOfWorkWeek
            const daysToAdd = (endDay - DateTime.now().weekday + 7) % 7

            editor.replaceSelection(`${DateTime.now().plus({days: daysToAdd}).toISODate()}`)
        }
    })

    plugin.addCommand({
        id: "insert-end-of-this-week",
        name: "Insert End of Week",
        editorCallback: (editor, view) => {
            const endDay = plugin.settings.endOfWeek
            const daysToAdd = (endDay - DateTime.now().weekday + 7) % 7
            editor.replaceSelection(`${DateTime.now().plus({days: daysToAdd}).toISODate()}`)
        }
    })

    plugin.addCommand({
        id: "insert-start-of-next-week",
        name: "Insert Start of Next Week",
        editorCallback: (editor, view) => {
            const endDay = plugin.settings.startOfWeek
            const daysToAdd = (endDay - DateTime.now().weekday + 7) % 7 || 7
            editor.replaceSelection(`${DateTime.now().plus({days: daysToAdd}).toISODate()}`)
        }
    })

    plugin.addCommand({
        id: "insert-start-of-next-work-week",
        name: "Insert Start of Next Work Week",
        editorCallback: (editor, view) => {
            const endDay = plugin.settings.startOfWorkWeek
            const daysToAdd = (endDay - DateTime.now().weekday + 7) % 7 || 7
            editor.replaceSelection(`${DateTime.now().plus({days: daysToAdd}).toISODate()}`)
        }
    })

    plugin.addCommand({
        id: 'lux-test',
        name: 'Luxon Testing',
        editorCallback: (editor, view) => {
            console.log(new LuxSettings())
            console.log(LuxInfo.weekdays())
            console.log(DateTime.now())
            const adds = [0,1,2,3,4,5,6,7]
            adds.forEach(num => {
                let lux = DateTime.now().plus({days:num})
                console.log(`${lux.weekday} - ${lux.weekdayLong}`)
            })
        }
    })
}
