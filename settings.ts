import DateHopper from "main";
import { App, PluginSettingTab, Setting } from "obsidian";

export class DateHopperSettingsTab extends PluginSettingTab {
    plugin: DateHopper

    constructor(app: App, plugin: DateHopper){
        super(app, plugin)   

        this.plugin = plugin
    }
    
    display() {
        let { containerEl } = this
        containerEl.empty();

        // containerEl.createEl("h1", {text: 'Date Hopper Settings'})
        // new Setting(containerEl)
        //     .setName("End of Week")
        //     .setDesc("Day to use for End of week")
        //     .addText((item => {
        //         item.setValue(this.plugin.settings.endOfWeek).onChange(
        //             (value) => {
        //                 this.plugin.settings.endOfWeek = value;
        //                 this.plugin.saveSettings()
        //             }
        //         )
        //     })
        // )

        new Setting(containerEl)
            .setName("End of Week Dropdown")
        .setDesc("Day to use for End of week as Dropdown")
        .addDropdown(dropdown => {
            dropdown.addOption('sunday', 'Sunday')
            dropdown.addOption('monday', 'Monday')
            dropdown.addOption('tuesday', 'Tuesday')
            dropdown.addOption('wednesday', 'Wednesday')
            dropdown.addOption('thursday', 'Thursday')
            dropdown.addOption('friday', 'Friday')
            dropdown.addOption('saturday', 'Saturday')
            dropdown.setValue(this.plugin.settings.endOfWeek)
            dropdown.onChange(value => {
                this.plugin.settings.endOfWeek = value
                this.plugin.saveSettings()
            })
        })
    
    }
}