require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const routes = require('./routes/routes');
const adminRoutes = require('./routes/adminRoute');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error',(error)=>{
    console.log(error);
});
database.once('connected',()=>{
    console.log('connected');
});
const app = express();

app.use(express.json());
app.use('/api',routes);
app.use('/admin',adminRoutes);

app.listen(3000,()=>{
    console.log(`Server started at ${3000}`);
});