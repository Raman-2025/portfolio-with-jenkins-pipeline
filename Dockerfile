FROM nginx:alpine

# Copy website files
COPY . /usr/share/nginx/html/

# Expose port 80 (nginx default)
EXPOSE 80

# nginx starts automatically