import { CustomMap } from './custommap';

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
const myTeamRoles = new CustomMap<Player>();
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
