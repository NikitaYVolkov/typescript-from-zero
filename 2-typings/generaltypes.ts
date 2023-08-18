/* No actual imported files available, types for imported functions are declared in imports.d.ts
// import { makeOrdinal } from './makeOrdinal';
// import { isFinite as isFiniteNumber } from './isFinite';
// import { isSafeNumber } from './isSafeNumber';
*/

const TEN = 10;
const ONE_HUNDRED = 100;
const ONE_THOUSAND = 1_000;
const ONE_MILLION = 1_000_000;
const ONE_BILLION = 1_000_000_000;
const ONE_TRILLION = 1_000_000_000_000;
const ONE_QUADRILLION = 1_000_000_000_000_000;
const MAX = 9_007_199_254_740_992n;

const LESS_THAN_TWENTY:
	[string, string, string, string, string, string, string, string, string, string, string, string, string, string,
		string, string, string, string, string, string] =
	[
		'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
		'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
	];
const TENTHS_LESS_THAN_HUNDRED:
	[string, string, string, string, string, string, string, string, string, string] =
	[
		'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
	];

/**
 * If number is decimal, the decimals will be removed.
 */
export function convertNumberIntoWords(number: number | string, asOrdinal: boolean): string {
	const parsedNumber: number = (typeof number == 'number')
		? number
		: parseInt(number, 10);

	if (!isFiniteNumber(parsedNumber)) {
		throw new TypeError(`Not a finite number: ${parsedNumber} (${typeof parsedNumber}).`);
	}
	if (!isSafeNumber(parsedNumber)) {
		throw new RangeError(`Input is not a safe number, it's either too large or too small.`);
	}

	const numberInWords: string = generateWordsForNumber(parsedNumber);
	return asOrdinal
		? makeOrdinal(numberInWords)
		: numberInWords;
}

function generateWordsForNumber(number: number, ...args: string[]): string {
	const previousWords: string[] | undefined = args;

	if (number == 0) {
		return !previousWords
			? 'zero'
			: previousWords.join(' ').replace(/,$/, '');
	}

	const newWords: string[] = previousWords;

	if (number < 0) {
		newWords.push('minus');
		number = Math.abs(number);
	}

	let remainder: number;
	let word: string;

	if (number < 20) {
		remainder = 0;
		word = LESS_THAN_TWENTY[number];

	} else if (number < ONE_HUNDRED) {
		remainder = number % TEN;
		word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];

		if (remainder) {
			word += '-' + LESS_THAN_TWENTY[remainder];
			remainder = 0;
		}

	} else if (number < ONE_THOUSAND) {
		remainder = number % ONE_HUNDRED;
		word = generateWordsForNumber(Math.floor(number / ONE_HUNDRED)) + ' hundred';

	} else if (number < ONE_MILLION) {
		remainder = number % ONE_THOUSAND;
		word = generateWordsForNumber(Math.floor(number / ONE_THOUSAND)) + ' thousand,';

	} else if (number < ONE_BILLION) {
		remainder = number % ONE_MILLION;
		word = generateWordsForNumber(Math.floor(number / ONE_MILLION)) + ' million,';

	} else if (number < ONE_TRILLION) {
		remainder = number % ONE_BILLION;
		word = generateWordsForNumber(Math.floor(number / ONE_BILLION)) + ' billion,';

	} else if (number < ONE_QUADRILLION) {
		remainder = number % ONE_TRILLION;
		word = generateWordsForNumber(Math.floor(number / ONE_TRILLION)) + ' trillion,';

	} else if (number <= MAX) {
		remainder = number % ONE_QUADRILLION;
		word = generateWordsForNumber(Math.floor(number / ONE_QUADRILLION)) + ' quadrillion,';
	}
	const assignedWord: string = word!;
	const assignedRemainder: number = remainder!;

	newWords.push(assignedWord);
	return generateWordsForNumber(assignedRemainder, ...newWords);
}
