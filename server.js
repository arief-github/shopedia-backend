const express = require('express');
const dbcon = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');

// another route
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');

const app = express();

const port = process.env.port || 3000;

// middleware
app.use('/api', cors());
app.use(bodyParser.json());

// GET 
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);

app.get('/', (req, res) => {
    res.type('text/plain')
    res.send('Hello World')
})

app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About page')
})


// custom 404 page
app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
})



// listening server port
app.listen(port , () => console.log(`Server running on port ${port}`));