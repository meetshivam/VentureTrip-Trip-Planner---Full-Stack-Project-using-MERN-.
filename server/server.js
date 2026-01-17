const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// 1. Import your routes
const tripRoutes = require('./routes/tripRoutes');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// 2. Add the JSON parser middleware (must be before routes)
app.use(express.json());

// 3. Mount your routes
// This matches the baseURL in your frontend api.js
app.use('/api/trips', tripRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.log("MongoDB connection error:", err));

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});