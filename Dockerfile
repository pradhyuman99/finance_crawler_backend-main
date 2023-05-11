# Pulling base image
FROM node:16.15.0-slim

WORKDIR /

# copy files from docker client's current directory
COPY . .

RUN npm install

EXPOSE 8000

# running below command on port 8000 within the container
CMD ["npm", "start"]
