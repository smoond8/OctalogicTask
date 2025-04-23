#!/bin/sh

echo "⏳ Waiting for Postgres at $DB_HOST:$DB_PORT..."

while ! nc -z $DB_HOST $DB_PORT; do
  sleep 2
done

echo "✅ Postgres is up — starting backend"
exec "$@"

