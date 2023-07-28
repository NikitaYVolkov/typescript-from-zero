import { CustomMap } from './custommap';
import { LinkedList } from './linkedlist';

class HashMap<T> {
	private buckets = new CustomMap<number, LinkedList<BucketElement<T>>>;

	size(): number {
		let countSize = 0;
		for (let i = 0; i < this.buckets.size(); i++) {
			countSize += this.buckets.get(i)!.length;
		}
		return countSize;
	}

	set(key: string, value: T): this {
		const hash = this.calculateHash(key);
		const newElement: BucketElement<T> = {
			key: key,
			value: value,
			hash: hash,
		}
		const isBucketCreated = this.isHashPresent(hash);
		if (isBucketCreated) {
			const bucketList = this.buckets.get(hash)!;
			const existingElementIndexForKey = this.findElementIndexInBucket(bucketList, key);
			if (existingElementIndexForKey === undefined) {
				this.buckets.set(hash, bucketList.addTail(newElement));
			} else {
				bucketList.update(newElement, existingElementIndexForKey);
				this.buckets.set(hash, bucketList);
			}
		} else {
			const emptyList = new LinkedList<BucketElement<T>>;
			this.buckets.set(hash, emptyList.addTail(newElement));
		}
		return this;
	}

	private calculateHash(key: string): number {
		return key.length;
	}

	private isHashPresent(hash: number) {
		return this.buckets.has(hash);
	}

	private findElementIndexInBucket(bucketList: LinkedList<BucketElement<T>>, key: string): number | undefined {
		for (let i = 0; i < bucketList.length; i++) {
			const current = bucketList.find(i)!;
			if (current.key === key) return i;
		}
		return undefined;
	}
}

interface BucketElement<T> {
	key: string;
	value: T;
	hash: number;
}
