# Stage 1: Build the React app
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the working directory
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app using nginx
FROM nginx:alpine

# Copy the build output to nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
