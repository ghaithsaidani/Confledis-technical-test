FROM node:18-alpine
WORKDIR /app/client/
COPY package.json /app/client/
RUN npm i
COPY . /app/client/
EXPOSE 5173
CMD [ "npm" , "run" , "dev" ]