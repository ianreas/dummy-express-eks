FROM --platform=linux/amd64 node:14-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Copy all files first
COPY . .

RUN echo "=== Full directory structure ===" && \
    find /usr/src/app -type f -o -type d && \
    echo "=== Contents of cron-jobs directory ===" && \
    ls -la /usr/src/app/cron-jobs && \
    echo "=== Current working directory ===" && \
    pwd

# Then create directory and set permissions
RUN mkdir -p /usr/src/app/cron-jobs
RUN chmod +x /usr/src/app/cron-jobs/*.js
RUN apk add --no-cache git

EXPOSE 3000


# Add these before the CMD line
RUN ls -la /usr/src/app/cron-jobs
RUN pwd


CMD [ "node", "app.js" ]