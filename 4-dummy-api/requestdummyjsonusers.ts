import dummyusers from './dummyusers.json';

interface DummyUser {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: Gender;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: Date;
    image: string;
    bloodGroup: BloodGroup;
    height: number;
    weight: number;
    eyeColor: Color;
    hair: Hair;
    // domain: Host;
    // ip: IpAddress;
    // address: {
    // 	address: string;
    // 	city: string;
    // 	coordinates: {
    // 		lat: Latitude;
    // 		lng: Longitude;
    // 	};
    // 	postalCode: string;
    // 	state: 'DC' | 'TN';
    // };
    // macAddress: MacAddress;
    // university: string;
    // bank: {
    // 	cardExpire: MonthAndYear;
    // 	cardNumber: CardNumber;
    // 	cardType: 'maestro';
    // 	currency: 'Peso';
    // 	iban: string;
    // };
    // company: {
    // 	address: {
    // 		address: string;
    // 		city: string;
    // 		coordinates: {
    // 			lat: Latitude;
    // 			lng: Longitude;
    // 		};
    // 		postalCode: string;
    // 		state: 'DC' | 'TN';
    // 	};
    // 	department: 'Marketing';
    // 	name: string;
    // 	title: string;
    // }
    // ein: EinNumber;
    // ssn: SsnNumber;
    // userAgent: string;
}

enum Gender {
    Male = 'male',
    Female = 'female'
}

enum BloodGroup {
    O_MINUS = 'O−',
    A_MINUS = 'A−',
    B_MINUS = 'B−',
    AB_MINUS = 'AB−'
}

