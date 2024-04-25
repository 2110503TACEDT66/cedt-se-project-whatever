# Use official Node.js image as base
FROM node:latest

# Set working directory in the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json for npm install
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the frontend application
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to build the frontend assets
CMD ["npm", "run", "build"]
