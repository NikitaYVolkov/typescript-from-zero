import { NotebookIterator } from '.';
import { Notebook, SortOrder } from '..';

export class NotebookIteratorById extends NotebookIterator {
	constructor(notebook: Notebook, sortOrder: SortOrder) {
		super();
		const clonedNotebook = notebook.clone();
		this.notebook = clonedNotebook.sortById(sortOrder);
	}
}
