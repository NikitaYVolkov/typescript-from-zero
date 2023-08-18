function pickObjectKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): { [property in K]: T[K] } {
	type R = { [property in K]: T[K] };
	return keys.reduce<R>((returnObj: R, key: K) => {
		returnObj[key] = obj[key];
		return returnObj;
	}, {} as R);
}

const user = {
	name: "Vasiliy",
	age: 8,
	skills: ['typescript', 'javascript'],
};
console.log(user);

const userAgeAndSkillsValues = pickObjectKeys(user, ['age', 'skills']);
console.log(userAgeAndSkillsValues);

/*
res = {
	age: 8,
	skills: ['typescript', 'javascript']
}
*/
