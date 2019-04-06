# Configure Heroku environment variables

This bash script is used to programmatically configure environment variables
for applications on Heroku.

Please ensure the following before running this script:

- Have Heroku CLI installed
- Be logged in to Heroku using the Heroku CLI
- Have the appropriate environment variables stored in .env files at the specified locations

**IMPORTANT**

This script only needs to be run if new enviornment variables are added
or if environment variables are changed.

## Expected environment variables

Please see the project README for what environment variables are expected.

## Environment variable file locations

Please note where the `.env` files should be stored.
**These files should not be version controlled.**

```
  .
  ├── storage/
  │   ├── eventually-alpha/
  │   │   └── .env
  └── ...
```

## Running the script

Running the script requires executable permissions. You can set it with this command:

```bash
chmod +x ./scripts/heroku/configure-env.sh
```

When running the script, please use one of the [`-dev`] options to specify which environment you want to configure.
For example:

```
./scripts/heroku/configure-env.sh -dev
```
