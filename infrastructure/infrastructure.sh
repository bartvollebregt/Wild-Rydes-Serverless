#!/usr/bin/env bash

# Hash of commit for better identification
COMMAND=$1

if [ -z "$COMMAND" ] || [[ ( "$COMMAND" != "deploy" ) && ( "$COMMAND" != "deploy --force" ) && ( "$COMMAND" != "remove" ) && ( "$COMMAND" != "remove --force" ) ]]; then
  echo "Argument COMMAND was not provided ([deploy], [deploy --force], [remove], [remove --force]), aborting!"
  exit 1
fi

if [ "$COMMAND" == "remove" ] || [ "$COMMAND" == "remove --force" ]; then
    ( cd api; serverless ${COMMAND} )
    ( cd auth; serverless ${COMMAND} )
else
    ( cd auth && serverless ${COMMAND} )
    ( cd api && serverless ${COMMAND} )
fi

echo "WARNING! If an error occurs, the resources will not be removed!"