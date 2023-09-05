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
        
        new Setting(containerEl)
        .setName("End Start of Work Week")
        .setDesc("Day to use for Start of work week")
        .addDropdown(dropdown => {
            this.addDaysToDropdown(dropdown)
            dropdown.setValue(this.plugin.settings.startOfWorkWeek)
            dropdown.onChange(value => {
                this.plugin.settings.startOfWorkWeek = value
                this.plugin.saveSettings()
            })
        })

        new Setting(containerEl)
        .setName("End Start of Week")
        .setDesc("Day to use for of Next week")
        .addDropdown(dropdown => {
            this.addDaysToDropdown(dropdown)
            dropdown.setValue(this.plugin.settings.startOfWeek)
            dropdown.onChange(value => {
                this.plugin.settings.startOfWeek = value
                this.plugin.saveSettings()
            })
        })
        
    }

    addDaysToDropdown(dropdown: DropdownComponent) {
        const options = LuxInfo.weekdays()
        console.log(options)

        options.forEach((day, i) => {
            console.log(day, i)
            dropdown.addOption((i+1).toString(), day)
        })
    }
}

