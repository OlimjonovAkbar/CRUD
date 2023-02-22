import express from 'express'
import dotenv from 'dotenv'
import productRoute from './src/routes/product.routes.js'

//config
const app = express();
dotenv.config()

// middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// endpoints
app.get('/', (req,res) => {
    res.json({message:'Server working'})
})
app.use('/tasks', productRoute)




// app listen
app.listen(process.env.PORT, ()=> console.log(`> Server work on http://localhost:${process.env.PORT}`))