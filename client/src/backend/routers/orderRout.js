const express = require("express")
const router = express.Router()
const Order = require("../models/ordersModel")

router.post('/addneworder', async (req, res) => {
      const addOrder = req.body.order
      try {
            const newOrder = new Order({
                  user: addOrder.user,
                  customer: addOrder.customer,
                  totalPrice: addOrder.totalPrice,
                  basketItems: addOrder.basketItems,
                  serviceType: addOrder.serviceType,
                  isDeliverd: addOrder.isDeliverd,
                  tableNum: addOrder.tableNum,
                  orderDescriptions: addOrder.orderDescriptions,
            })
            newOrder.save()
            res.send('new order added successfully')
      } catch (error) {
            return res.status(400).json({ message: error.message })
      }
})

router.post('/getuserorders', async (req, res) => {
      const userid = req.body.id
      try {
            const userorders = await Order.find({ user: userid })
            res.send(userorders)
      } catch (error) {
            return res.status(400).json({ message: error.message })
      }
})

router.post('/editorder', async (req, res) => {
      const editedOrder = req.body.order
      try {
            const oldOrder = await Order.findOne({ _id: editedOrder._id })

            oldOrder.user = editedOrder.user
            oldOrder.customer = editedOrder.customer
            oldOrder.totalPrice = editedOrder.totalPrice
            oldOrder.basketItems = editedOrder.basketItems
            oldOrder.serviceType = editedOrder.serviceType
            oldOrder.tableNum = editedOrder.tableNum
            oldOrder.orderDescriptions = editedOrder.orderDescriptions

            oldOrder.save()
            res.send('order updated successfully')
      } catch (error) {
            return res.status(400).json({ message: error.message })
      }
})

router.post('/sentorder', async (req, res) => {
      const editedOrder = req.body.order
      try {
            const oldOrder = await Order.findOne({ _id: editedOrder._id })

            oldOrder.isDeliverd = editedOrder.isDeliverd

            oldOrder.save()
            res.send('order updated successfully')
      } catch (error) {
            return res.status(400).json({ message: error.message })
      }
})

router.post('/findorder', async (req, res) => {
      const findorder = req.body.id
      try {
            const order = await Order.findOne({ _id: findorder })
            res.send(order)
      } catch (error) {
            return res.status(400).json({ message: error.message })
      }
})

router.get('/getallsendingorder', async (req, res) => {
      try {
            const userorders = await Order.find({ isDeliverd: false })
            res.send(userorders)
      } catch (error) {
            return res.status(400).json({ message: error.message })
      }
})

router.get('/getallorders', async (req, res) => {
      try {
            const userorders = await Order.find({})
            res.send(userorders)
      } catch (error) {
            return res.status(400).json({ message: error.message })
      }
})

module.exports = router