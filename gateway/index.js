const express = require('express');
const cors = require('cors')
const proxy = require('express-http-proxy')
// the request it wil 
// this proxy will redirect request to end points(customer,product,)
const app = express();
app.use(cors())
app.use(express.json());
// 
app.use('/customer', proxy('http://localhost:8001'));
app.use('/shopping', proxy('http://localhost:8003'));
app.use('/', proxy('http://localhost:8002'));  //product default

app.listen(8000, () => {
    console.log("Gateway is listen on Port 8000");
    
})