FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# 👇 install plugin here OR just rely on package.json
RUN npm install @vitejs/plugin-react

COPY . .

CMD ["npm", "run", "dev"]