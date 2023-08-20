import sortBy from 'sort-by';

export function sortByTest() {
	interface User {
		id: number;
		name: string;
		age: string;
		email: {
			primary: string;
		};
	}

	const users: User[] = [{
		id: 7,
		name: 'Foo',
		age: '34',
		email: { primary: 'foo@email.com' }
	}, {
		id: 3,
		name: 'Bar',
		age: '55',
		email: { primary: 'baz@email.com' }
	}, {
		id: 4,
		name: 'Bar',
		age: '67',
		email: { primary: 'bar@email.com' }
	}];
	console.log(users);

	users.sort(sortBy('name', 'age'));
	console.log(users);
}
