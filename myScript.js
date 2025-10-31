import { DiaryApp } from './DiaryApp.js';
import { LocalStorageStore } from './LocalStorageStore.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const options = {
        entryList: 'entry-list',
        noEntries: 'no-entries',
        editor: 'editor',
        editorDate: 'editor-date',
        saveBtn: 'save-btn',
        deleteBtn: 'delete-btn',
        newEntryBtn: 'new-entry-btn',
        toast: 'toast'
    };

    const store = new LocalStorageStore('simpleDiaryDB');

    const diaryApp = new DiaryApp(options, store);
    
    diaryApp.init();
});

