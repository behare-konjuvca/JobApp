require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Database = require("../db/database"); // Adjust the path if necessary
const JobListingService = require("./services/JobListingService");
const JobListing = require("./models/JobListing");

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

(async function initialize() {
  try {
    console.log("Connecting to database...");
    await Database.connect();
    app.use(bodyParser.json());

    app.post("/api/joblisting/new", async (req, res) => {
      const { title, description } = req.body;
      try {
        const Job = await JobListing.create({
          title,
          description,
        });
        res.json(Job);
      } catch (e) {
        console.error(e);
        res.status(422).json(e);
      }
    });
    app.get("/api/joblistings", async (req, res) => {
      try {
        const jobListings = await JobListingService.getAllJobListings();
        res.json(jobListings);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.get("/test", async (req, res) => {
      res.json("test");
    });

    app.listen(5000, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
})();
