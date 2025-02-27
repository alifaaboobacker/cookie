const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');
const scoreRouter = require('./routes/scoreRoutes');
const cors = require('cors');

app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://192.168.3.15:3000'],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
)
app.use('/user',userRouter);
app.use('/score',scoreRouter);


module.exports = app;