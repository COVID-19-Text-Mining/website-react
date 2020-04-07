# STAGE 1 build the app
FROM node:10 AS build-stage

ARG gtag=None

# Build the app
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN export REACT_APP_GTAG=$gtag; npm run build

# STAGE 2 run nginx
FROM nginx:latest

# Necessary files
COPY --from=build-stage --chown=root:root /app/build /app/build
COPY --from=build-stage --chown=root:root \
    /app/nginx_conf/covid_scholar_http.conf \
    /etc/nginx/conf.d/default.conf

EXPOSE 80
