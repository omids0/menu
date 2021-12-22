const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
      user: { type: String, require: true },
      customer: [],
      totalPrice: { type: Number, require: true },
      basketItems: [],
      serviceType: { type: String, require: true },
      isDeliverd: { type: Boolean, require: true , default: false },
      tableNum: { type: Number },
      orderDescriptions: { type: String }
},{
      timestams: true,
})

const ordersModel = mongoose.model('order', orderSchema)

module.exports = ordersModel