enum Color {
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

interface Hair {
    color: Color;
    type: HairType;
}

enum HairType {
    Strands = 'Strands',
    Straight = 'Straight',
    Wavy = 'Wavy',
    Curly = 'Curly',
    Kinky = 'Kinky',
    Coily = 'Coily'
}

function createUserFromImport(importedUser: object): DummyUser {
    const user = {} as DummyUser;

    if (!('id' in importedUser)) {
        throw new TypeError(`Imported user has no 'id' field`);
    }
    assertUserNonNegativeNumberField(importedUser.id, 'id');
    user.id = importedUser.id;

    if (!('firstName' in importedUser)) {
        throw new TypeError(`Imported user has no 'firstName' field`);
    }
    assertUserStringField(importedUser.firstName, 'firstName');
    user.firstName = importedUser.firstName;

    if (!('lastName' in importedUser)) {
        throw new TypeError(`Imported user has no 'lastName' field`);
    }
    assertUserStringField(importedUser.lastName, 'lastName');
    user.lastName = importedUser.lastName;

    if (!('maidenName' in importedUser)) {
        throw new TypeError(`Imported user has no 'maidenName' field`);
    }
    assertUserStringField(importedUser.maidenName, 'maidenName');
    user.maidenName = importedUser.maidenName;

    if (!('age' in importedUser)) {
        throw new TypeError(`Imported user has no 'age' field`);
    }
    assertUserNonNegativeNumberField(importedUser.age, 'age');
    user.age = importedUser.age;

    if (!('gender' in importedUser)) {
        throw new TypeError(`Imported user has no 'gender' field`);
    }
    assertUserGenderField(importedUser.gender, 'gender');
    user.gender = importedUser.gender;

    if (!('email' in importedUser)) {
        throw new TypeError(`Imported user has no 'email' field`);
    }
    assertUserEmailField(importedUser.email, 'email');
    user.email = importedUser.email;

    if (!('phone' in importedUser)) {
        throw new TypeError(`Imported user has no 'phone' field`);
    }
    assertUserPhoneField(importedUser.phone, 'phone');
    user.phone = importedUser.phone;

    if (!('username' in importedUser)) {
        throw new TypeError(`Imported user has no 'username' field`);
    }
    assertUserStringField(importedUser.username, 'username');
    user.username = importedUser.username;

    if (!('password' in importedUser)) {
        throw new TypeError(`Imported user has no 'password' field`);
    }
    assertUserStringField(importedUser.password, 'password');
    user.password = importedUser.password;

    if (!('birthDate' in importedUser)) {
        throw new TypeError(`Imported user has no 'birthDate' field`);
    }
    assertUserDateField(importedUser.birthDate, 'birthDate');
    user.birthDate = new Date(importedUser.birthDate);

    if (!('image' in importedUser)) {
        throw new TypeError(`Imported user has no 'image' field`);
    }
    assertUserStringField(importedUser.image, 'image');
    user.image = importedUser.image;

    if (!('bloodGroup' in importedUser)) {
        throw new TypeError(`Imported user has no 'bloodGroup' field`);
    }
    assertUserBloodGroupField(importedUser.bloodGroup, 'bloodGroup');
    user.bloodGroup = importedUser.bloodGroup;

    if (!('height' in importedUser)) {
        throw new TypeError(`Imported user has no 'height' field`);
    }
    assertUserNonNegativeNumberField(importedUser.height, 'height');
    user.height = importedUser.height;

    if (!('weight' in importedUser)) {
        throw new TypeError(`Imported user has no 'weight' field`);
    }
    assertUserNonNegativeNumberField(importedUser.weight, 'weight');
    user.weight = importedUser.weight;

    if (!('eyeColor' in importedUser)) {
        throw new TypeError(`Imported user has no 'eyeColor' field`);
    }
    assertUserColorField(importedUser.eyeColor, 'eyeColor');
    user.eyeColor = importedUser.eyeColor;

    if (!('hair' in importedUser)) {
        throw new TypeError(`Imported user has no 'hair' field`);
    }
    assertUserHairField(importedUser.hair, 'hair');
    user.hair = importedUser.hair;

    return user;
}

function assertUserNonNegativeNumberField(input: unknown, fieldName: string): asserts input is number {
    if (typeof input != 'number') {
        throw new TypeError(`Imported user has invalid '${fieldName}' type: ${typeof input}. Must be 'number'.`);
    }
    if (input < 0) {
        throw new RangeError(`Imported user '${fieldName}' field is out of range: ${input}. Must be non-negative number.`);
    }
}

function assertUserStringField(input: unknown, fieldName: string): asserts input is string {
    if (typeof input != 'string') {
        throw new TypeError(`Imported user has invalid '${fieldName}' type: ${typeof input}. Must be 'string'.`);
    }
}

function assertUserGenderField(input: unknown, fieldName: string): asserts input is Gender {
    assertUserStringField(input, fieldName);
    if (!Object.values(Gender).includes(input as Gender)
    ) {
        throw new TypeError(
            `Imported user has invalid '${fieldName}' field: ${input}. Must be in '${Object.values(Gender)}'.`
        );
    }
}

function assertUserEmailField(input: unknown, fieldName: string): asserts input is string {
    assertUserStringField(input, fieldName);
    if (input.split('@').length != 2
        || input.split('@')[0].length == 0
        || input.split('@')[1].split('.').length < 2
        || input.split('@')[1].split('..').length > 1
        || input.split('@')[1].split('.')[0].length == 0
        || input.split('@')[1].split('.')[input.split('@')[1].split('.').length - 1].length == 0
    ) {
        throw new TypeError(`Imported user has invalid '${fieldName}' field: ${input}. Must be valid email address.`);
    }
}

function assertUserPhoneField(input: unknown, fieldName: string): asserts input is string {
    assertUserStringField(input, fieldName);
    if (!input.match(/^(\+)?[ \d]+$/)) {
        throw new TypeError(`Imported user has invalid '${fieldName}' field: ${input}. Must be valid phone number.`);
    }
}

function assertUserDateField(input: unknown, fieldName: string): asserts input is string {
    assertUserStringField(input, fieldName);
    if (isNaN(Date.parse(input))) {
        throw new TypeError(`Imported user has invalid '${fieldName}' field: ${input}. Must be valid date.`);
    }
}

function assertUserBloodGroupField(input: unknown, fieldName: string): asserts input is BloodGroup {
    assertUserStringField(input, fieldName);
    if (!Object.values(BloodGroup).includes(input as BloodGroup)
    ) {
        throw new TypeError(
            `Imported user has invalid '${fieldName}' field: ${input}. Must be in '${Object.values(BloodGroup)}'.`
        );
    }
}

function assertUserColorField(input: unknown, fieldName: string): asserts input is Color {
    assertUserStringField(input, fieldName);
    if (!Object.values(Color).includes(input as Color)
    ) {
        throw new TypeError(
            `Imported user has invalid '${fieldName}' field: ${input}. Must be in '${Object.values(Color)}'.`
        );
    }
}

function assertUserHairField(input: unknown, fieldName: string): asserts input is Hair {
    const invalidHairField = new TypeError(`Imported user has invalid '${fieldName}' field: ${JSON.stringify(input)}. Must be valid Hair type.`);
    if (typeof input != 'object'
        || input === null
        || !('color' in input)
        || !('type' in input)
    ) {
        throw invalidHairField;
    }
    try { assertUserColorField(input.color, 'color') }
    catch (e) {
        throw invalidHairField;
    }
    try { assertUserHairTypeField(input.type, 'type') }
    catch (e) {
        throw invalidHairField;
    }
}

function assertUserHairTypeField(input: unknown, fieldName: string): asserts input is HairType {
    assertUserStringField(input, fieldName);
    if (!Object.values(HairType).includes(input as HairType)
    ) {
        throw new TypeError(
            `Imported user has invalid '${fieldName}' field: ${input}. Must be in '${Object.values(HairType)}'.`
        );
    }
}

const user0 = createUserFromImport(dummyusers.users[0]);
console.log(user0);
