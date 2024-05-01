# Use official PostgreSQL image
FROM postgres:latest

# Set environment variable for superuser password
ENV POSTGRES_PASSWORD=password

# Copy initialization script to create database and table
COPY init-db.sql /docker-entrypoint-initdb.d/

# Expose PostgreSQL port (optional, but useful for external access)
EXPOSE 5432

# Set environment variable to log all SQL statements
ENV PGLOG log_statement=all

# Copy script to query database
COPY query-db.sh /usr/local/bin/

# Grant execute permissions to the script
RUN chmod +x /usr/local/bin/query-db.sh

# Command to start PostgreSQL and run the query script
CMD ["postgres"]
