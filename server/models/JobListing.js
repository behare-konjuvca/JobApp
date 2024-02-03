const mongoose = require("mongoose");
const { Schema } = mongoose;
const jobListingSchema = new Schema({
  // listingID: {
  //   type: String,
  //   required: true,
  // },
  jobTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
});

const JobListing = mongoose.model("JobListing", jobListingSchema);

module.exports = JobListing;
