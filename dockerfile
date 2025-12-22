FROM node:18.19.1 as base 

WORKDIR /app
# development stage 

FROM base as development 

# Copy package.json first to install dependencies
COPY package.json .
RUN npm install

# Copy the src directory and other files
COPY ./src ./src
COPY . .

EXPOSE 5000

# Run the application, pointing to the correct path for index.js
CMD ["npx", "nodemon", "src/index.js"]

# production stage 
FROM base as production 
COPY package.json .
RUN npm install --only=production 
COPY . .

EXPOSE 5000 
CMD ["node", "src/index.js"]
