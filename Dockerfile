FROM node:alpine
RUN npm install -g http-server
WORKDIR /app
COPY . .           # ← Copy everything from root directory
EXPOSE 8000
CMD ["http-server", "-p", "8000"]