const ApplicationProcessingStrategy = require("./ApplicationProcessingStrategy");

class PartTimeApplicationStrategy extends ApplicationProcessingStrategy {
  processApplications(applications) {
    const sortedAndFilteredApplications = applications
      .filter((application) => {
        return this.meetsAvailabilityRequirements(application.availability);
      })
      .sort((a, b) => {
        return b.flexibilityScore - a.flexibilityScore;
      });

    console.log(
      "Processed Part-Time applications based on availability and flexibility"
    );
    return sortedAndFilteredApplications;
  }

  meetsAvailabilityRequirements(availability) {
    return true;
  }
}

module.exports = PartTimeApplicationStrategy;
