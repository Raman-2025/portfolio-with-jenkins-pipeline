FROM node:alpine
RUN npm install -g http-server
WORKDIR /app
COPY . .           
EXPOSE 8000
CMD ["http-server", "-p", "8000"]

