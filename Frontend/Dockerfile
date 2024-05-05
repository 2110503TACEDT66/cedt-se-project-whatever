# Use official Node.js image as base
FROM node:20.6.0

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the frontend application
COPY . .

# Expose port 3000 for the development server
EXPOSE 3000

# Command to start the development server
CMD ["npm", "run", "dev"]
