const express=require('express')
const cors=require('cors')
require('dotenv').config()


const app = express();
app.use(cors());
app.use(express.json())

require('./DB/connection')

const router=require('./Router/router')
app.use('/api',router);


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`listening on port:[${PORT}]`))

