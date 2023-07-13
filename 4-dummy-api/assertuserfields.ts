import type { AddressOfResidence, BankAccountInput, GeographicCoordinates, Hair } from './userfieldtypes';
import { BankCardType, BloodGroup, Color, Gender, HairType } from './userfieldtypes';
import {
	convertHexadecimalStringToDecimalNumber,
	invalidBaseFieldError,
	invalidSubFieldError,
	replaceAll
} from './utilities';

export function assertUserNonNegativeNumberField(input: unknown, fieldName: string): asserts input is number {
	if (typeof input !== 'number') {
		throw new TypeError(`Imported user has invalid '${fieldName}' type: ${typeof input}. Must be 'number'.`);
	}

	if (input < 0) {
		throw new RangeError(`Imported user '${fieldName}' field is out of range: ${input}. Must be non-negative number.`);
	}
}

export function assertUserStringField(input: unknown, fieldName: string): asserts input is string {
	if (typeof input !== 'string') {
		throw new TypeError(`Imported user has invalid '${fieldName}' type: ${typeof input}. Must be 'string'.`);
	}
}

export function assertUserGenderField(input: unknown, fieldName: string): asserts input is Gender {
	assertUserStringField(input, fieldName);
	if (!Object.values(Gender).includes(input as Gender)) {
		throw new TypeError(
			`Imported user has invalid '${fieldName}' field: ${input}. Must be in '${Object.values(Gender)}'.`
		);
	}
}

export function assertUserEmailField(input: unknown, fieldName: string): asserts input is string {
	assertUserStringField(input, fieldName);
	const isEmail = Boolean(input.match(/^\w+@(\w+\.)+\w+$/));
	if (!isEmail) {
		throw new TypeError(`Imported user has invalid '${fieldName}' field: ${input}. Must be valid email address.`);
	}
}

export function assertUserPhoneField(input: unknown, fieldName: string): asserts input is string {
	assertUserStringField(input, fieldName);
	const isPhoneNumberWithSpaces = Boolean(input.match(/^(\+)?[ \d]+$/));
	if (!isPhoneNumberWithSpaces) {
		throw new TypeError(`Imported user has invalid '${fieldName}' field: ${input}. Must be valid phone number.`);
	}
}

export function assertUserDateField(input: unknown, fieldName: string): asserts input is string {
	assertUserStringField(input, fieldName);
	if (isNaN(Date.parse(input))) {
		throw new TypeError(`Imported user has invalid '${fieldName}' field: ${input}. Must be valid date.`);
	}
}

export function assertUserBloodGroupField(input: unknown, fieldName: string): asserts input is BloodGroup {
	assertUserStringField(input, fieldName);
	if (!Object.values(BloodGroup).includes(input as BloodGroup)) {
		throw new TypeError(
			`Imported user has invalid '${fieldName}' field: ${input}. Must be in '${Object.values(BloodGroup)}'.`
		);
	}
}

export function assertUserColorField(input: unknown, fieldName: string): asserts input is Color {
	assertUserStringField(input, fieldName);
	if (!Object.values(Color).includes(input as Color)) {
		throw new TypeError(
			`Imported user has invalid '${fieldName}' field: ${input}. Must be in '${Object.values(Color)}'.`
		);
	}
}

export function assertUserHairField(input: unknown, fieldName: string): asserts input is Hair {
	const baseErrorMessage = `Imported user has invalid '${fieldName}' field: ${JSON.stringify(input)}. Must be valid Hair type.`;
	const invalidBaseField = invalidBaseFieldError(baseErrorMessage);
	const invalidSubField = invalidSubFieldError(baseErrorMessage);

	if (typeof input !== 'object'
		|| input === null
		|| !('color' in input)
		|| !('type' in input)
	) {
		throw invalidBaseField;
	}

	try { assertUserColorField(input.color, 'color') }
	catch (e) {
		throw invalidSubField(e as Error);
	}

	try { assertUserHairTypeField(input.type, 'type') }
	catch (e) {
		throw invalidSubField(e as Error);
	}
}

export function assertUserHairTypeField(input: unknown, fieldName: string): asserts input is HairType {
	assertUserStringField(input, fieldName);
	if (!Object.values(HairType).includes(input as HairType)) {
		throw new TypeError(
			`Imported user has invalid '${fieldName}' field: ${input}. Must be in '${Object.values(HairType)}'.`
		);
	}
}

