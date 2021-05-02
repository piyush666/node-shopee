import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;
const OrdersSchema = new mongoose.Schema({
  _id: ObjectId,
  items: [
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
  currency: String,
  paymentStatus: {
    type: String,
    enum: ["paid", "pending"],
  },
  paymentMode: {
    type: String,
    enum: ["cod", "card", "upi"],
  },
  user: {
    type: ObjectId,
    ref: "users",
  },
});

const OrderModel = mongoose.model("orders", OrdersSchema);
export default OrderModel;
