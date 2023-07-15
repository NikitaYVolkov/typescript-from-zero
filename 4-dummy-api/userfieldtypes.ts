
export enum Gender {
	Male = 'male',
	Female = 'female'
}

export enum BloodGroup {
	O_MINUS = 'O−',
	A_MINUS = 'A−',
	B_MINUS = 'B−',
	AB_MINUS = 'AB−'
}

export enum Color {
	White = 'White',
	Red = 'Red',
	Orange = 'Orange',
	Yellow = 'Yellow',
	Green = 'Green',
	Cyan = 'Cyan',
	Blue = 'Blue',
	Violet = 'Violet',
	Black = 'Black'
}

export interface Hair {
	color: Color;
	type: HairType;
}

export enum HairType {
	Strands = 'Strands',
	Straight = 'Straight',
	Wavy = 'Wavy',
	Curly = 'Curly',
	Kinky = 'Kinky',
	Coily = 'Coily'
}

export interface AddressOfResidence {
	address: string;
	city: string;
	coordinates: GeographicCoordinates;
	postalCode: string;
	state: string;
}

export interface GeographicCoordinates {
	lat: number;
	lng: number;
}

export interface BankAccountInput {
	cardExpire: string;
	cardNumber: string;
	cardType: BankCardType;
	currency: String;
	iban: string;
}

export interface BankAccount {
	cardExpire: Date;
	cardNumber: string;
	cardType: BankCardType;
	currency: String;
	iban: string;
}

export enum BankCardType {
	Visa = 'visa',
	Maestro = 'maestro',
	Mastercard = 'mastercard',
	Mir = 'mir',
	AmericanExpress = 'americanexpress'
}

export interface Company {
	address: AddressOfResidence,
	department: string;
	name: string;
	title: string;
}
