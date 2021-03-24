const bcrypt = require('bcryptjs');
const db = require('./db');

module.exports = createTestUser;

async function createTestUser() {
    // create test user if the db is empty
    if ((await db.User.countDocuments({})) === 0) {
        const user = new db.User({
            firstName: 'Test',
            lastName: 'User',
            email: 'emonmr@gmail.com',
            passwordHash: bcrypt.hashSync('11221122', 10),
        });
        await user.save();
        for (let i = 1; i < 10; i++) {
            const product = new db.Product({
                user: user,
                name: 'Product '+ i,
                price: randomInteger(100, 1000),
                quantity: randomInteger(1, 10),
                details: 'this is sample test product '+ i
            })
            await product.save();

        }
        // Create another user
         const user2 = new db.User({
            firstName: 'Test 2',
            lastName: 'User 2',
            email: 'test@dev.com',
            passwordHash: bcrypt.hashSync('11221122', 10),
        });
        await user2.save();
    }
}
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
