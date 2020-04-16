# STAGE 1 build the app
FROM node:10 AS build-stage

# Build the app
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

# STAGE 2 run nginx
FROM nginx:latest

# Make /var/cache/nginx/ writable by non-root users
RUN chgrp nginx /var/cache/nginx/
RUN chmod g+w /var/cache/nginx/

# Necessary files
COPY --from=build-stage --chown=root:root /app/build /app/build
COPY --from=build-stage --chown=root:root \
    /app/nginx_conf/covid_scholar_http.conf \
    /etc/nginx/conf.d/default.conf

# Run as port 8080, which is available to non-root users allows us to drop
# all remaining root capabilities from the container, which improves security.
RUN sed --regexp-extended --in-place=.bak 's%(^\s+listen\s+)80(;)%\18080\2%' /etc/nginx/conf.d/default.conf
EXPOSE 8080

# Write the PID file to a location where regular users have write access.
RUN sed --regexp-extended --in-place=.bak 's%^pid\s+/var/run/nginx.pid;%pid /var/tmp/nginx.pid;%' /etc/nginx/nginx.conf