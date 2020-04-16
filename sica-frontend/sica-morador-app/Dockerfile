FROM node:alpine as build-deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn config set network-timeout 600000 -g
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:alpine
COPY --from=build-deps /app/build /usr/share/nginx/html
RUN chmod 755 -R /usr/share/nginx/html
# --------- only for those using react router ----------
# if you are using react router 
# you need to overwrite the default nginx configurations
# remove default nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf
# replace with custom one
COPY nginx/nginx.conf /etc/nginx/conf.d
# --------- /only for those using react router ----------
# expose port 80 to the outer world
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]