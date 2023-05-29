#!/bin/bash
docker compose -f docker-compose.database.yml up -d

sleep 10

docker compose -f docker-compose.yml up -d