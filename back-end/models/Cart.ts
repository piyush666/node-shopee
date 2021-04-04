import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
const CartSchema = new mongoose.Schema({
  _id: ObjectId,
  User: {
    type: ObjectId,
    ref: "users",
  },
  total: Number,
  Currency: String,
  Items: [
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
