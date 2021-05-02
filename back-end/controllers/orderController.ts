import express from "express";
import mongoose from "mongoose";
import CartModel from "../models/Cart";
import OrderModel from "../models/Orders";

import { commonQuery } from "../shared/utils";

async function OrderList(req, res) {
  try {
    const filter = {};
    const query = OrderModel.find({});
    commonQuery(query, req.query);
    const orders = await query.exec();
    if (orders.length > 0) {
      return res.status(200).json({
        message: "orders successfully fetched",
        success: true,
        data: orders,
      });
    }
    // throw new Error("no data found");
    console.log("no data found");

    return res.status(500).json({
      success: false,
      message: "no data found",
      data: orders,
    });
  } catch (err) {
    console.log("error in orderlist---->", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function addOrder(req, res) {
  try {
    const CartDetail: any = await CartModel.findById(req.body.cartId)
      .lean()
      .exec();

    const newOrder = new OrderModel({
      _id: new mongoose.Types.ObjectId(),
      items: CartDetail.items,
      status: "placed",
      total: CartDetail.total,
      currency: CartDetail.currency,
      paymentStatus: req.body.paymentStatus,
      paymentMode: req.body.paymentMode,
      user: CartDetail.user,
    });

    const createdOrder = await newOrder.save();

    if (createdOrder) {
      const removedFromCart = CartModel.findByIdAndRemove(
        req.body.cartId
      ).exec();
      if (removedFromCart) {
        return res.status(200).json({
          message: "Cart empty & Order saved successfully",
          success: true,
          data: removedFromCart,
        });
      } else
        return res.status(200).json({
          message: "Order saved successfully but not removed from cart",
          success: true,
          data: createdOrder,
        });
    }

    return res.status(200).json({
      message: "Order not saved",
      success: false,
      data: createdOrder,
    });
  } catch (err) {
    console.log("error in addOrder---->");
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function ViewOrder(req, res) {
  try {
    const result = await OrderModel.findById(req.params.orderId).lean().exec();
    if (result) {
      return res.status(200).json({
        success: true,
        data: result,
        message: "Order Fetched SuccessFully",
      });
    }
  } catch (err) {
    console.log("error in viewOrder--->", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export { OrderList, addOrder, ViewOrder };
