const ApplicationProcessingStrategy = require("./ApplicationProcessingStrategy");

class FullTimeApplicationStrategy extends ApplicationProcessingStrategy {
  processApplications(applications) {
    const sortedApplications = applications.sort((a, b) => {
      const experienceDifference = b.yearsOfExperience - a.yearsOfExperience;
      if (experienceDifference !== 0) {
        return experienceDifference;
      }

      const educationLevels = { PhD: 3, Masters: 2, Bachelors: 1, Diploma: 0 };
      return (
        educationLevels[b.educationLevel] - educationLevels[a.educationLevel]
      );
    });

    console.log(
      "Processed Full-Time applications based on experience and qualifications"
    );
    return sortedApplications;
  }
}

module.exports = FullTimeApplicationStrategy;
