FROM node:14

# Set working directory
WORKDIR /app

# Copy frontend code
COPY / .

# Install dependencies
RUN npm install

# Build frontend
RUN npm run build

# Expose port
EXPOSE 3000

# Command to run the frontend
CMD ["npm", "start"]

