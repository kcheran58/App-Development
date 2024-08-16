const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const path= require('path');
const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('./uploads'))
app.use('/uploads', express.static('uploads'));
app.use('/postImages', express.static('postImages'));

//database connection
db();

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
