#!/bin/sh

VALID_ARGUMENTS="[-dev]"

configure() {
  echo "Configure variables for Heroku app $1 ..."
  xargs heroku config:set -a $1 < "./storage/$1/.env"
  echo "Finished configuring $1"
}

# Parse input arguments
if [ $# -eq 1 ]
then
  case $1 in
    -dev)
      configure "eventually-alpha"
      ;;

    *)
      echo "Invalid argument ${1}, expected one of $VALID_ARGUMENTS"
      ;;
  esac

else
  echo "Expected 1 argument $VALID_ARGUMENTS"
fi
