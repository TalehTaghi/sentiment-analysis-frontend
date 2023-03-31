# Use a Node 18 base image
FROM node:18-alpine as build

# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY . .

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci

# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production

# Set the env to "production"
ENV NODE_ENV production

# Copy built assets from `build` image
COPY --from=build /app/build /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port on which the app will be running
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]