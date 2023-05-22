FROM node:12.18.1 AS development
WORKDIR /usr/src/app
ENV NODE_OPTIONS=--max_old_space_size=8192
RUN npm install glob rimraf
RUN npm install glob react-scripts
COPY . .
RUN npm install --only=development
RUN npm install typescript
RUN npm run build

FROM nginx as production
WORKDIR /var/www/html/
COPY --from=development /usr/src/app/build /var/www/html/
RUN echo "server {" > /etc/nginx/conf.d/default.conf
RUN echo "    listen 80;" >> /etc/nginx/conf.d/default.conf
RUN echo "    listen [::]:80;" >> /etc/nginx/conf.d/default.conf
RUN echo "    server_name _;" >> /etc/nginx/conf.d/default.conf
RUN echo "    root /var/www/html;" >> /etc/nginx/conf.d/default.conf
RUN echo "    index index.html index.htm;" >> /etc/nginx/conf.d/default.conf
RUN echo "    default_type text/html;" >> /etc/nginx/conf.d/default.conf
RUN echo "    location / {" >> /etc/nginx/conf.d/default.conf
RUN echo "        try_files \$uri \$uri/ /index.html;" >> /etc/nginx/conf.d/default.conf
RUN echo "    }" >> /etc/nginx/conf.d/default.conf
RUN echo "}" >> /etc/nginx/conf.d/default.conf



#  docker build -t registry.solidtech.vn/ekyc/frontend . 
#  docker push registry.solidtech.vn/ekyc/frontend