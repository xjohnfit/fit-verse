// One-off script: seeds the database with 1000 fake users matching userModel.ts.
// Usage: npx ts-node scripts/seedUsers.ts
import dotenv from 'dotenv';

dotenv.config({
    path:
        process.env.NODE_ENV === 'production'
            ? '.env.production'
            : '.env.development',
});

import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import connectDB, { disconnectDB } from '../config/dbConnection';
import User from '../models/userModel';

const USER_COUNT = 1000;
const SEED_PASSWORD = 'Password123!';
const GENDERS = ['male', 'female', 'other'];
const WEIGHT_UNITS = ['kg', 'lbs'];

const seedUsers = async () => {
    await connectDB();

    console.log(`Hashing shared seed password...`);
    const hashedPassword = await bcrypt.hash(SEED_PASSWORD, 10);

    console.log(`Generating ${USER_COUNT} users...`);
    const users = Array.from({ length: USER_COUNT }, (_, i) => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        return {
            name: `${firstName} ${lastName}`,
            username: `${faker.internet.userName({ firstName, lastName }).toLowerCase()}_${i}`,
            email: `seed_${i}_${faker.string.alphanumeric(8).toLowerCase()}@example.com`,
            password: hashedPassword,
            gender: faker.helpers.arrayElement(GENDERS),
            dob: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
            height: faker.number.int({ min: 150, max: 200 }),
            weight: faker.number.int({ min: 50, max: 120 }),
            weightUnit: faker.helpers.arrayElement(WEIGHT_UNITS),
            goal: faker.helpers.arrayElement([
                'lose weight',
                'build muscle',
                'improve endurance',
                'stay active',
                '',
            ]),
            admin: false,
            isActive: true,
            isBanned: false,
        };
    });

    console.log('Inserting users...');
    // insertMany skips the pre-save hashing hook, so password is pre-hashed above.
    const inserted = await User.insertMany(users, { ordered: false });
    console.log(`Inserted ${inserted.length} users.`);
    console.log(`All seeded users share the password: ${SEED_PASSWORD}`);
};

seedUsers()
    .catch((error) => {
        console.error('Seeding failed:', error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await disconnectDB();
        await mongoose.connection.close();
    });
