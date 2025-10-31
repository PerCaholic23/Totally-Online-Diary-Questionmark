export class DiaryUI {
    constructor(options) {
        this.elements = {
            entryList: document.getElementById(options.entryList),
            noEntries: document.getElementById(options.noEntries),
            editor: document.getElementById(options.editor),
            editorDate: document.getElementById(options.editorDate),
            saveBtn: document.getElementById(options.saveBtn),
            deleteBtn: document.getElementById(options.deleteBtn),
            newEntryBtn: document.getElementById(options.newEntryBtn),
            toast: document.getElementById(options.toast)
        };
    }

    onSaveClick(callback) {
        this.elements.saveBtn.addEventListener('click', callback);
    }

    onDeleteClick(callback) {
        this.elements.deleteBtn.addEventListener('click', callback);
    }

    onNewEntryClick(callback) {
        this.elements.newEntryBtn.addEventListener('click', callback);
    }

    formatDateForDisplay(dateString) {
        // Adding T00:00:00 fixes potential timezone issues
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    renderEntryList(db, onEntryClick) {
        while (this.elements.entryList.children.length > 1) {
            this.elements.entryList.removeChild(this.elements.entryList.lastChild);
        }

        const dates = Object.keys(db).sort().reverse();

        if (dates.length > 0) {
            this.elements.noEntries.style.display = 'none';
            
            dates.forEach(date => {
                const entry = db[date];
                const snippet = entry.substring(0, 40) + (entry.length > 40 ? '...' : '');
                
                const button = document.createElement('button');
                button.className = 'entry-button';
                button.dataset.date = date;
                
                button.innerHTML = `
                    <h4>${this.formatDateForDisplay(date)}</h4>
                    <p>${snippet || 'Empty entry'}</p>
                `;
                
                button.addEventListener('click', () => onEntryClick(date));
                this.elements.entryList.appendChild(button);
            });
        } else {
            this.elements.noEntries.style.display = 'block';
        }
    }

    updateActiveEntryButton(date) {
        this.elements.entryList.querySelectorAll('.entry-button').forEach(btn => {
            if (btn.dataset.date === date) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    showToast(message) {
        this.elements.toast.textContent = message;
        this.elements.toast.classList.add('show');
        setTimeout(() => {
            this.elements.toast.classList.remove('show');
        }, 2000);
    }

    getEditorText() {
        return this.elements.editor.value;
    }

    loadEntry(date, content, entryExists) {
        this.elements.editorDate.textContent = this.formatDateForDisplay(date);
        this.elements.editor.value = content;
        this.elements.saveBtn.disabled = false;
        this.elements.deleteBtn.style.display = entryExists ? 'inline-block' : 'none';
        this.updateActiveEntryButton(date);
        this.elements.editor.focus();
    }
}

