FROM node:6.9.5

# Set environment variables.
ENV NODE_ENV development
ENV FRONTEND_APP_PATH "/usr/local/src/edgalaxymap"
ENV APP_USER "edgalaxymap"
ENV APP_USER_HOME "/home/edgalaxymap"

# Add the Application User to the container
RUN mkdir ${APP_USER_HOME} && \
    groupadd -r ${APP_USER} -g 433 && \
    useradd -u 431 -r -g ${APP_USER} -d ${APP_USER_HOME} -s /sbin/nologin -c "Docker image user" ${APP_USER} && \
    chown -R ${APP_USER}:${APP_USER} ${APP_USER_HOME}


# basics
RUN apt-get update
RUN apt-get install -y openssl ruby-full
RUN	npm install --global bower grunt-cli

RUN /bin/bash -l -c "gem install sass"

# Add the production application
ADD ./ ${FRONTEND_APP_PATH}

# Application user should own the app directory
RUN chown -R ${APP_USER}:${APP_USER} ${FRONTEND_APP_PATH}
WORKDIR ${FRONTEND_APP_PATH}

# install dependencies as the application user and build the application
USER edgalaxymap
RUN npm install
RUN bower install

# Application will be available at the following ports
EXPOSE 9000

# Run this command when the container starts
CMD ["grunt", "serve"]
