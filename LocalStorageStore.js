import { BaseStorage } from './BaseStorage.js';

export class LocalStorageStore extends BaseStorage {
    
    constructor(storageKey) {
        super();
        this.storageKey = storageKey;
    }

    load() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : {};
    }

    save(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }
}
