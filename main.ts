import { MomentInput } from 'moment';
import { App, Editor, EditorPosition, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, moment } from 'obsidian';
// import { DateHopperSettingsTab } from 'settings';
// import { DATEHOPPPER_VIEW_TYPE, DateHopperView } from 'view';

// interface DateHopperPluginSettings {
// 	endOfWeek: string
// }

interface EditorDateRange {
	from: EditorPosition,
	to: EditorPosition,
	cursorInDate: boolean,
	dateStr: string,
	mDate: moment.Moment
}


// const DEFAULT_SETTINGS: Partial<DateHopperPluginSettings> = {
// 	endOfWeek: 'Friday',
// }


export default class DateHopper extends Plugin {
	// settings: DateHopperPluginSettings

	// async loadSettings() {
	// 	// Bring data from data.json in the plugin directory, this creates a clone of the object so you don't update the defaults in the data.json file when you change settings.
	// 	this.settings = Object.assign(
	// 		{},
	// 		DEFAULT_SETTINGS,
	// 		await this.loadData()
	// 	);
	// }

	// async saveSettings(){
	// 	this.saveData(this.settings)
	// }

	async onload() {
		// await this.loadSettings()
		
		// this.addSettingTab(new DateHopperSettingsTab(this.app, this))
		
		// this.addRibbonIcon("eye", "Testing Settings", () => {
		// 	this.openView()
		// })
		
		// this.registerView(DATEHOPPPER_VIEW_TYPE, (leaf) => new DateHopperView(leaf))
		

		// Status Bar
		const statusBarEl = this.addStatusBarItem();

		// Alter Commands
		this.addCommand({
			id: 'change-status',
			name: 'Change Status',
			callback: () => {
				statusBarEl.setText('sup')
			}
		})

		this.addCommand({
			id: "next-day",
			name: "Add a day",
			editorCallback: (editor, view) => {
				this.adjustDate(editor, 'days', 1)
			},
		})

		this.addCommand({
			id: "previous-day",
			name: "Subtract a day",
			editorCallback: (editor, view) => {
				this.adjustDate(editor, 'days', -1)
			},
		})

		this.addCommand({
			id: "add-week",
			name: "Add a week",
			editorCallback: (editor, view) => {
				this.adjustDate(editor, 'days', 7)
			},
		})

		this.addCommand({
			id: "subtract-week",
			name: "Subtract a week",
			editorCallback: (editor, view) => {
				this.adjustDate(editor, 'days', -7)
			},
		})

		// Insert Commands
		this.addCommand({
			id: "insert-today",
			name: "Insert Today",
			editorCallback: (editor, view) => {
				this.insertDate(editor, 'insert-today')
			}
		})

		this.addCommand({
			id: "insert-tomorrow",
			name: "Insert Tomorrow",
			editorCallback: (editor, view) => {
				this.insertDate(editor, 'insert-tomorrow')
			}
		})

		this.addCommand({
			id: "insert-yesterday",
			name: "Insert Yesterday",
			editorCallback: (editor, view) => {
				this.insertDate(editor, 'insert-yesterday')
			}
		})

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
			const cursorInfo = this.dateInRange(cEditor)
			if (cursorInfo){
				console.log(cursorInfo.mDate.format('dddd'))
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

	// openView() {
	// 	this.app.workspace.detachLeavesOfType(DATEHOPPPER_VIEW_TYPE)
	// 	const leaf = this.app.workspace.getRightLeaf(true)
	// 	leaf.setViewState({type: DATEHOPPPER_VIEW_TYPE})
	// 	this.app.workspace.revealLeaf(leaf)
	// }

	dateInRange(editor:Editor) {
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
		// console.log(cursor)
		// TODO: Handle multiselect
		const [cursorDate] = positionsOnLine.filter(p => p.cursorInDate)
		// console.log('cursorDate', cursorDate)
		return cursorDate
	}


	adjustDate(editor: Editor, interval: moment.unitOfTime.DurationConstructor, value: moment.DurationInputArg1){
		const cursorInfo = this.dateInRange(editor)
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


	insertDate(editor: Editor, selection: string){
		let dateToInsert = ''

		switch (selection) {
			case ('insert-today'):
				dateToInsert = moment().format('YYYY-MM-DD')
				break
			case ('insert-tomorrow'):
				dateToInsert = moment().add(1, 'days').format('YYYY-MM-DD')
				break
			case ('insert-yesterday'):
				dateToInsert = moment().add(-1, 'days').format('YYYY-MM-DD')
				break				
			default:
				new Notice('not today')
				break
		}

		editor.replaceSelection(dateToInsert)
	}
}