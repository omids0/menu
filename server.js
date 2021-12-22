const express = require('express');
const db = require('./client/src/backend/db')
const foodRout = require('./client/src/backend/routers/foodRout')
const userRout = require('./client/src/backend/routers/userRout')
const customerRout = require('./client/src/backend/routers/customerRout')
const orderRout = require('./client/src/backend/routers/orderRout')
const path = require('path');

const app = express();

app.use(express.json())
app.use('/api/foods/', foodRout)
app.use('/api/users/', userRout)
app.use('/api/customers/', customerRout)
app.use('/api/orders/', orderRout)

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
    })
}

app.get('/', (req, res) => {
    res.send('Hi, Server is UP!')
})

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is UP!`));