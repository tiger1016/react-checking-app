FROM ubuntu:18.04

RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

# Dependencies
RUN apt-get update && apt-get install -y curl gnupg2

# NVM
RUN mkdir -p /usr/local/nvm
ENV NVM_DIR /usr/local/nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
ENV NODE_VERSION v10.16.0
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use $NODE_VERSION"
ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH

# http-server & forever
RUN npm install http-server forever -g

# Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -q -y --no-install-recommends yarn

# Wait
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.1/wait /wait
RUN chmod +x /wait

# APP
WORKDIR /app

ADD yarn.lock /app/yarn.lock
ADD package.json /app/package.json

RUN yarn

RUN export BASE=http://localhost:3301
RUN export E2E_BROWSER=chrome
RUN export E2E_TEST_USERNAME=dougsimon8895@sbcglobal.net
RUN export E2E_TEST_PASSWORD=AGEvlt3$88ENV
RUN export E2E_TIMEOUT_SECONDS=60
RUN export REACT_APP_API_URL=https://api2.petchecktechnology.com/
RUN export REACT_APP_ASSETS_URL=https://s3.amazonaws.com/petcheck-assets/
RUN export REACT_APP_SENTRY_DSN=https://6b3c071ed34b4e9db83c8370d8b6ff79@sentry.io/1436917
RUN export REACT_APP_TITLE=Petcheck
RUN export REACT_APP_WITH_SYSTEMVARS=true
RUN export REACT_GOOGLE_MAPS_API_KEY=AIzaSyCYzAQ94Be9gTD_llKsXkqzfHWoUKd_ZKM
RUN export SELENIUM_REMOTE_URL=http://chrome:4444/wd/hub
RUN export WEBPACK_BUILD_TARGET=testing
ENV BASE http://localhost:3301
ENV E2E_BROWSER chrome
ENV E2E_TEST_PASSWORD AGEvlt3$88ENV
ENV E2E_TEST_USERNAME dougsimon8895@sbcglobal.net
ENV E2E_TIMEOUT_SECONDS 60
ENV REACT_APP_API_URL https://api2.petchecktechnology.com/
ENV REACT_APP_ASSETS_URL https://s3.amazonaws.com/petcheck-assets/
ENV REACT_APP_SENTRY_DSN https://6b3c071ed34b4e9db83c8370d8b6ff79@sentry.io/1436917
ENV REACT_APP_TITLE Petcheck
ENV REACT_APP_WITH_SYSTEMVARS true
ENV REACT_GOOGLE_MAPS_API_KEY AIzaSyCYzAQ94Be9gTD_llKsXkqzfHWoUKd_ZKM
ENV SELENIUM_REMOTE_URL http://chrome:4444/wd/hub
ENV WEBPACK_BUILD_TARGET testing

COPY ./common /app/common
COPY ./custom_plugins /app/custom_plugins
COPY ./public /app/public
COPY ./shared /app/shared
COPY ./src /app/src
COPY ./webpack /app/webpack
COPY ./webpack.config.js /app/webpack.config.js

RUN yarn build

COPY . /app

EXPOSE 3301

# RUN forever start -c http-server /app/dist -p 3301 -P http://localhost:3301?
# command: "http-server /app/dist -p 3301 -P ${BASE}?"

# RUN docker run -d -p 4444:4444 -v /dev/shm:/dev/shm selenium/standalone-chrome

# ENTRYPOINT SELENIUM_REMOTE_URL=http://localhost:4444/wd/hub /app/node_modules/.bin/mocha sel-test.js

