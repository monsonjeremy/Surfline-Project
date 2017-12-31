FROM node:8.8.1
LABEL name="Surfline Project"
LABEL version="1.0"
ENV NPM_CONFIG_LOGLEVEL verbose

# Set ENV variables for babel to compile server code
ENV BABEL_ENV=production NODE_ENV=production

# Setup working directory for the server container
RUN mkdir /app
WORKDIR /app
RUN mkdir /client
RUN mkdir /server

# Copy over server package.json and install dependencies
COPY ./package.json /app/
RUN npm install

# Copy client files over and install dependencies and build bundle
COPY ./client /app/client
COPY ./.eslintrc.json /app/client
RUN cd client && npm install && npm run build

# Copy server files over and install dependencies and compile server code
COPY ./server/ /app/server
COPY ./.eslintrc.json /app/server
RUN cd server && NODE_ENV=development npm install

# Compile server code
RUN npm run build:server:prod

EXPOSE 80
CMD ["npm", "run", "start:app:prod"]