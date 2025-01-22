require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./src/routes/bookRoutes');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});