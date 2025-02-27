const app = require('./app');
const connectDB = require('./config')


connectDB();


app.listen(7000, () => {
  console.log("Server is running on http://localhost:7000");
});
