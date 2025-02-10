const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const NEWS_API_KEY = "a96d9eb6b93f46bc9313947bebf9bd05";

// Route to fetch news based on category
app.get("/news", async (req, res) => {
    const category = req.query.category || "general"; // Default to "general" if no category is provided
    const country = req.query.country || "us"; // Default to "us"

    const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=20&apiKey=${NEWS_API_KEY}`;

    try {
        const response = await axios.get(NEWS_API_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch news", details: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
