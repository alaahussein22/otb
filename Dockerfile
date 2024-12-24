# Base image
FROM node:20 as build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the entire app to the working directory
COPY . .

RUN  npm run build

EXPOSE 4173
CMD ["npm", "run", "preview"]