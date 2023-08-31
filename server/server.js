const app = require('./index');
const mongoose = require('mongoose');

require('dotenv').config();

const {PORT, DB_HOST} = process.env;

mongoose.connect(DB_HOST).then(()=>{
    app.listen(PORT || 3000);
    console.log(`Server works in Port ${PORT}`);
}).catch((error)=>console.log(error));

