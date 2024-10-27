FROM --platform=linux/amd64 node:14-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Create cron-jobs directory explicitly
RUN mkdir -p /usr/src/app/cron-jobs

COPY . .

# Ensure proper permissions
RUN chmod +x /usr/src/app/cron-jobs/*.js

EXPOSE 3000

CMD [ "node", "app.js" ]