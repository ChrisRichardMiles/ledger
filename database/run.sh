docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
docker cp init-db.sql some-postgres:init-db.sql
docker cp query-db.sql some-postgres:query-db.sql
# Wait for the container to be in a running state
# sleep 3
# Wait for the container to be ready
echo "Waiting for PostgreSQL container to be ready..."
while true; do
    docker logs some-postgres | grep "database system is ready to accept connections"
    if [ $? -eq 0 ]; then
        break
    fi
    sleep 1
done
echo "PostgreSQL container is ready."
docker exec -i some-postgres psql -U postgres -f init-db.sql
docker exec -i some-postgres psql -U postgres -f query-db.sql