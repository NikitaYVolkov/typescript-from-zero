import { LinkedList } from './linkedlist';

export class CustomMap<T> {
	private keys: LinkedList<string> = new LinkedList<string>;
	private values: LinkedList<T> = new LinkedList<T>;

	size(): number {
		return this.keys.length;
	}

	set(key: string, value: T): this {
		const mapIndex = this.findMapIndexByKey(key);
		if (mapIndex === undefined) {
			this.keys.addTail(key);
			this.values.addTail(value);
		} else {
			this.keys.update(key, mapIndex);
			this.values.update(value, mapIndex);
		}
		return this;
	}

	delete(key: string): this {
		const mapIndex = this.findMapIndexByKey(key);
		if (mapIndex !== undefined) {
			this.keys.remove(mapIndex);
			this.values.remove(mapIndex);
		}
		return this;
	}

	get(key: string): T | undefined {
		const mapIndex = this.findMapIndexByKey(key);
		if (mapIndex === undefined) return undefined;
		return this.values.find(mapIndex)!;
	}

	has(key: string): boolean {
		const mapIndex = this.findMapIndexByKey(key);
		return mapIndex !== undefined;
	}

	clear(): this {
		const sizeBeforeClear = this.size();
		for (let i = 0; i < sizeBeforeClear; i++) {
			this.keys.removeTail();
			this.values.removeTail();
		}
		return this;
	}

	isEmpty(): boolean {
		return this.keys.isEmpty();
	}

	print(): void {
		console.log(`CustomMap size: ${this.size()}.`);
		for (let i = 0; i < this.size(); i++) {
			const key = this.keys.find(i)!;
			const value = this.values.find(i)!;
			console.log(`Key: ${key}. Value: ${JSON.stringify(value)}`);
		}
	}

	private findMapIndexByKey(findKey: string): number | undefined {
		if (this.isEmpty()) return undefined;
		let mapIndex: number | undefined = undefined;
		for (let i = 0; (i < this.size()) && (!mapIndex); i++) {
			const key = this.keys.find(i)!;
			if (key === findKey) mapIndex = i;
		}
		return mapIndex;
	}
}
