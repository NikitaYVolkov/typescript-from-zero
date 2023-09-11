import { Note, Notebook } from '..';

export abstract class NotebookIterator {
	protected notebook!: Notebook;
	protected cursor = 0;

	current(): Note {
		return this.notebook.getNotes()[this.cursor];
	}

	next(): void {
		this.cursor++;
	}

	isDone(): boolean {
		return this.current() === undefined;
	}
}
