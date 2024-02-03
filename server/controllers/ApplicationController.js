const express = require("express");
const router = express.Router();
const ApplicationService = require("../services/ApplicationService");

const applicationService = new ApplicationService();

router.post("/applications", async (req, res) => {
  try {
    const application = await applicationService.createApplication(req.body);
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/applications/jobListing/:jobListingId", async (req, res) => {
  try {
    const applications = await applicationService.getApplicationsByJobListing(
      req.params.jobListingId
    );
    res.status(200).json(applications);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.patch("/applications/:applicationId/status", async (req, res) => {
  try {
    const updatedApplication = await applicationService.updateApplicationStatus(
      req.params.applicationId,
      req.body.status
    );
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/applications/:applicationId", async (req, res) => {
  try {
    const success = await applicationService.deleteApplication(
      req.params.applicationId
    );
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
