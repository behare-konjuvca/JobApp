const ApplicationProcessingStrategy = require("./ApplicationProcessingStrategy");

class InternshipApplicationStrategy extends ApplicationProcessingStrategy {
  processApplications(applications) {
    const filteredApplications = applications.filter((application) => {
      return application.isStudentOrRecentGrad;
    });

    const sortedApplications = filteredApplications.sort((a, b) => {
      return b.motivationScore - a.motivationScore;
    });

    console.log(
      "Processed Internship applications based on education and motivation"
    );
    return sortedApplications;
  }
}

module.exports = InternshipApplicationStrategy;
