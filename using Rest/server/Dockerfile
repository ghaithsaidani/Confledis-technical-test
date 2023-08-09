FROM node:18
WORKDIR /app/server/
COPY package*.json /app/server/
RUN npm i
COPY . /app/server/
CMD [ "npm" , "run" , "dev" ]