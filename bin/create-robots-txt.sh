#!/bin/bash

# This script creates public/robots.txt file with environment-dependent rules

PROJECT_DIR=$(git rev-parse --show-toplevel)

if [[ $APP_ENV == 'production' ]]
then
  COMMAND='Allow'
else
  COMMAND='Disallow'
fi

cat > "$PROJECT_DIR/public/robots.txt" << EOF
User-agent: *
$COMMAND: /
EOF
