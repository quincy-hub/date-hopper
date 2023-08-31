import { ItemView, Notice } from "obsidian";


export const DATEHOPPPER_VIEW_TYPE = "Date-Hopper-view"

export class DateHopperView extends ItemView{
    getViewType(): string {
        return DATEHOPPPER_VIEW_TYPE
    }
    getDisplayText(): string {
        return 'Date Hopper title'
    }
    
    async onOpen() {
        new Notice('onOpen')
        const {contentEl} = this
        contentEl.createEl('h1', {text: "Calendar"})

    }

    
}  