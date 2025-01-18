const express = require('express');
const app = express()
app.use(express.json());
app.use('/', (req, res) => {
   return res.json(200).json({
        "msg":'Hello from product'
    })
})
app.listen(8002, () => {
    console.log("Product is listen on Port 8002");
    
})