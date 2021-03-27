import mongoose from "mongoose";

const ProductModel = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: String,
  manufatureDetail:{
      model : String,
      releaseDate: Date,
  },
  Price: Number,
  Currency:String,
//   category: 
  reviews:{
      avgReview: Number,
      reviewCount: Number,
      reviews:[{
          user:{
              type:mongoose.Schema.Types.ObjectId,
              ref:'users'
          },
          point:Number,
          date:Date,
          detail:String
      }]
  }
});
