const express = require('express');
const router = express.Router()
const Food = require('../models/foodsModel')

router.post('/addfoodtomenu', async (req, res) => {
    const food = req.body.food
    try {
        const newFood = new Food({
            name: food.name,
            category: food.category,
            price: food.price,
            description: food.description,
        })
        await newFood.save()
        res.send('Food Added!')
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

router.get('/getallfoods', async (req, res) => {
    try {
        const foods = await Food.find({})
        res.send(foods)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

router.post('/removefood', async (req, res) => {
    const foodId = req.body.id
    try {
        await Food.findOneAndDelete({_id: foodId})
        res.send('food removed from menu.')
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.post('/editfood', async (req, res) => {
    const findFood = req.body.food
    try {
        const food = await Food.findOne({_id: findFood._id})

        food.name= findFood.name
        food.category= findFood.category
        food.price= findFood.price
        food.description = findFood.description

        food.save()
        res.send('food updated!')
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

module.exports = router