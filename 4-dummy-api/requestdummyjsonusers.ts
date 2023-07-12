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
    domain: string;
    ip: string;
    address: AddressOfResidence;
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

interface AddressOfResidence {
    address: string;
    city: string;
    coordinates: GeographicCoordinates;
    postalCode: string;
    state: string;
}

interface GeographicCoordinates {
    lat: number;
    lng: number;
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

    if (!('domain' in importedUser)) {
        throw new TypeError(`Imported user has no 'domain' field`);
    }
    assertUserDomainField(importedUser.domain, 'domain');
    user.domain = importedUser.domain;

    if (!('ip' in importedUser)) {
        throw new TypeError(`Imported user has no 'ip' field`);
    }
    assertUserIpField(importedUser.ip, 'ip');
    user.ip = importedUser.ip;

    if (!('address' in importedUser)) {
        throw new TypeError(`Imported user has no 'address' field`);
    }
    assertUserAddressOfResidenceField(importedUser.address, 'address');
    user.address = importedUser.address;

    return user;
}

function assertUserNonNegativeNumberField(input: unknown, fieldName: string): asserts input is number {
    if (typeof input !== 'number') {
        throw new TypeError(`Imported user has invalid '${fieldName}' type: ${typeof input}. Must be 'number'.`);
    }

    if (input < 0) {
        throw new RangeError(`Imported user '${fieldName}' field is out of range: ${input}. Must be non-negative number.`);
    }
}

function assertUserStringField(input: unknown, fieldName: string): asserts input is string {
    if (typeof input !== 'string') {
        throw new TypeError(`Imported user has invalid '${fieldName}' type: ${typeof input}. Must be 'string'.`);
    }
}

function assertUserGenderField(input: unknown, fieldName: string): asserts input is Gender {
    assertUserStringField(input, fieldName);
    if (!Object.values(Gender).includes(input as Gender)) {
        throw new TypeError(
            `Imported user has invalid '${fieldName}' field: ${input}. Must be in '${Object.values(Gender)}'.`
        );
    }
}

function assertUserEmailField(input: unknown, fieldName: string): asserts input is string {
    assertUserStringField(input, fieldName);
    const isEmail = Boolean(input.match(/^\w+@(\w+\.)+\w+$/));
    if (!isEmail) {
        throw new TypeError(`Imported user has invalid '${fieldName}' field: ${input}. Must be valid email address.`);
    }
}

function assertUserPhoneField(input: unknown, fieldName: string): asserts input is string {
    assertUserStringField(input, fieldName);
    const isPhoneNumberWithSpaces = Boolean(input.match(/^(\+)?[ \d]+$/));
    if (!isPhoneNumberWithSpaces) {
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
    if (!Object.values(BloodGroup).includes(input as BloodGroup)) {
        throw new TypeError(
            `Imported user has invalid '${fieldName}' field: ${input}. Must be in '${Object.values(BloodGroup)}'.`
        );
    }
}

function assertUserColorField(input: unknown, fieldName: string): asserts input is Color {
    assertUserStringField(input, fieldName);
    if (!Object.values(Color).includes(input as Color)) {
        throw new TypeError(
            `Imported user has invalid '${fieldName}' field: ${input}. Must be in '${Object.values(Color)}'.`
        );
    }
}

function assertUserHairField(input: unknown, fieldName: string): asserts input is Hair {
    const invalidHairField = new TypeError(
        `Imported user has invalid '${fieldName}' field: ${JSON.stringify(input)}. Must be valid Hair type.`
    );

    if (typeof input !== 'object'
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
    if (!Object.values(HairType).includes(input as HairType)) {
        throw new TypeError(
            `Imported user has invalid '${fieldName}' field: ${input}. Must be in '${Object.values(HairType)}'.`
        );
    }
}

function assertUserDomainField(input: unknown, fieldName: string): asserts input is string {
    assertUserStringField(input, fieldName);
    const isDomain = Boolean(input.match(/^(\w+\.)+\w+$/));
    if (!isDomain) {
        throw new TypeError(`Imported user has invalid '${fieldName}' field: ${input}. Must be valid web domain.`);
    }
}

function assertUserIpField(input: unknown, fieldName: string): asserts input is string {
    assertUserStringField(input, fieldName);
    const invalidIpField = new TypeError(
        `Imported user has invalid '${fieldName}' field: ${input}. Must be valid web domain.`
    );

    const isFourNumbersDividedByDots = Boolean(input.match(/^(\d+\.){3}\d+$/));
    if (!isFourNumbersDividedByDots) {
        throw invalidIpField;
    }

    const ipNumericParts: number[] = input.split('.').map((p) => Number(p));
    const isValidParts: boolean = ipNumericParts.reduce<boolean>(
        (isValidParts: boolean, part: number) => { return isValidParts && (part < 256) },
        true
    );
    if (!isValidParts) {
        throw invalidIpField;
    }
}

function assertUserAddressOfResidenceField(input: unknown, fieldName: string): asserts input is AddressOfResidence {
    const invalidAddressOfResidenceField = new TypeError(
        `Imported user has invalid '${fieldName}' field: ${JSON.stringify(input)}. Must be valid AddressOfResidence type.`
    );

    if (typeof input !== 'object'
        || input === null
        || !('address' in input)
        || !('city' in input)
        || !('coordinates' in input)
        || !('postalCode' in input)
        || !('state' in input)
    ) {
        throw invalidAddressOfResidenceField;
    }

    try { assertUserStringField(input.address, 'address') }
    catch (e) {
        throw invalidAddressOfResidenceField;
    }

    try { assertUserStringField(input.city, 'city') }
    catch (e) {
        throw invalidAddressOfResidenceField;
    }

    try { assertUserGeographicCoordinatesField(input.coordinates, 'coordinates') }
    catch (e) {
        throw invalidAddressOfResidenceField;
    }

    try { assertUserStringField(input.postalCode, 'postalCode') }
    catch (e) {
        throw invalidAddressOfResidenceField;
    }

    try { assertUserStringField(input.state, 'state') }
    catch (e) {
        throw invalidAddressOfResidenceField;
    }
}

function assertUserGeographicCoordinatesField(input: unknown, fieldName: string): asserts input is GeographicCoordinates {
    const invalidGeographicCoordinatesField = new TypeError(
        `Imported user has invalid '${fieldName}' field: ${JSON.stringify(input)}. Must be valid GeographicCoordinates type.`
    )

    if (typeof input !== 'object'
        || input === null
        || !('lat' in input)
        || !('lng' in input)
    ) {
        throw invalidGeographicCoordinatesField;
    }

    try { assertUserNumberRangeField(input.lat, 'lat', [-90, 90]) }
    catch (e) {
        throw invalidGeographicCoordinatesField;
    }

    try { assertUserNumberRangeField(input.lng, 'lng', [-180, 180]) }
    catch (e) {
        throw invalidGeographicCoordinatesField;
    }
}

function assertUserNumberRangeField(input: unknown, fieldName: string, range: [number, number]): asserts input is number {
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

const user0 = createUserFromImport(dummyusers.users[0]);
console.log(user0);
