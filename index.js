const express = require('express');
const app = express();
const swaggerRouter = require('./swagger.js');
const apiRouter = require('./router/main'); 

app.use(express.json());



app.use(apiRouter);
app.use(swaggerRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
