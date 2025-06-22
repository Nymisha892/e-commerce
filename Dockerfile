# Stage 1: Build the Angular application
FROM node:14 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Angular application in production mode
RUN npm run build --prod

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Remove the default Nginx static assets
# RUN rm -rf /usr/share/nginx/html/* || true




# Copy the Angular build output from the build stage to Nginx’s public folder
COPY --from=build /app/dist/e-commerce-app /usr/share/nginx/html

# USER root
# RUN chown -R nginx:nginx /usr/share/nginx/html
# USER nginx


# Expose port 80 to the container
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

# FROM nginx:alpine

# # Create the client_temp directory and adjust permissions
# RUN mkdir -p /var/cache/nginx/client_temp \
#     && chown -R nginx:nginx /var/cache/nginx

# # Optionally, remove or adjust the "user" directive from the Nginx configuration file.
# # COPY your custom nginx.conf if needed:
# # COPY nginx.conf /etc/nginx/nginx.conf

# # Copy your site files or static files
# COPY ./dist/my-angular-app /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

