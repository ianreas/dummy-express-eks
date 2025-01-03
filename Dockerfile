FROM node:14-slim

WORKDIR /usr/src/app

# Copy package files first
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Debug directory contents
RUN echo "=== Contents before mkdir ===" && ls -la

# Create cron-jobs directory if it doesn't exist
RUN mkdir -p /usr/src/app/cron-jobs

# Only chmod if files exist
RUN if [ -n "$(find /usr/src/app/cron-jobs -name '*.js' 2>/dev/null)" ]; then \
        chmod +x /usr/src/app/cron-jobs/*.js; \
    else \
        echo "No .js files found in cron-jobs directory"; \
    fi

# Debug final state
RUN echo "=== Final directory structure ===" && \
    find /usr/src/app -type f -o -type d

EXPOSE 3000

CMD [ "node", "app.js" ]