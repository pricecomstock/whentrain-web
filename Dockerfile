FROM node:18-slim as production

# Create app directory
WORKDIR /app

# Copy current directory in
COPY package*.json ./

# install everything
RUN npm install

COPY . .

ENV PORT 80

RUN npm run build

EXPOSE 80

CMD ["node", "build/index.js"]