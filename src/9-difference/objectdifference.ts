function objectDifference<TA extends object, TB extends object>(objA: TA, objB: TB): { [Property in Exclude<keyof TA, keyof TB>]: TA[Exclude<keyof TA, keyof TB>] } {
	type Rkey = Exclude<keyof TA, keyof TB>;
	type R = { [Property in Rkey]: TA[Rkey] };
	const Rkeys = Object.keys(objA).filter((k) => !Object.keys(objB).includes(k)) as Rkey[];
	return Rkeys.reduce<R>((objR: R, key: Rkey) => {
		objR[key] = objA[key];
		return objR;
	}, {} as R);
}

export function objectDifferenceTest() {
	const objA = { a: 5, b: '' };
	const objB = { a: 10, c: true };
	console.log(objA);
	console.log(objB);

	const objR = objectDifference(objA, objB);
	console.log(objR);
}
