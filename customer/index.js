const express = require('express');
const app = express()
app.use(express.json());
app.use('/', (req, res) => {
    res.status(200).json({
        message:'Hello from customer'
    })
})
app.listen(8001, () => {
    console.log("Customer is listen on Port 8001");
    
})