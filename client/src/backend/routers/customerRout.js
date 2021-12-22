const express = require('express');
const router = express.Router()
const Customer = require('../models/customersModel')

router.post('/addnewcustomer', async (req, res) => {
      const addCustomer = req.body.customer
      try {
            const newCustomer = new Customer({
                  customerId: addCustomer.customerId,
                  customerName: addCustomer.customerName,
                  customerTel: addCustomer.customerTel,
                  customerAddress: addCustomer.customerAddress,
            })
            await newCustomer.save()
            res.send('new customer added.')
      } catch (error) {
            return res.status(400).json({ message: error.message })
      }
})

router.post('/findbycustomerid', async (req, res) => {
      const findCustomer = req.body.customerId
      try {
            const searchCustomers = await Customer.find({ customerId: findCustomer })
            if (searchCustomers.length > 0) {
                  const customer = {
                        customerId: searchCustomers[0].customerId,
                        customerName: searchCustomers[0].customerName,
                        customerTel: searchCustomers[0].customerTel,
                        customerAddress: searchCustomers[0].customerAddress,
                  }
                  res.send(customer)
            } else {
                  return res.status(400).json({ message: 'Customer not found' })
            }
      } catch (error) {
            return res.status(400).json({ message: error.message })
      }
})

router.get('/getallcustomers', async (req, res) => {
      try {
            const allCustomers = await Customer.find({})
            res.send(allCustomers)
      } catch (error) {
            return res.status(400).json({ message: error.message })
      }
})

router.post('/removecustomer', async (req, res) => {
      const customerid = req.body.id
      try {
            await Customer.findOneAndDelete({ _id: customerid })
            res.send('customer deleted!')
      } catch (error) {
            return res.status(400).json({ message: error.message })
      }
})

router.post('/editcustomer', async (req, res) => {
      const customerUpdate = req.body.customer
      try {
            const customer = await Customer.findOne({ _id: customerUpdate._id })

            customer.customerId= customerUpdate.customerId
            customer.customerName= customerUpdate.customerName
            customer.customerTel= customerUpdate.customerTel
            customer.customerAddress= customerUpdate.customerAddress

            customer.save()
            res.send('customer updated successfully')
      } catch (error) {
            return res.status(400).json({ message: error.message })
      }
})

module.exports = router