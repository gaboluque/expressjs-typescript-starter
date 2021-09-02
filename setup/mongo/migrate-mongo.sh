#!/usr/bin/env node

export $(grep ROOT_MONGODB_URL .env)
export $(grep DATABASE_NAME .env)

mongo_config_path="$PWD/setup/mongo/migrate-mongo-config.ts"

if [ "$1" = "up" -o "$1" = "down" -o "$1" = "status" ]
then
    echo "Running $1 action for migrate-mongo"
    ts-node node_modules/.bin/migrate-mongo $1 -f $mongo_config_path
elif [ "$1" = "create" -a  ! -z "$2" ]
then
    echo "Creating $2 migration with migrate-mongo $1"
    ts-node node_modules/.bin/migrate-mongo $1 $2 -f $mongo_config_path
elif [ "$1" = "create" -a -z "$2" ]
then
    echo "$1 action for migrate-mongo needs a migration name as second parameter."
else
    echo "$1 is not a valid action for migrate-mongo. Valid actions are create, up and down."
fi
