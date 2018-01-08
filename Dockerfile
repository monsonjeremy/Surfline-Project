FROM node:8.8.1-alpine
LABEL name="Surfline Project"
LABEL version="1.0"

# Set env variables for the container
ENV NPM_CONFIG_LOGLEVEL verbose
ENV BABEL_ENV=production NODE_ENV=production

# Setup working directory for the server container
RUN mkdir /app
WORKDIR /app

# Copy over root package file
COPY ./package.json /app/

# Copy over client side code
COPY ./client /app/client
COPY ./.eslintrc.json /app/client

# Copy server files over and install dependencies and compile server code
COPY ./server/ /app/server
COPY ./.eslintrc.json /app/server

# Install all the dependencies (we'll do this all inline with "&& \" because it reduces the build times and footprint of docker)
# We also only do this for PROD since we aren't worried about the footprint locally. This is more used in regards to reducing build times
# See link for more info on the run command and how it creates a container for EACH run command: https://docs.docker.com/engine/reference/commandline/run/#parent-command
RUN npm install && \
  cd client && \
  npm install && \
  npm run build && \
  cd .. && \
  # Install dependencies for rebuilding bcrypt, then run npm install, then rebuild bcrypt
  # This avoids a segmentation fault when using the alpine node image
  # Reference: https://github.com/kelektiv/node.bcrypt.js/issues/528
  apk --no-cache add --virtual build-deps build-base python && \
  cd server && \
  NODE_ENV=development npm install && \
  NODE_ENV=development npm rebuild bcrypt --build-from-source && \
  # Compile server code
  npm run build:server:prod

EXPOSE 80
CMD ["npm", "run", "start:app:prod"]