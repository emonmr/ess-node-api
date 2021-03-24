const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    name: String,
    price: Number,
    quantity: Number,
    details: String,
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.id;
        delete ret.user;
    }
});

module.exports = mongoose.model('Product', schema);
