FROM node:11.15.0-alpine as build-step
WORKDIR /app
COPY package.json ./
RUN npm cache verify
RUN npm clean-install
COPY . .
RUN npm run build -- --configuration=production

FROM nginx:alpine-perl as prod-stage
COPY docker/nginx/default.conf.template /etc/nginx/conf.d/default.conf.template

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-step app/dist/ProSubject /usr/share/nginx/html

## startup.sh script is launched at container run
CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
