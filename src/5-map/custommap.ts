import { LinkedList } from './linkedlist';

export class CustomMap<U extends string | number, V> {
	private keys = new LinkedList<U>;
	private values = new LinkedList<V>;

	size(): number {
		return this.keys.size();
	}

	set(key: U, value: V): this {
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

	delete(key: U): this {
		const mapIndex = this.findMapIndexByKey(key);
		if (mapIndex !== undefined) {
			this.keys.remove(mapIndex);
			this.values.remove(mapIndex);
		}
		return this;
	}

	get(key: U): V | undefined {
		const mapIndex = this.findMapIndexByKey(key);
		if (mapIndex === undefined) return undefined;
		return this.values.find(mapIndex)!;
	}

	has(key: U): boolean {
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

	getAllKeys(): U[] {
		return this.keys.getAllValues();
	}

	getAllValues(): V[] {
		return this.values.getAllValues();
	}

	private findMapIndexByKey(findKey: U): number | undefined {
		if (this.isEmpty()) return undefined;
		let mapIndex: number | undefined = undefined;
		for (let i = 0; (i < this.size()) && (!mapIndex); i++) {
			const key = this.keys.find(i)!;
			if (key === findKey) mapIndex = i;
		}
		return mapIndex;
	}
}

function testCustomMap() {
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
	const myTeamRoles = new CustomMap<string, Player>();
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
