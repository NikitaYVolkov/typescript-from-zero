import { Note, NoteDraft, SortOrder } from '.';

export class Notebook {
	private notes: Note[] = [];

	getNotes(): Note[] {
		return this.notes;
	}

	addNote(noteDraft: NoteDraft): void {
		this.notes.push({ id: this.notes.length, ...noteDraft });
	}

	clone(): Notebook {
		const clonedNotebook = new Notebook();
		for (const note of this.notes) {
			clonedNotebook.addNote({ date: note.date, title: note.title });
		}
		return clonedNotebook;
	}

	sortById(order: SortOrder): this {
		switch (order) {
			case SortOrder.ASC:
				this.notes.sort((a, b) => a.id - b.id);
				break;
			case SortOrder.DESC:
				this.notes.sort((a, b) => b.id - a.id);
				break;
			default:
				throw new Error(`Unexpected sort order: ${order}`);
		}
		return this;
	}

	sortByDate(order: SortOrder): this {
		switch (order) {
			case SortOrder.ASC:
				this.notes.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
				break;
			case SortOrder.DESC:
				this.notes.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
				break;
			default:
				throw new Error(`Unexpected sort order: ${order}`);
		}
		return this;
	}
}
