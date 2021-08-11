const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

const generateScraperUrl = (api_key) =>
  `http://api.scraperapi.com?api_key=${api_key}&autoparse=true`;

app.use(express.json());

//Get Product Details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/dp/${productId}`
    );

    res.status(200).json(JSON.parse(response));
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
});

//Get Product Reviews
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    );

    res.status(200).json(JSON.parse(response));
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
});

//Get Product Offers
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );

    res.status(200).json(JSON.parse(response));
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
});

//Get Search Result
app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/s?k=/${searchQuery}`
    );

    res.status(200).json(JSON.parse(response));
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to Amazon API Scraper.");
});

app.listen(PORT, () => console.log(`Server Running on PORT : ${PORT}`));