export function assertUserDomainField(input: unknown, fieldName: string): asserts input is string {
	assertUserStringField(input, fieldName);
	const isDomain = Boolean(input.match(/^(\w+\.)+\w+$/));
	if (!isDomain) {
		throw new TypeError(`Imported user has invalid '${fieldName}' field: ${input}. Must be valid web domain.`);
	}
}

export function assertUserIpAddressField(input: unknown, fieldName: string): asserts input is string {
	assertUserStringField(input, fieldName);
	const invalidIpAddressField = new TypeError(
		`Imported user has invalid '${fieldName}' field: ${input}. Must be valid IP address.`
	);

	const isFourNumbersDividedByDots = Boolean(input.match(/^(\d+\.){3}\d+$/));
	if (!isFourNumbersDividedByDots) {
		throw invalidIpAddressField;
	}

	const ipNumericParts: number[] = input.split('.').map((p) => Number(p));
	const isValidParts: boolean = ipNumericParts.reduce<boolean>(
		(isValidParts: boolean, part: number) => { return isValidParts && (part < 256) },
		true
	);
	if (!isValidParts) {
		throw invalidIpAddressField;
	}
}

export function assertUserAddressOfResidenceField(input: unknown, fieldName: string): asserts input is AddressOfResidence {
	const baseErrorMessage = `Imported user has invalid '${fieldName}' field: ${JSON.stringify(input)}. Must be valid AddressOfResidence type.`;
	const invalidBaseField = invalidBaseFieldError(baseErrorMessage);
	const invalidSubField = invalidSubFieldError(baseErrorMessage);

	if (typeof input !== 'object'
		|| input === null
		|| !('address' in input)
		|| !('city' in input)
		|| !('coordinates' in input)
		|| !('postalCode' in input)
		|| !('state' in input)
	) {
		throw invalidBaseField;
	}

	try { assertUserStringField(input.address, 'address') }
	catch (e) {
		throw invalidSubField(e as Error);
	}

	try { assertUserStringField(input.city, 'city') }
	catch (e) {
		throw invalidSubField(e as Error);
	}

	try { assertUserGeographicCoordinatesField(input.coordinates, 'coordinates') }
	catch (e) {
		throw invalidSubField(e as Error);
	}

	try { assertUserStringField(input.postalCode, 'postalCode') }
	catch (e) {
		throw invalidSubField(e as Error);
	}

	try { assertUserStringField(input.state, 'state') }
	catch (e) {
		throw invalidSubField(e as Error);
	}
}

export function assertUserGeographicCoordinatesField(input: unknown, fieldName: string): asserts input is GeographicCoordinates {
	const baseErrorMessage = `Imported user has invalid '${fieldName}' field: ${JSON.stringify(input)}. Must be valid GeographicCoordinates type.`;
	const invalidBaseField = invalidBaseFieldError(baseErrorMessage);
	const invalidSubField = invalidSubFieldError(baseErrorMessage);

	if (typeof input !== 'object'
		|| input === null
		|| !('lat' in input)
		|| !('lng' in input)
	) {
		throw invalidBaseField;
	}

	try { assertUserNumberRangeField(input.lat, 'lat', [-90, 90]) }
	catch (e) {
		throw invalidSubField(e as Error);
	}

	try { assertUserNumberRangeField(input.lng, 'lng', [-180, 180]) }
	catch (e) {
		throw invalidSubField(e as Error);
	}
}

export function assertUserNumberRangeField(input: unknown, fieldName: string, range: [number, number]): asserts input is number {
	if (typeof input !== 'number') {
		throw new TypeError(`Imported user has invalid '${fieldName}' type: ${typeof input}. Must be 'number'.`);
	}

	const rangeMin: number = range[0];
	const rangeMax: number = range[1];
	if (input < rangeMin || input > rangeMax) {
		throw new RangeError(
			`Imported user '${fieldName}' field is out of range: ${input}. Must be inclusively between ${rangeMin} and ${rangeMax}.`
		);
	}
}

