#!/usr/bin/env node

// This script creates public/robots.txt file with environment-dependent rules

const fs = require("fs");

const command = process.env.APP_ENV === "production" ? "Allow" : "Disallow";

const robotsContent = `User-agent: *
${command}: /
`;

fs.writeFileSync("public/robots.txt", robotsContent);
