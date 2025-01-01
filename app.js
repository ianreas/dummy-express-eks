const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

app.get("/debug", (req, res) => {
  try {
    // Get current directory structure using find command
    const directoryStructure = execSync(
      "find /usr/src/app -type f -o -type d"
    ).toString();

    // Get specific cron-jobs directory contents
    const cronJobsPath = "/usr/src/app/cron-jobs";
    let cronJobsContents = "";
    try {
      cronJobsContents = execSync(`ls -la ${cronJobsPath}`).toString();
    } catch (error) {
      cronJobsContents = `Error listing cron-jobs directory: ${error.message}`;
    }

    // Get current working directory
    const cwd = process.cwd();

    const debugInfo = {
      currentWorkingDirectory: cwd,
      fullDirectoryStructure: directoryStructure.split("\n"),
      cronJobsContents: cronJobsContents.split("\n"),
      nodeVersion: process.version,
      platform: process.platform,
      env: process.env,
    };

    res.json(debugInfo);
  } catch (error) {
    res.status(500).json({
      error: "Error getting directory structure",
      message: error.message,
      stack: error.stack,
    });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express.js on EKS!" });
});

app.get("/test-v4", (req, res) => {
  res.json({ message: "Github Actions works!" });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('=== Directory Structure at Startup ===');
  console.log(execSync('find /usr/src/app -type f -o -type d').toString());
});

app.get("/meow", (req, res) => {
  console.log("meow stdout");
  console.error("meow stderr");
  res.json({ message: "Meow from Express.js on EKS!" });
});

app.get("/bark", (req, res) => {
  console.log("bark stdout");
  console.error("bark stderr");
  res.json({ message: "Bark from Express.js on EKS!" });
});
