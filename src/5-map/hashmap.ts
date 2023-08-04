import { CustomMap } from './custommap';
import { LinkedList } from './linkedlist';

class HashMap<T> {
	protected buckets = new CustomMap<number, LinkedList<BucketElement<T>>>;

	size(): number {
		const hashes = this.buckets.getAllKeys();
		let countSize = 0;
		hashes.forEach((i) => {
			countSize += this.buckets.get(i)!.size();
		});
		return countSize;
	}

	set(key: string, value: T): this {
		const newElement = new PotentialElementWithValue(this.buckets, key, value);
		const newBucketList = newElement.getBucketListWithNewElement();
		this.buckets.set(newElement.hash, newBucketList);
		return this;
	}

	delete(key: string): this {
		const deletingElement = new PotentialElementWithoutValue(this.buckets, key);
		const newBucketList = deletingElement.getBucketListWithDeletedElement();
		if (newBucketList === undefined) return this;
		if (newBucketList.isEmpty()) {
			this.buckets.delete(deletingElement.hash);
		} else {
			this.buckets.set(deletingElement.hash, newBucketList);
		}
		return this;
	}

	get(key: string): T | undefined {
		const gettingElement = new PotentialElementWithoutValue(this.buckets, key);
		const bucketElement = gettingElement.getExistingBucketElement();
		return bucketElement?.value;
	}

	has(key: string): boolean {
		const checkingElement = new PotentialElementWithoutValue(this.buckets, key);
		return checkingElement.hasExistingBucketElement();
	}

	clear(): this {
		this.buckets.clear();
		return this;
	}

	isEmpty(): boolean {
		return this.buckets.isEmpty();
	}

	print(): void {
		console.log(`HashMap size: ${this.size()}.`);
		const hashes = this.buckets.getAllKeys();
		hashes.forEach((i) => {
			const bucket = this.buckets.get(i)!;
			for (let j = 0; j < bucket.size(); j++) {
				const el = bucket.find(j)!;
				console.log(`Key: ${el.key}. Value: ${JSON.stringify(el.value)}`);
			}
		});
	}
}

interface BucketElement<T> {
	key: string;
	value: T;
	hash: number;
}

abstract class PotentialElement<T> {
	key: string;
	value: T | undefined;
	hash: number;
	bucketList: LinkedList<BucketElement<T>> | undefined;
	bucketElementIndexForKey: number | undefined;

	constructor(parentBuckets: CustomMap<number, LinkedList<BucketElement<T>>>, key: string, value?: T) {
		this.key = key;
		this.value = value;
		this.hash = this.calculateHash(key);
		this.bucketList = parentBuckets.get(this.hash);
		this.bucketElementIndexForKey = this.bucketList
			? this.findElementIndexInBucket(this.bucketList, key)
			: undefined;
	}

	getNewBucketElement(): BucketElement<T> | undefined {
		if (this.value === undefined) return undefined;
		return {
			key: this.key,
			value: this.value,
			hash: this.hash,
		};
	}

	getExistingBucketElement(): BucketElement<T> | undefined {
		if (this.bucketList === undefined || this.bucketElementIndexForKey === undefined) return undefined;
		const bucketElement = this.bucketList.find(this.bucketElementIndexForKey);
		this.existingBucketElementDefined(bucketElement);
		return bucketElement;
	}

	hasExistingBucketElement(): boolean {
		return this.bucketElementIndexForKey !== undefined;
	}

	getBucketListWithNewElement(): LinkedList<BucketElement<T>> | undefined {
		if (this.value === undefined) return undefined;
		const bucketElement = this.getNewBucketElement();
		this.newBucketElementDefined(bucketElement);
		const bucketListBeforeNewElement = this.bucketList ?? new LinkedList<BucketElement<T>>;
		if (this.bucketElementIndexForKey === undefined) {
			return bucketListBeforeNewElement.addTail(bucketElement);
		}
		const updatedBucket = bucketListBeforeNewElement.update(bucketElement, this.bucketElementIndexForKey);
		this.updatedBucketDefined(updatedBucket);
		return updatedBucket;
	}

	getBucketListWithDeletedElement(): LinkedList<BucketElement<T>> | undefined {
		if (this.bucketList === undefined || this.bucketElementIndexForKey === undefined) return undefined;
		this.bucketList.remove(this.bucketElementIndexForKey);
		return this.bucketList;
	}

	protected newBucketElementDefined(el: BucketElement<T> | undefined): asserts el is BucketElement<T> {
		if (!this.value) throw new Error('Implementation error. New bucket element is expected to be defined.');
	}

	protected existingBucketElementDefined(el: BucketElement<T> | undefined): asserts el is BucketElement<T> {
		if (this.bucketElementIndexForKey === undefined) throw new Error('Implementation error. Existing bucket element is expected to be defined');
	}

