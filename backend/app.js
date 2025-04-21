const express = require('express');
const app = express();
const routes = require('./src/routes');

const PORT = process.env.PORT || 5001;

// Use the routes
app.use('/', routes);




app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
