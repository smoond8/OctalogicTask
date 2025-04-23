FROM node:18

# Set working directory inside container
WORKDIR /app

# Install netcat (or nc)
RUN apt-get update && apt-get install -y netcat-openbsd




# Copy only backend's package.json and lock file
COPY package*.json ./

# Install backend dependencies
RUN npm install --include=dev


# Install nodemon globally
RUN npm install -g nodemon


# Copy entire backend folder content to /app
COPY . ./

# Set the port your app uses
EXPOSE 5001

# Start the app
CMD ["npm", "start"]

