const express = require('express');
const dotenv=require('dotenv').config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const PORT = process.env.APP_PORT;
app.listen(PORT,()=>console.log(`Server is running on http://localhost:${PORT}`));