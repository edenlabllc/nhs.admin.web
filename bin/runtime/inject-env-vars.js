#!/usr/bin/env node

// This script creates static/env.js file containing runtime environment variables
// specified in INJECTED_VARS array

const fs = require("fs");

let { INJECTED_VARS } = process.env;

INJECTED_VARS = INJECTED_VARS ? INJECTED_VARS.split(" ") : ["APP_ENV"];

const env = Object.entries(process.env)
  .filter(([key]) => INJECTED_VARS.includes(key))
  .reduce((env, [key, value]) => Object.assign(env, { [key]: value }), {});

fs.writeFileSync("static/env.js", `window.process=${JSON.stringify({ env })};`);
