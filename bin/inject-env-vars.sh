#!/bin/bash

# This script creates static/env.js file containing runtime environment variables
# specified in INJECTED_VARS array

INJECTED_VARS="${INJECTED_VARS:-APP_ENV}"

PROJECT_DIR=$(git rev-parse --show-toplevel)

VARS=()

for var in $INJECTED_VARS; do
  if [[ -n "${!var+set}" ]]
  then
    value="\"${!var}\""
  else
    value='undefined'
  fi

  VARS+=( "$var:$value" )
done

DELIMITER=','
FIELDS="$(printf "%s$DELIMITER" "${VARS[@]}")"

cat > "$PROJECT_DIR/static/env.js" << EOF
window.process={env:{${FIELDS%$DELIMITER}}};
EOF
