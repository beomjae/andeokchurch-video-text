# Base Image 
FROM nginx:alpine
#Copy the index.html file /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY server.conf /etc/nginx/conf.d/
COPY ./src /site/public

#Expose Nginx Port
EXPOSE 80
#Start NginxService 
CMD ["nginx", "-g", "daemon off;"]