	protected updatedBucketDefined(bucket: LinkedList<BucketElement<T>> | null): asserts bucket is LinkedList<BucketElement<T>> {
		if (this.bucketElementIndexForKey === undefined) throw new Error('Implementation error. Updated bucket is expected to be defined.');
	}

	protected calculateHash(key: string): number {
		return key.length;
	}

	protected findElementIndexInBucket(bucketList: LinkedList<BucketElement<T>>, key: string): number | undefined {
		for (let i = 0; i < bucketList.size(); i++) {
			const current = bucketList.find(i)!;
			if (current.key === key) return i;
		}
		return undefined;
	}
}

class PotentialElementWithValue<T> extends PotentialElement<T> {
	value: T;

	constructor(parentBuckets: CustomMap<number, LinkedList<BucketElement<T>>>, key: string, value: T) {
		super(parentBuckets, key, value);
		this.value = value;
	}

	getNewBucketElement(): BucketElement<T> {
		return super.getNewBucketElement()!;
	}

	getBucketListWithNewElement(): LinkedList<BucketElement<T>> {
		return super.getBucketListWithNewElement()!;
	}
}

class PotentialElementWithoutValue<T> extends PotentialElement<T> {
	value: undefined;

	constructor(parentBuckets: CustomMap<number, LinkedList<BucketElement<T>>>, key: string) {
		super(parentBuckets, key);
	}

	getNewBucketElement(): undefined {
		return undefined;
	}

	getBucketListWithNewElement(): undefined {
		return undefined;
	}
}

class HashMapTest<T> extends HashMap<T> {
	printElement(el: BucketElement<T>): void {
		console.log(`Key: ${el.key}. Value: ${JSON.stringify(el.value)}`);
	}

	printBucket(bucket: LinkedList<BucketElement<T>>): void {
		bucket.print();
	}
}

export function testHashMap() {
	interface Player {
		name: string;
		age: number;
	}

	const players: Player[] = [
		{ name: 'Sam', age: 10 },
		{ name: 'Mary', age: 12 },
		{ name: 'Sue', age: 15 },
		{ name: 'Jeff', age: 18 },
		{ name: 'Simon', age: 19 }
	]

	console.log('1. New team');
	const myTeamRoles = new HashMapTest<Player>();
	console.log('isEmpty: ' + myTeamRoles.isEmpty());
	console.log('size: ' + myTeamRoles.size());
	console.log('has front_player_2: ' + myTeamRoles.has("front_player_2"));
	myTeamRoles.print();

	console.log('2. Add 2 front players and 1 back player');
	myTeamRoles.set("front_player_1", players[1])
		.set("front_player_2", players[3])
		.set("back_player_1", players[4]);
	console.log('isEmpty: ' + myTeamRoles.isEmpty());
	console.log('size: ' + myTeamRoles.size());
	console.log('has front_player_2: ' + myTeamRoles.has("front_player_2"));
	myTeamRoles.print();

	console.log('3. Add 1 middle player, move front player to be middle player');
	myTeamRoles.set("middle_player_1", players[4])
		.delete("front_player_2")
		.set("middle_player_2", players[3]);
	console.log('isEmpty: ' + myTeamRoles.isEmpty());
	console.log('size: ' + myTeamRoles.size());
	console.log('has front_player_2: ' + myTeamRoles.has("front_player_2"));
	console.log('get front_player_2: ' + JSON.stringify(myTeamRoles.get("front_player_2")));
	console.log('get front_player_1: ' + JSON.stringify(myTeamRoles.get("front_player_1")));
	myTeamRoles.print();

	console.log('4. Add 1 back player, replace front player');
	myTeamRoles.set("back_player_2", players[2])
		.set("front_player_1", players[0]);
	console.log('isEmpty: ' + myTeamRoles.isEmpty());
	console.log('size: ' + myTeamRoles.size());
	console.log('has front_player_1: ' + myTeamRoles.has("front_player_1"));
	console.log('get front_player_1: ' + JSON.stringify(myTeamRoles.get("front_player_1")));
	myTeamRoles.print();

	console.log('5. Remove back players');
	myTeamRoles.delete("back_player_3")
		.delete("back_player_2")
		.delete("back_player_1");
	console.log('isEmpty: ' + myTeamRoles.isEmpty());
	console.log('size: ' + myTeamRoles.size());
	console.log('has back_player_1: ' + myTeamRoles.has("back_player_1"));
	myTeamRoles.print();

	console.log('6. Disband team, add trainer and disband again');
	myTeamRoles.clear().set("trainer", players[0]).clear();
	console.log('isEmpty: ' + myTeamRoles.isEmpty());
	console.log('size: ' + myTeamRoles.size());
	console.log('has trainer: ' + myTeamRoles.has("trainer"));
	myTeamRoles.print();
}
