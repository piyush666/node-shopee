import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;
const OrdersSchema = new mongoose.Schema({
  _id: ObjectId,
  Items: [
    {
      product: {
        type: ObjectId,
        ref: "products",
      },
      quantity: Number,
    },
  ],
  status: {
    type: String,
    enum: ["placed", "delivered"],
  },
  total: Number,
  Currency: String,
  PaymentStatus: {
    type: String,
    enum: ["paid", "pending"],
  },
  PaymentMode: {
    type: String,
    enum: ["cod", "card", "upi"],
  },
  User: {
    type: ObjectId,
    ref: "users",
  },
});

const OrderModel = mongoose.model("orders", OrdersSchema);
export default OrderModel;
