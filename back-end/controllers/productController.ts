import express from "express";
import mongoose from "mongoose";
import ProductModel from "../models/Products";
import { commonQuery } from "../shared/utils";
async function productsList(req, res) {
  try {
    const filter = {};
    const query = ProductModel.find(filter);
    commonQuery(query, req.query);
    const products = await query.exec();

    if (products.length > 0)
      return res.status(200).json({
        message: "products fetched successfully",
        success: true,
        data: products,
      });
    throw new Error("no data found");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

async function AddNewProduct(req, res) {
  try {
    const product = new ProductModel({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description,
      manufatureDetail: req.body.manufatureDetail,
      price: req.body.price,
      currency: req.body.currency,
    });
    const result = product.save();
    if (result) {
      return res.status(200).json({
        message: "product saved successfully",
        success: true,
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

async function viewProduct(req, res) {
  try {
    const products = await ProductModel.find({ _id: req.params.id });
    if (products.length > 0)
      return res.status(200).json({
        message: "product fetched successfully",
        success: true,
        data: products,
      });
    throw new Error("no data found");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

export { viewProduct, productsList, AddNewProduct };
