function allowFunc(filter: (arg: any) => boolean) {
	return (
		target: Object,
		propertyKey: string | symbol
	) => {
		let valueStorage: any;
		Object.defineProperty(target, propertyKey, {
			set: function (newValue: any) {
				if (filter(newValue)) {
					valueStorage = newValue;
				}
			},
			get: function () {
				return valueStorage;
			}

		});
	}
}

export function allowFuncTest() {
	class User {
		@allowFunc((a: number) => a > 0)
		age: number = 30;
	}

	const person = new User();
	console.log(person.age); // 30

	person.age = 0;
	console.log(person.age); // 30

	person.age = 20;
	console.log(person.age); // 20
}
