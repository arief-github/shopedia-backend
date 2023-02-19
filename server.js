const express = require('express');
const dbcon = require('./db');

// another route
const productRoute = require('./routes/productRoute');

const app = express();

const port = process.env.port || 3000;

// GET 
app.use('/api/products', productRoute);

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