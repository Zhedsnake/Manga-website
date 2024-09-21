import mongoose from 'mongoose';
import { guestModel, guestType } from '../../../models/guestModel';

describe('guestModel', () => {

    beforeEach(async () => {
        await mongoose.connection.dropDatabase();
    });

    test('следует создать гостевой документ', async () => {
        const guestData: Partial<guestType> = {};

        const guest = new guestModel(guestData);
        const savedGuest = await guest.save();

        expect(savedGuest).toHaveProperty('_id');

        expect(savedGuest).toHaveProperty('createdAt');

        expect(savedGuest).toHaveProperty('updatedAt');
    });

    test('необходимо получить гостевой документ', async () => {
        const guestData: Partial<guestType> = {};

        const guest = new guestModel(guestData);
        const savedGuest = await guest.save();

        const retrievedGuest = await guestModel.findById(savedGuest._id);

        expect(retrievedGuest).not.toBeNull();

        if (retrievedGuest && "id" in retrievedGuest) {
            expect(retrievedGuest._id).toStrictEqual(savedGuest._id);
        }
    });
});
