const express = require('express');
require('dotenv').config();
const app = express();
const cors=require('cors')
const routes = require('./src/routes');
const sequelize = require('./src/conn/dbconnection');
const PORT = process.env.PORT || 5001;



app.use(cors());
app.use(express.json());
require('./src/routes/index')(app);

sequelize.sync().then(() => {
    console.log('All models were synchronized successfully.');
});

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
