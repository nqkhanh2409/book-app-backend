const Order = require("./order.model");

const getAllOrdersByEmail = async (req, res) => {
  try {
    const orders = await Order.find({ email: req.params.email }).sort({ createdAt: -1 });
    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.log("Error fetching orders", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

const createOrder = async (req, res) => {
  try {
    const newOrder = await Order(req.body);
    const savedOrder = newOrder.save();
    res.status(200).json({
      message: "Order created successfully!",
      order: savedOrder,
    });
  } catch (error) {
    console.log("Error creating order", error);
    res.status(500).json({ message: "Error creating order" });
  }
};

module.exports = { getAllOrdersByEmail, createOrder };
