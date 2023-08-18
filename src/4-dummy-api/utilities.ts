export function convertHexadecimalStringToDecimalNumber(hex: string): number {
	const hexadecimalRadix = 16;
	return parseInt(hex, hexadecimalRadix);
}

export function replaceAll(string: string, find: string | RegExp, replace: string) {
	return string.replace(new RegExp(find, 'g'), replace);
}

export function cardExpireToDate(cardExpire: string): Date {
	const cardExpireParts = cardExpire.split('/').map((p) => Number(p));
	const [month, year] = cardExpireParts;
	const dateMonth = month - 1;
	const dateYear = year + 2000;
	return new Date(dateYear, dateMonth);
}

export const invalidBaseFieldError = (baseErrorMessage: string) => (new TypeError(baseErrorMessage));
export const invalidSubFieldError = (baseErrorMessage: string) => ((e: Error) => new TypeError(`${baseErrorMessage} ${e.message}`));
