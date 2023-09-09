import { NotebookIterator } from '.';
import { Notebook, SortOrder } from '..';

export class NotebookIteratorByDate extends NotebookIterator {
	constructor(notebook: Notebook, sortOrder: SortOrder) {
		super();
		const clonedNotebook = notebook.clone();
		this.notebook = clonedNotebook.sortByDate(sortOrder);
	}
}
