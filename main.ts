import { App, Editor, EditorPosition, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, moment } from 'obsidian';
import { DateHopperSettingsTab } from 'settings';
import { DATEHOPPPER_VIEW_TYPE, DateHopperView } from 'view';
import { addAlterCommands } from 'commands-alter';
import { addInsertCommands } from 'commands-insert';

interface DateHopperPluginSettings {
	endOfWeek: string,
	endOfWorkWeek: string,
}

interface EditorDateRange {
	from: EditorPosition,
	to: EditorPosition,
	cursorInDate: boolean,
	dateStr: string,
	mDate: moment.Moment
}


const DEFAULT_SETTINGS: Partial<DateHopperPluginSettings> = {
	endOfWeek: '5',
	endOfWorkWeek: '4',
}


export default class DateHopper extends Plugin {
	settings: DateHopperPluginSettings

	async loadSettings() {
		// Bring data from data.json in the plugin directory, this creates a clone of the object so you don't update the defaults in the data.json file when you change settings.
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings(){
		this.saveData(this.settings)
	}

	async onload() {
		await this.loadSettings()
		this.addSettingTab(new DateHopperSettingsTab(this.app, this))
		
		this.addRibbonIcon("eye", "Testing Settings", () => {
			this.openView()
		})
		
		this.registerView(DATEHOPPPER_VIEW_TYPE, (leaf) => new DateHopperView(leaf))
		
		// Status Bar
		const statusBarEl = this.addStatusBarItem();
		
		// Add Commands
		addAlterCommands(this)
		addInsertCommands(this)

		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			this.updateStatusBar(statusBarEl)
		})

		this.registerDomEvent(document, 'keyup', (evt: KeyboardEvent) => {
			this.updateStatusBar(statusBarEl)
		})



	}

	async onunload() {

	}

	updateStatusBar(statusBarEl: HTMLElement) {
		const cEditor = this.app.workspace.activeEditor?.editor
		if (cEditor){
			const cursorInfo = this.isDateInRange(cEditor)
			if (cursorInfo){
				statusBarEl.setText(`${cursorInfo.mDate.format('dddd')}`)
			} 
			else {
				statusBarEl.setText('')
			}
		}
		else {
			statusBarEl.setText('')
		}
	}

	openView() {
		this.app.workspace.detachLeavesOfType(DATEHOPPPER_VIEW_TYPE)
		const leaf = this.app.workspace.getRightLeaf(false)
		leaf.setViewState({type: DATEHOPPPER_VIEW_TYPE})
		this.app.workspace.revealLeaf(leaf)
	}

	isDateInRange(editor:Editor) {
		const cursor = editor.getCursor()
		const lineStr = editor.getLine(cursor.line)
		const reg = /\d{4}-\d{2}-\d{2}/gm;
		const datesOnLine = lineStr.match(reg)

		const positionsOnLine = datesOnLine?.map(d => {
			let ret : EditorDateRange = {
				from: {
					line: cursor.line,
					ch: lineStr.indexOf(d)
				}, 
				to: {
					line: cursor.line,
					ch: lineStr.indexOf(d) + d.length
				},
				cursorInDate: false,
				dateStr: d,
				mDate: moment(d)
			}
			ret.cursorInDate = cursor.ch >= ret.from.ch && cursor.ch <= ret.to.ch
			return ret	
		}) || []
		// TODO: Handle multiselect
		const [cursorDate] = positionsOnLine.filter(p => p.cursorInDate)
		return cursorDate
	}


	adjustDate(editor: Editor, interval: moment.unitOfTime.DurationConstructor, value: moment.DurationInputArg1){
		const cursorInfo = this.isDateInRange(editor)
		if (cursorInfo){
			editor.setSelection(cursorInfo.from, cursorInfo.to)
			cursorInfo.mDate.add(value, interval)
			const replaceValue = cursorInfo.mDate.format('YYYY-MM-DD')
			editor.replaceSelection(replaceValue)
		}
		else {
			new Notice(`No Date found under cursor.`, 3000)
		}
	}
}