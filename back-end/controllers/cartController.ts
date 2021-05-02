import express from "express";
import mongoose from "mongoose";
import CartModel from "../models/Cart";
import ProductModel from "../models/Products";
import { commonQuery } from "../shared/utils";

async function cartList(req, res) {
  try {
    const filter = {};
    const query = CartModel.find(filter);
    commonQuery(query, req.query);
    const products = await query.exec();

    if (products.length > 0)
      return res.status(200).json({
        message: "cart list fetched successfully",
        success: true,
        data: products,
      });
    throw new Error("no data found");
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

async function AddToExistingCart(itemList, product, req, res) {
  const item: any = await CartModel.find({
    user: req.body.userId,
    "items.product": req.body.productId,
  })
    .populate("items.product")
    .lean()
    .exec();

  const newItem = { ...item[0] };

  const newTotal =
    Number(newItem.total) + Number(req.body.quantity) * Number(product.price);
  const newQuantity =
    Number(newItem.items[0]?.quantity) + Number(req.body.quantity);
  // console.log("newTotal", newItem, newTotal, req.body);
  console.log(
    "old newquantity",
    newItem.items[0]?.quantity,
    req.body.quantity,
    newQuantity
  );
  // const updated = {};
  const updated = await CartModel.findOneAndUpdate(
    {
      user: req.body.userId,
      "items.product": req.body.productId,
    },
    {
      $set: { total: newTotal, "items.$[element].quantity": newQuantity },
    },
    { arrayFilters: [{ "element.product": req.body.productId }], new: true }
  );
  console.log("updated", updated);
  return res
    .status(200)
    .json({ message: "updated cart successfully", data: updated });
}
async function CartExistedNewItem(item, product, req, res) {
  try {
    const newTotal =
      Number(item[0].total) + Number(req.body.quantity) * Number(product.price);
    const newQuantity = Number(req.body.quantity);

    // const updated = {};
    const ProductItem = {
      product: req.body.productId,
      quantity: req.body.quantity,
    };
    const newItem = {
      product: req.body.productId,
      quantity: req.body.quantity,
    };
    const updated = await CartModel.findOneAndUpdate(
      {
        user: req.body.userId,
      },
      {
        $addToSet: { items: newItem },
        $set: {
          total: newTotal,
          // "items.$[element]": ProductItem,
        },
      },
      {
        new: true,
        // arrayFilters: [{ element: 0 }]
      }
    );
    console.log("updated", updated);
    return res.status(200).json({
      message: "updated cart successfully - CartExistedNewItem",
      data: updated,
    });
  } catch (error) {
    console.log(error);
  }
}
async function AddItemToCart(req, res) {
  try {
    const productDetail: any = await ProductModel.findById(req.body.productId)
      .lean()
      .exec();
    console.log("productDetail", productDetail);

    const item: any = await CartModel.find({
      user: req.body.userId,
      // "items.product": req.body.productId,
    })
      // .populate("items.product")
      .lean()
      .exec();

    console.log(item);
    // res.status(200).json({
    //   message: "cart updated successfully",
    //   success: true,
    //   data: item[0],
    // });
    if (item && item.length > 0) {
      const item2: any = await CartModel.find({
        user: req.body.userId,
        "items.product": req.body.productId,
      })
        // .populate("items.product")
        .lean()
        .exec();
      if (item2 && item2.length > 0) {
        console.log("AddToExistingCart", item2);

        await AddToExistingCart(item, productDetail, req, res);
      } else {
        console.log("CartExistedNewItem,, item", item);
        await CartExistedNewItem(item, productDetail, req, res);
      }
    } else {
      console.log("user is not there in cart");

      let newItems = [
        { product: req.body.productId, quantity: req.body.quantity },
      ];
      const cart = new CartModel({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.userId,
        total: Number(req.body.quantity) * Number(productDetail.price),
        items: newItems,
      });
      const result1 = await cart.save();
      console.log("result1", result1);

      if (result1)
        return res.status(200).json({
          message: "cart saved successfully",
          success: true,
          data: result1,
        });
    }
    res
      .status(200)
      .json({ message: "updated cart not  successfully", data: [] });

    // if (item && item.length > 0) {
    //   await AddToExistingCart(item, req, res);
    // }

    // let newItems = [];
    // if (item.items && item.items.length) {
    //   newItems = item?.items?.map((e) => {
    //     if (e.product !== mongoose.Types.ObjectId(req.body.productId)) {
    //       return e;
    //     } else {
    //       e.quantity = req.body.quantity;
    //     }
    //   });
    //   const newDoc = {
    //     ...item,
    //     total: item.total + Number(req.body.quantity) * Number(req.body.price),
    //     items: newItems,
    //   };
    //   const result = await CartModel.update(
    //     {
    //       user: req.body.userId,
    //     },
    //     newDoc,
    //     {
    //       upsert: true,
    //     }
    //   ).exec();
    //   if (result) {
    //     return res.status(200).json({
    //       message: "cart updated successfully",
    //       success: true,
    //       data: result,
    //     });
    //   }
    // } else {
    // const productItem = await ProductModel.find({
    //   _id: req.body.productId,
    //   price:req.body.price
    // });

    // let newItems = [{ product: req.body.productId, quantity: req.body.quantity }];
    // const cart = new CartModel({
    //   _id: new mongoose.Types.ObjectId(),
    //   user: req.body.userId,
    //   total: Number(req.body.quantity) * Number(req.body.price),
    //   items: newItems,
    // });
    // const result1 = await cart.save();
    // console.log("result1", result1, productItem);

    // if (result1)
    //   return res.status(200).json({
    //     message: "cart saved successfully",
    //     success: true,
    //     data: result1,
    //   });
    // }

    // const product = new CartModel({
    //   _id: new mongoose.Types.ObjectId(),
    //   user: req.body.userId,
    //   title: req.body.title,
    //   description: req.body.description,
    //   manufatureDetail: req.body.manufatureDetail,
    //   price: req.body.price,
    //   currency: req.body.currency,
    // });
    // const result = product.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

export { cartList, AddItemToCart };
