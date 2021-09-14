import dotenv from "dotenv";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";
import Razorpay from "razorpay";
import crypto from "crypto";
dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_CLIENT_ID,
  key_secret: process.env.RAZORPAY_CLIENT_SECRET,
});

const orderRouter = express.Router();

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.post(
  "/:id/pay",
  expressAsyncHandler(async (req, res) => {
    try {
      const options = {
        amount: req.body.totalPrice * 100, // amount in smallest currency unit
        currency: "INR",
        receipt: "receipt_order_74394",
      };

      const order = await instance.orders.create(options);

      if (!order) return res.status(500).send("Some error occured");
      // console.log(order);

      res.json(order);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  })
);

orderRouter.post(
  "/:id/pay/success",
  expressAsyncHandler(async (req, res) => {
    try {
      // getting the details back from our font-end
      const {
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
      } = req.body;

      console.log(req.body);

      // Creating our own digest
      // The format should be like this:
      // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
      const shasum = crypto.createHmac(
        "sha256",
        process.env.RAZORPAY_CLIENT_SECRET
      );

      shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

      const digest = shasum.digest("hex");

      // comaparing our digest with the actual signature
      if (digest !== razorpaySignature) {
        return res.status(400).json({ msg: "Transaction not legit!" });
      }

      // THE PAYMENT IS LEGIT & VERIFIED
      // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
      const order = await Order.findById(req.params.id);
      if (order) {
        order.isPaid = true;
        const d = new Date();
        order.paidAt = d;
        order.paymentResult = {
          razorpayPaymentId: razorpayPaymentId,
          orderCreationId: orderCreationId,
          razorpayOrderId: razorpayOrderId,
          status: "success",
        };
      }

      const updatedOrder = await order.save();
      console.log(updatedOrder);

      res.send({ message: "Order paid", order: updatedOrder });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  })
);

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
    }
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

export default orderRouter;
