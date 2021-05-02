import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
const CartSchema = new mongoose.Schema({
  _id: ObjectId,
  user: {
    type: ObjectId,
    ref: "users",
  },
  total: { type: Number, default: 0 },
  currency: { type: String, default: "Rs" },
  items: [
    {
      product: {
        type: ObjectId,
        ref: "products",
      },
      quantity: Number,
    },
  ],
});

const CartModel = mongoose.model("carts", CartSchema);
export default CartModel;
