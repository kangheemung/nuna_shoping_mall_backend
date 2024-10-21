const mongoose = require('mongoose');
const User = require('./User');
const Product = require('./Product');
const Schema = mongoose.Schema;
const orderSchema = Schema(
    {
        userId: { type: mongoose.ObjectId, ref: User, required: true },
        shipTo: { type: Object, required: true },
        contact: { type: Object, required: true },
        totalPrice: { type: Number, default: 0, required: true },
        status: { type: String, default: 'preparing' },
        orderNum: { type: String },
        items: [
            {
                productId: { type: mongoose.ObjectId, ref: 'Product',required: true  },
                size: { type: String, required: true },
                qty: { type: Number, default: 1, required: true },
                price: { type: Number,  required: true },
            },
        ],
    },
    { timestamps: true }
);
orderSchema.methods.toJSON = function () {
    const obj = this._doc;
    delete obj.__v;
    delete obj.updatedAt;
    return obj;
  };
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
