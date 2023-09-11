import { Notebook, NotebookIteratorByDate, NotebookIteratorById, SortOrder } from '.';

const notebook = new Notebook();
notebook.addNote({ date: "09-01-2023", title: "title A" });
notebook.addNote({ date: "09-03-2023", title: "title B" });
notebook.addNote({ date: "08-05-2023", title: "title C" });

console.log('1. Traverse Notebook with NotebookIteratorById ASC');
for (const i = new NotebookIteratorById(notebook, SortOrder.ASC); !i.isDone(); i.next()) {
	console.log(i.current());
}

console.log('2. Traverse Notebook with NotebookIteratorById DESC');
for (const i = new NotebookIteratorById(notebook, SortOrder.DESC); !i.isDone(); i.next()) {
	console.log(i.current());
}

console.log('3. Traverse Notebook with NotebookIteratorByDate ASC');
for (const i = new NotebookIteratorByDate(notebook, SortOrder.ASC); !i.isDone(); i.next()) {
	console.log(i.current());
}

console.log('4. Traverse Notebook with NotebookIteratorByDate DESC');
for (const i = new NotebookIteratorByDate(notebook, SortOrder.DESC); !i.isDone(); i.next()) {
	console.log(i.current());
}

console.log('5. Unchanged initially created Notebook')
console.log(notebook);
