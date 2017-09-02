FROM node:6.9.5

# Set environment variables.
ENV NODE_ENV development
ENV FRONTEND_APP_PATH "/usr/local/src/edgalaxymap"
ENV APP_USER "edgalaxymap"
ENV APP_USER_HOME "/home/edgalaxymap"

# basics
RUN apt-get update
RUN apt-get install -y openssl ruby-full
RUN	npm install --global bower findup-sync grunt-cli@0.1.13
RUN npm link findup-sync

WORKDIR ${FRONTEND_APP_PATH}
ADD bower.json ${FRONTEND_APP_PATH}
ADD package.json ${FRONTEND_APP_PATH}
RUN npm install
RUN bower install --allow-root

RUN /bin/bash -l -c "gem install sass"

# Add the production application
ADD ./ ${FRONTEND_APP_PATH}

# Application user should own the app directory
WORKDIR ${FRONTEND_APP_PATH}
RUN mkdir .tmp/
RUN mkdir .tmp/app/
# Application will be available at the following ports
EXPOSE 9000

# Run this command when the container starts
CMD ["grunt", "serve"]
