export class BaseStorage {
    constructor() {
        if (this.constructor === BaseStorage) {
            throw new Error("Abstract class 'BaseStorage' cannot be instantiated directly.");
        }
    }

    load() {
        throw new Error("Method 'load()' must be implemented by a subclass.");
    }

    save(data) {
        throw new Error("Method 'save(data)' must be implemented by a subclass.");
    }
}
