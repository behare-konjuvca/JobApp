const JobListing = require("../models/JobListing");
module.exports = new JobListingService();
const FullTimeApplicationStrategy = require("./strategies/FullTimeApplicationStrategy");
const PartTimeApplicationStrategy = require("./strategies/PartTimeApplicationStrategy");
const InternshipApplicationStrategy = require("./strategies/InternshipApplicationStrategy");
const ApplicationService = require("./ApplicationService");

class JobListingService {
  constructor() {
    this.applicationService = new ApplicationService();
  }

  async processApplicationsForJobListing(jobListingId) {
    const jobListing = await this.getJobListingById(jobListingId);
    let strategy;

    switch (jobListing.jobType) {
      case "FullTime":
        strategy = new FullTimeApplicationStrategy();
        break;
      case "PartTime":
        strategy = new PartTimeApplicationStrategy();
        break;
      case "Internship":
        strategy = new InternshipApplicationStrategy();
        break;
      default:
        throw new Error("Unknown job type");
    }

    const applications =
      await this.applicationService.getApplicationsByJobListing(jobListingId);

    return strategy.processApplications(applications);
  }
  async getAllJobListings() {
    try {
      console.log("Fetching all job listings...");
      const jobListings = await JobListing.find({});
      console.log("Job listings fetched:", jobListings);
      return jobListings;
    } catch (error) {
      console.error("Error fetching job listings:", error);
      throw error;
    }
  }

  async getJobListingById(id) {
    return await JobListing.findById(id);
  }

  async updateJobListing(id, updateData) {
    return await JobListing.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteJobListing(id) {
    return await JobListing.findByIdAndDelete(id);
  }
  async createJobListing(jobListingData) {
    const jobListing = new JobListing(jobListingData);
    await jobListing.save();
    return jobListing;
  }

  async updateJobListingDetails(listingID, title, description) {
    const jobListing = await JobListing.findOne({ listingID: listingID });
    if (jobListing) {
      jobListing.jobTitle = title;
      jobListing.description = description;
      await jobListing.save();
    }
    return jobListing;
  }
}

module.exports = new JobListingService();
