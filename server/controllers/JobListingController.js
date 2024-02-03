const JobListingService = require("../services/JobListingService");

class JobListingController {
  async create(req, res) {
    try {
      const jobListing = await JobListingService.createJobListing(req.body);
      res.status(201).send(jobListing);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getAll(req, res) {
    try {
      const jobListings = await JobListingService.getAllJobListings();
      res.send(jobListings);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getById(req, res) {
    try {
      const jobListing = await JobListingService.getJobListingById(
        req.params.id
      );
      if (!jobListing) {
        return res.status(404).send();
      }
      res.send(jobListing);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async update(req, res) {
    try {
      const jobListing = await JobListingService.updateJobListing(
        req.params.id,
        req.body
      );
      if (!jobListing) {
        return res.status(404).send();
      }
      res.send(jobListing);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async delete(req, res) {
    try {
      const jobListing = await JobListingService.deleteJobListing(
        req.params.id
      );
      if (!jobListing) {
        return res.status(404).send();
      }
      res.send(jobListing);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new JobListingController();
