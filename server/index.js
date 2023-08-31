const express = require('express');
const app = express();
const cors = require('cors');

const usersRouter = require("./routes/usersRoute");
const authRouter = require("./routes/authRoute");

app.use(cors());
app.use(express.json());
// app.use(express.static(''));

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);


module.exports = app;