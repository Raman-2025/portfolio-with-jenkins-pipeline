# Use smaller Node.js alpine image
FROM node:alpine

# Install a simple static server
RUN npm install -g http-server

# Set working directory
WORKDIR /app

# Copy website files
COPY src/ .

# Expose port 8080 (http-server default)
EXPOSE 8080

# Start the server
CMD ["http-server", "-p", "8080"]