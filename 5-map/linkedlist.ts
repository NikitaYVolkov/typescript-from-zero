export class LinkedList<T> {
	protected head: LinkedListNode<T> | null = null;
	protected tail: LinkedListNode<T> | null = null;
	length = 0;

	find(index: number): T | undefined {
		const current = this.findNode(index);
		return current?.val;
	}

	insert(val: T, index: number): this | null {
		if (!this.isIndexInsertable(index)) return null;
		if (index === this.length) return this.addTail(val);
		if (index === 0) return this.addHead(val);
		const prevNode = this.findNode(index - 1)!;
		const newNode = new LinkedListNode(val);
		const nextNode = prevNode.next!;
		prevNode.next = newNode;
		newNode.prev = prevNode;
		newNode.next = nextNode;
		nextNode.prev = newNode;
		this.length++;
		return this;
	}

	remove(index: number): T | undefined {
		if (!this.isIndexFindable(index)) return undefined;
		if (index === this.length - 1) return this.removeTail();
		if (index === 0) return this.removeHead();
		const removed = this.findNode(index)!;
		const prevNode = removed.prev!;
		const nextNode = removed.next!;
		prevNode.next = nextNode;
		nextNode.prev = prevNode;
		this.length--;
		return removed.val;
	}

	update(val: T, index: number): T | undefined {
		const current = this.findNode(index);
		if (current) current.val = val;
		return current?.val;
	}

	isEmpty(): boolean {
		return this.length === 0;
	}

	addTail(val: T): this {
		const newNode = new LinkedListNode(val);
		if (this.isEmpty()) {
			this.tail = newNode;
			this.head = newNode;
		} else {
			this.tail!.next = newNode;
			newNode.prev = this.tail;
			this.tail = newNode;
		}
		this.length++;
		return this;
	}

	removeTail(): T | undefined {
		if (this.isEmpty()) return undefined;
		const removed = this.tail!;
		this.tail = this.tail!.prev;
		if (!this.isSingleNode()) this.tail!.next = null;
		this.length--;
		return removed.val;
	}

	protected addHead(val: T): this {
		const newNode = new LinkedListNode(val);
		if (this.isEmpty()) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.head!.prev = newNode;
			newNode.next = this.head;
			this.head = newNode;
		}
		this.length++;
		return this;
	}

	protected removeHead(): T | undefined {
		if (this.isEmpty()) return undefined;
		const removed = this.head!;
		this.head = this.head!.next;
		if (!this.isSingleNode()) this.head!.prev = null;
		this.length--;
		return removed.val;
	}

	protected findNode(index: number): LinkedListNode<T> | undefined {
		if (!this.isIndexFindable(index)) return undefined;
		let current: LinkedListNode<T>;
		if (index <= this.length / 2) {
			current = this.head!;
			for (let i = 0; i < index; i++) current = current.next!;
		} else {
			current = this.tail!;
			for (let i = this.length - 1; i > index; i--) current = current.prev!;
		}
		return current;
	}

	private isSingleNode(): boolean {
		return this.length === 1;
	}

	private isIndexFindable(index: number): boolean {
		return index >= 0 && index < this.length;
	}

	private isIndexInsertable(index: number): boolean {
		return index >= 0 && index <= this.length;
	}
}

class LinkedListNode<T> {
	val: T;
	next: LinkedListNode<T> | null = null;
	prev: LinkedListNode<T> | null = null;

	constructor(val: T) {
		this.val = val;
	}
}

class LinkedListTest<T> extends LinkedList<T> {
	getHead(): LinkedListNode<T> | null {
		return this.head;
	}

	getTail(): LinkedListNode<T> | null {
		return this.tail;
	}

	printWithFind(): void {
		console.log(`printWithFind size: ${this.length}.`);
		for (let i = 0; i < this.length; i++) {
			const current = this.findNode(i)!;
			console.log(`Node value: ${current.val}. Prev val: ${current.prev?.val}. Next val: ${current.next?.val}.`);
		}
	}

	printFromHead(): void {
		console.log(`printFromHead size: ${this.length}.`);
		let current = this.getHead();
		while (current !== null) {
			console.log(`Node value: ${current.val}. Prev val: ${current.prev?.val}. Next val: ${current.next?.val}.`);
			current = current.next;
		}
	}

	printFromTail(): void {
		console.log(`printFromTail size: ${this.length}.`);
		let current = this.getTail();
		while (current !== null) {
			console.log(`Node value: ${current.val}. Prev val: ${current.prev?.val}. Next val: ${current.next?.val}.`);
			current = current.prev;
		}
	}
}

function testLinkedList() {
	console.log('1. New linked list');
	const roles = new LinkedListTest<string>;
	roles.printWithFind();

	console.log('2. AddTail - 1');
	roles.addTail("f_p_1");
	roles.printWithFind();

	console.log('3. AddTail - 2');
	roles.addTail("f_p_2");
	roles.printWithFind();

	console.log('4. AddTail - 3');
	roles.addTail("b_p_1");
	roles.printWithFind();
	roles.printFromHead();
	roles.printFromTail();

	console.log('5. AddTail - 4');
	roles.addTail("b_p_2");
	roles.printWithFind();

	console.log('6. AddTail - 5');
	roles.addTail("m_p_1");
	roles.printWithFind();

	console.log('7. AddTail - 6');
	roles.addTail("m_p_2");
	roles.printWithFind();
}
