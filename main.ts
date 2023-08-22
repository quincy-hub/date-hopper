import { MomentInput } from 'moment';
import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, moment } from 'obsidian';

export default class QuincyFirstPlugin extends Plugin {
	async onload() {
		new Notice("Hello")

		this.addRibbonIcon("calendar-days", "Awesomenes", () => {
			new Notice('Hi from ribbon')
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
	}

	async onunload() {

	}

	dateInRange(editor:Editor) {
		const cursor = editor.getCursor()
		const lineStr = editor.getLine(cursor.line)
		const reg = /\d{4}-\d{2}-\d{2}/gm;
		const datesOnLine = lineStr.match(reg)
		console.log('datesOnLine', datesOnLine)

		const positionsOnLine = datesOnLine?.map(d => {
			let ret = {
				from: {
					line: cursor.line,
					ch: lineStr.indexOf(d)
				}, 
				to: {
					line: cursor.line,
					ch: lineStr.indexOf(d) + d.length
				},
				cursorInRange: false
			}
			ret.cursorInRange = cursor.ch >= ret.from.ch && cursor.ch <= ret.to.ch
			return ret	
		}) || []
		console.log(cursor)
		// TODO: Handle multiselect
		const [cursorDate] = positionsOnLine.filter(p => p.cursorInRange)
		console.log('cursorDate', cursorDate)
		return cursorDate
	}

	adjustDate(editor: Editor, interval: moment.unitOfTime.DurationConstructor, value: moment.DurationInputArg1){
		const cursorDate = this.dateInRange(editor)
		if (cursorDate){
			editor.setSelection(cursorDate.from, cursorDate.to)
			const selectedDate = editor.getSelection()
			console.log('selectedDate', selectedDate)
			const mDate = moment(selectedDate)
			mDate.add(value, interval)
			const replaceValue = mDate.format('YYYY-MM-DD')
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