require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const connection = require('./db');
const signupRoutes = require('./routes/signup')
const authRoutes = require('./routes/auth')

connection()

const app = express();

app.use(cookieParser());

app.use(express.json());

const corsConfig = {
    origin: true,
    credentials: true,
  };
  
app.use(cors(corsConfig));
app.options('*', cors(corsConfig))

app.use('/api/users', signupRoutes)
app.use('/api/auth', authRoutes)


const port = process.env.PORT || 8080;
app.listen(port,()=> console.log(`listening on port ${port}`));