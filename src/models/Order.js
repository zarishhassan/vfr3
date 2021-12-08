const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  user_first_name: {
    type: String,
    required: true,
  },
  user_last_name: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: false,
  },
  user_email: {
    type: String,
    required: true,
  },
  user_phone: {
    type: String,
    required: true,
  },
  user_country: {
    type: String,
    required: true,
  },
  user_address: {
    type: String,
    required: true,
  },
  user_city: {
    type: String,
    required: true,
  },
  user_postcode: {
    type: String,
    required: true,
  },
  user_order_notes: {
    type: String,
    required: false,
  },
  totalPrice: {
    type: Number,
    default: 0.0,
  },

  paymentMethod: {
    type: String,
    required: true
  },

  // it comes from paypal, when you make the payment, after success we get some data back
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_addess: { type: String },
  },

  isPaid: {
    type: Boolean,
    default: false,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Order", orderSchema);
