const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  //applicationID: String,
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobSeeker",
  },
  jobListing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobListing",
  },
  status: String,
});

applicationSchema.methods.updateStatus = function (newStatus) {
  this.status = newStatus;
};

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
