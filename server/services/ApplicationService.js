const Application = require("./models/Application");

class ApplicationService {
  async createApplication(applicationData) {
    try {
      const application = new Application(applicationData);
      await application.save();
      return application;
    } catch (error) {
      console.error("Error creating application:", error);
      throw error;
    }
  }

  async getApplicationsByJobListing(jobListingId) {
    try {
      return await Application.find({ jobListing: jobListingId }).populate(
        "applicant"
      );
    } catch (error) {
      console.error("Error fetching applications for job listing:", error);
      throw error;
    }
  }

  async getApplicationById(applicationId) {
    try {
      return await Application.findById(applicationId)
        .populate("applicant")
        .populate("jobListing");
    } catch (error) {
      console.error("Error fetching application by ID:", error);
      throw error;
    }
  }

  async updateApplicationStatus(applicationId, newStatus) {
    try {
      const application = await Application.findById(applicationId);
      if (!application) {
        throw new Error("Application not found");
      }
      application.status = newStatus;
      await application.save();
      return application;
    } catch (error) {
      console.error("Error updating application status:", error);
      throw error;
    }
  }

  async deleteApplication(applicationId) {
    try {
      const result = await Application.deleteOne({ _id: applicationId });
      return result.deletedCount > 0;
    } catch (error) {
      console.error("Error deleting application:", error);
      throw error;
    }
  }
}

module.exports = new ApplicationService();
