const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
      customerId: { type: Number, require: true },
      customerName: { type: String, require: true },
      customerTel: { type: Number, require: true },
      customerAddress: { type: String, require: true },
}, {
      timestams: true,
})

const customerModel = mongoose.model('customer', customerSchema)

module.exports = customerModel