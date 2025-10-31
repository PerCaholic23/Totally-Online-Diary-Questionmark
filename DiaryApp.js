import { DiaryUI } from './DiaryUI.js';
import { BaseStorage } from './BaseStorage.js';

export class DiaryApp {
    constructor(options, store) {
        if (!(store instanceof BaseStorage)) {
            throw new Error('The "store" must be an instance of BaseStorage.');
        }

        this.ui = new DiaryUI(options);
        this.store = store;
        this.currentEditingDate = null;
        this.db = {};
    }

    init() {
        this.db = this.store.load(); 
        
        this.addEventListeners();
        this.refreshEntryList();
        this.loadEntry(this.getTodayDateString());
    }

    addEventListeners() {
        this.ui.onSaveClick(() => this.saveEntry());
        this.ui.onDeleteClick(() => this.deleteEntry());
        this.ui.onNewEntryClick(() => this.handleNewEntry());
    }

    getTodayDateString() {
        return new Date().toISOString().split('T')[0];
    }

    refreshEntryList() {
        this.ui.renderEntryList(this.db, (date) => {
            this.loadEntry(date);
        });
    }

    loadEntry(date) {
        this.currentEditingDate = date;
        const content = this.db[date] || '';
        const entryExists = this.db.hasOwnProperty(date);
        
        this.ui.loadEntry(date, content, entryExists);
    }

    saveEntry() {
        if (this.currentEditingDate) {
            const text = this.ui.getEditorText().trim();
            this.db[this.currentEditingDate] = text;
            this.store.save(this.db);
            this.refreshEntryList();
            this.ui.updateActiveEntryButton(this.currentEditingDate);
            this.ui.showToast('Entry saved!');
            this.ui.loadEntry(this.currentEditingDate, text, true);
        }
    }

    deleteEntry() {
        if (this.currentEditingDate && this.db.hasOwnProperty(this.currentEditingDate)) {
            if (confirm('Are you sure you want to delete this entry?')) {
                delete this.db[this.currentEditingDate];
                this.store.save(this.db);
                this.refreshEntryList();
                this.loadEntry(this.getTodayDateString());
                this.ui.showToast('Entry deleted.');
            }
        }
    }

    handleNewEntry() {
        this.loadEntry(this.getTodayDateString());
    }
}
