const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const NEWS_API_KEY = "a96d9eb6b93f46bc9313947bebf9bd05"; // Use a valid key
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?category=general&apiKey=${NEWS_API_KEY}`;

app.get("/news", async (req, res) => {
    try {
        const response = await axios.get(NEWS_API_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch news" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // Important for Vercel!
