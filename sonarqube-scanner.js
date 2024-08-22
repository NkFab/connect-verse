const scanner = require("sonarqube-scanner");
const dotenv = require("dotenv");
dotenv.config();

scanner(
  {
    serverUrl: process.env.SONAR_SERVER_URL,
    token: process.env.SONAR_TOKEN,
    options: {
      "sonar.projectName": process.env.SONAR_PROJECT_NAME,
      "sonar.projectKey": process.env.SONAR_PROJECT_KEY,
      "sonar.projectDescription": "MINIJUST backend",
      "sonar.sources": "src",
      "sonar.login": process.env.SONAR_TOKEN
    }
  },
  () => process.exit()
);
