FROM node:20-alpine

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

EXPOSE 4000

# Use dev command by default (can be overridden in docker-compose)
CMD ["npm", "run", "dev"]