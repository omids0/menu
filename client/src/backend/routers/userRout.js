const express = require("express");
const router = express.Router()
const User = require("../models/usersModel")

router.post('/adduser', async (req, res) => {
      const user = req.body.user
      try {
            const newuser = new User({
                  username: user.username,
                  password: user.password,
                  access: user.access,
                  isActive: user.isActive,
                  phoneNum: user.phoneNum,
            })

            await newuser.save()
            res.send('New User Added.')
      } catch (error) {
            return res.status(400).json({ message: error.message })
      }
})

router.get('/getallusers', async (req, res) => {
      try {
            const getallusers = await User.find({})
            res.send(getallusers)
      } catch (error) {
            return res.status(400).json({ message: error.message })
      }
})

router.post('/edituser', async (req, res) => {
      const userid = req.body.userId
      try {
            const user = await User.findOne({ _id: userid })
            res.send(user)
      } catch (error) {
            return res.status(400).json({ message: error.message })
      }
})

router.post('/updateuser', async (req, res) => {
      const updatedUser = req.body.user
      try {
            const updatingUser = await User.findOne({ _id: updatedUser._id })


            updatingUser.username = updatedUser.username
            updatingUser.password = updatedUser.password
            updatingUser.access = updatedUser.access
            updatingUser.isActive = updatedUser.isActive
            updatingUser.phoneNum = updatedUser.phoneNum

            updatingUser.save()
            res.send('user updated successfully')
      } catch (error) {
            return res.status(400).json({ message: error.message })
      }
})

router.post('/deleteuser', async (req, res) => {
      const userId = req.body.id
      try {
            await User.findOneAndDelete({ _id: userId })
            res.send('user deleted successfully')
      } catch (error) {
            return res.status(400).json({ message: error.message })
      }
})

router.post('/login', async (req, res) => {
      const { username, password } = req.body
      try {
            const searchUser = await User.find({ username, password })
            if (searchUser.length > 0) {
                  const user = {
                        username: searchUser[0].username,
                        password: searchUser[0].password,
                        access: searchUser[0].access,
                        isActive: searchUser[0].isActive,
                        phoneNum: searchUser[0].phoneNum,
                        _id: searchUser[0]._id,
                  }
                  res.send(user)
            } else {
                  return res.status(404).json({ message: 'User not found' })
            }
      } catch (error) {
            return res.status(400).json({ message: error.message })
      }
})

module.exports = router