export function assertUserMacAddressField(input: unknown, fieldName: string): asserts input is string {
	assertUserStringField(input, fieldName);
	const invalidMacAddressField = new TypeError(
		`Imported user has invalid '${fieldName}' field: ${input}. Must be valid MAC address.`
	);

	const isSixHexNumbersDividedByDots = Boolean(input.match(/^([\da-fA-F]+:){5}[\da-fA-F]+$/));
	if (!isSixHexNumbersDividedByDots) {
		throw invalidMacAddressField;
	}

	const macDecimalNumericParts: number[] = input.split(':').map((p) => convertHexadecimalStringToDecimalNumber(p));
	const isValidParts: boolean = macDecimalNumericParts.reduce<boolean>(
		(isValidParts: boolean, part: number) => { return isValidParts && (part < 256) },
		true
	);
	if (!isValidParts) {
		throw invalidMacAddressField;
	}
}

export function assertUserBankAccountField(input: unknown, fieldName: string): asserts input is BankAccountInput {
	const baseErrorMessage = `Imported user has invalid '${fieldName}' field: ${JSON.stringify(input)}. Must be valid BankAccount type.`;
	const invalidBaseField = invalidBaseFieldError(baseErrorMessage);
	const invalidSubField = invalidSubFieldError(baseErrorMessage);

	if (typeof input !== 'object'
		|| input === null
		|| !('cardExpire' in input)
		|| !('cardNumber' in input)
		|| !('cardType' in input)
		|| !('currency' in input)
		|| !('iban' in input)
	) {
		throw invalidBaseField;
	}

	try { assertUserBankCardExpireField(input.cardExpire, 'cardExpire') }
	catch (e) {
		throw invalidSubField(e as Error);
	}

	try { assertUserBankCardNumberField(input.cardNumber, 'cardNumber') }
	catch (e) {
		throw invalidSubField(e as Error);
	}

	try { assertUserBankCardTypeField(input.cardType, 'cardType') }
	catch (e) {
		throw invalidSubField(e as Error);
	}

	try { assertUserStringField(input.currency, 'currency') }
	catch (e) {
		throw invalidSubField(e as Error);
	}

	try { assertUserBankIbanNumberField(input.iban, 'iban') }
	catch (e) {
		throw invalidSubField(e as Error);
	}
}

export function assertUserBankCardExpireField(input: unknown, fieldName: string): asserts input is string {
	assertUserStringField(input, fieldName);
	const invalidBankCardExpireField = new TypeError(
		`Imported user has invalid '${fieldName}' field: ${input}. Must be valid bank card expiration month.`
	);

	const isTwoNumbersDividedBySlash = Boolean(input.match(/^\d+\/\d+$/));
	if (!isTwoNumbersDividedBySlash) {
		throw invalidBankCardExpireField;
	}

	const expireNumericParts: number[] = input.split('/').map((p) => Number(p));
	const [month, year] = expireNumericParts;
	const maxMonthInYear = 12;
	const maxYearInCentury = 99;
	const isValidParts: boolean = (month <= maxMonthInYear) && (year <= maxYearInCentury);
	if (!isValidParts) {
		throw invalidBankCardExpireField;
	}
}

export function assertUserBankCardNumberField(input: unknown, fieldName: string): asserts input is string {
	assertUserStringField(input, fieldName);
	const isSeventeenDigits = Boolean(input.match(/^\d{17}$/));
	if (!isSeventeenDigits) {
		throw new TypeError(`Imported user has invalid '${fieldName}' field: ${input}. Must be valid bank card number.`);
	}
}

export function assertUserBankCardTypeField(input: unknown, fieldName: string): asserts input is BankCardType {
	assertUserStringField(input, fieldName);
	if (!Object.values(BankCardType).includes(input as BankCardType)) {
		throw new TypeError(
			`Imported user has invalid '${fieldName}' field: ${input}. Must be in '${Object.values(BankCardType)}'.`
		);
	}
}

export function assertUserBankIbanNumberField(input: unknown, fieldName: string): asserts input is string {
	assertUserStringField(input, fieldName);
	const isIbanSymbols = Boolean(input.match(/^[\da-zA-Z\s]+$/));
	const inputWithoutSpaces = replaceAll(input, /\s/, '');
	const maxIbanCharacters = 34;
	const isWithinMaxLength = (inputWithoutSpaces.length <= maxIbanCharacters);
	if (!isIbanSymbols || !isWithinMaxLength) {
		throw new TypeError(`Imported user has invalid '${fieldName}' field: ${input}. Must be valid IBAN.`);
	}
}
