import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: String,
  manufatureDetail: {
    model: String,
    releaseDate: Date,
  },
  price: { type: Number, required: true },
  currency: { type: String, default: "Rs" },
  image: {
    data: Buffer,
    contentType: String,
  },
  //   category:
  reviews: {
    avgReview: Number,
    reviewCount: Number,
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        rating: Number,
        date: Date,
        detail: String,
      },
    ],
  },
});

const ProductModel = mongoose.model("products", ProductSchema);
export default ProductModel;
