
export enum Gender {
	Male = 'male',
	Female = 'female'
}

export enum BloodGroup {
	O_PLUS = 'O+',
	O_MINUS = 'O−',
	A_PLUS = 'A+',
	A_MINUS = 'A−',
	B_PLUS = 'B+',
	B_MINUS = 'B−',
	AB_PLUS = 'AB+',
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
	Black = 'Black',
	Brown = 'Brown',
	Blond = 'Blond',
	Gray = 'Gray',
	Amber = 'Amber',
	Chestnut = 'Chestnut',
	Auburn = 'Auburn'
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
	Coily = 'Coily',
	Very_curly = 'Very curly'
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
	AmericanExpress = 'americanexpress',
	Jcb = 'jcb',
	Visa_electron = 'visa-electron',
	Instapayment = 'instapayment',
	Bankcard = 'bankcard',
	Diners_club_carte_blanche = 'diners-club-carte-blanche',
	Diners_club_enroute = 'diners-club-enroute',
	Solo = 'solo',
	Switch = 'switch'
}

export interface Company {
	address: AddressOfResidence,
	department: string;
	name: string;
	title: string;
}
