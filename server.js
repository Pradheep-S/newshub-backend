const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS

const NEWS_API_KEY = process.env.NEWS_API_KEY; // Store API key in .env

app.get("/news", async (req, res) => {
    const category = req.query.category || "general";
    const country = req.query.country || "us";

    const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=20&apiKey=${NEWS_API_KEY}`;

    try {
        const response = await axios.get(NEWS_API_URL);
        
        res.set("Cache-Control", "no-store"); // Prevents caching
        res.set("Expires", "-1"); // Ensures fresh data
        res.set("Pragma", "no-cache"); // Extra protection against caching

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch news", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
