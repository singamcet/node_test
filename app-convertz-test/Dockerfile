FROM node:14

WORKDIR /app-convertz-test
COPY package.json .
RUN npm install -g nodemon
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
