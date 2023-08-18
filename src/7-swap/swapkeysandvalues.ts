function swapKeysAndValues<U extends PossibleKey, V extends PossibleKey>(input: Record<U, V>): Record<V, U> {
	return Object.entries<V>(input).reduce<Record<V, U>>(
		(swappedOutput: Record<V, U>, inputEntry: [string, V]) => {
			const outputKey: V = inputEntry[1];
			const entryKey: string = inputEntry[0];
			if (isNaN(Number(entryKey))) {
				swappedOutput[outputKey] = entryKey as U;
			} else {
				swappedOutput[outputKey] = Number(entryKey) as U;
			}
			return swappedOutput;
		},
		{} as Record<V, U>
	)
}

type PossibleKey = string | number;

export function swapKeysAndValuesTest() {
	const strObj: Record<string, number> = {
		a: 12,
		bcd: 3,
		ef: 456,
	}
	console.log('strObj: ' + JSON.stringify(strObj));
	const swappedStrObj = swapKeysAndValues(strObj);
	console.log('swappedStrObj: ' + JSON.stringify(swappedStrObj));

	const numObj: Record<number, string> = {
		12: 'a',
		3: 'bcd',
		456: 'ef'
	}
	console.log('numObj: ' + JSON.stringify(numObj));
	const swappedNumObj = swapKeysAndValues(numObj);
	console.log('swappedNumObj: ' + JSON.stringify(swappedNumObj));
}
