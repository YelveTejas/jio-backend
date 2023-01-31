const  express = require('express')
const {connect} = require('./config')
const app = express()
app.use(express.json())
require('dotenv').config()
const cors = require('cors')
app.use(cors())

const {router} = require('./Routes')
app.use(router)

// app.get('/',(req,res)=>{
//     res.send('Home')
// })








app.listen(process.env.port,async()=>{
    try{
        await connect
    console.log('Connected to Mongo')
    }catch(err){
        console.log(err)
    }
    console.log('Connected 3500')
})

