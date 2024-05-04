# Use official Node.js image as base
FROM node:20.6.0

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package*.json .

# Install dependencies
RUN npm install

# Copy rest of the backend application
COPY . .

# Expose port 5000
EXPOSE 5000

# Command to run the backend server
CMD ["npm","run","dev"]
