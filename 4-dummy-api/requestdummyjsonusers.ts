import dummyusers from './dummyusers.json';
import type { AddressOfResidence, BankAccount, BloodGroup, Color, Gender, Hair } from './userfieldtypes';
import {
    assertUserAddressOfResidenceField,
    assertUserBankAccountField,
    assertUserBloodGroupField,
    assertUserColorField,
    assertUserDateField,
    assertUserDomainField,
    assertUserEmailField,
    assertUserGenderField,
    assertUserHairField,
    assertUserIpAddressField,
    assertUserMacAddressField,
    assertUserNonNegativeNumberField,
    assertUserPhoneField,
    assertUserStringField
} from './assertuserfields';
import { cardExpireToDate } from './utilities';

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
    macAddress: string;
    university: string;
    bank: BankAccount;
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
    assertUserIpAddressField(importedUser.ip, 'ip');
    user.ip = importedUser.ip;

    if (!('address' in importedUser)) {
        throw new TypeError(`Imported user has no 'address' field`);
    }
    assertUserAddressOfResidenceField(importedUser.address, 'address');
    user.address = importedUser.address;

    if (!('macAddress' in importedUser)) {
        throw new TypeError(`Imported user has no 'macAddress' field`);
    }
    assertUserMacAddressField(importedUser.macAddress, 'macAddress');
    user.macAddress = importedUser.macAddress;

    if (!('university' in importedUser)) {
        throw new TypeError(`Imported user has no 'university' field`);
    }
    assertUserStringField(importedUser.university, 'university');
    user.university = importedUser.university;

    if (!('bank' in importedUser)) {
        throw new TypeError(`Imported user has no 'bank' field`);
    }
    assertUserBankAccountField(importedUser.bank, 'bank');
    user.bank = {
        cardExpire: cardExpireToDate(importedUser.bank.cardExpire),
        cardNumber: importedUser.bank.cardNumber,
        cardType: importedUser.bank.cardType,
        currency: importedUser.bank.currency,
        iban: importedUser.bank.iban
    }

    return user;
}

const user0 = createUserFromImport(dummyusers.users[0]);
console.log(user0);
