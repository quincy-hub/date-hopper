import DateHopper from "main";
import { App, DropdownComponent, PluginSettingTab, Setting } from "obsidian";
import { DateTime, Settings as LuxSettings, Info as LuxInfo } from "luxon";

export class DateHopperSettingsTab extends PluginSettingTab {
    plugin: DateHopper

    constructor(app: App, plugin: DateHopper){
        super(app, plugin)   
        this.plugin = plugin
    }
    
    display() {
        let { containerEl } = this
        containerEl.empty();

        new Setting(containerEl)
            .setName("End of Workweek Dropdown")
            .setDesc("Day to use for End of work week")
            .addDropdown(dropdown => {
                this.addDaysToDropdown(dropdown)
                dropdown.setValue(this.plugin.settings.endOfWorkWeek)
                dropdown.onChange(value => {
                    this.plugin.settings.endOfWorkWeek = value
                    this.plugin.saveSettings()
                })
        })

        new Setting(containerEl)
        .setName("End of Week Dropdown")
        .setDesc("Day to use for End of week")
        .addDropdown(dropdown => {
            this.addDaysToDropdown(dropdown)
            dropdown.setValue(this.plugin.settings.endOfWeek)
            dropdown.onChange(value => {
                this.plugin.settings.endOfWeek = value
                this.plugin.saveSettings()
            })
        })
    
    }

    addDaysToDropdown(dropdown: DropdownComponent) {
        const options = LuxInfo.weekdays()
        console.log(options)

        options.forEach((day, i) => {
            console.log(day, i)
            dropdown.addOption(i.toString(), day)
        })
    }
}

