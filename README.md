# BIBI_Blog
A web application to practice backend NodeJS. This app can serve most daily blog features

The purpose of this app is to practice NodeJS. I learned this from imooc lecture https://coding.imooc.com/class/320.html

* This app currently contains a blog-1 which is a raw NodeJS app without using any fancy framework (Will learn and use Express and Koa2 later)
[UPDATE] blog-express and blog-koa2 are two apps with frameworks

* This app is not online right now. To reproduce this app locally you need to have some basic setups

 * make sure you have npm installed in the system
 * we use some basic libs (mysql, redis, etc). make sure you installed all dependencies
 * we use mysql to store users data and blogs data and redis to store session data. Please install mysql and redis to enable the data management and update conf in ./blog-1/src/conf/db.js
 * we have a very basic front-end vies in ./html-test. To enable front-end views, please install http-server and run http-server -p [port number] -> (I set front http-server to 8001)

 * I use nginx to do the reverse proxy locally to test the login process (work with sessions which stores in redis), to enable this please install nginx and update /usr/local/etc/nginxnginx.conf with: 
```
        location / {
                proxy_pass      http://localhost:8001;
        }

        location /api/ {
                proxy_pass      http://localhost:8000;
                proxy_set_header Host $host;
        }
```

* Once you've finished all up steps, you are ready to reproduce this app
* Before see this app on browser, you need to set up:
 * cd ./blog-1 && npm run dev -> to run dev mod (Currently only enabled dev mod) to run the backend server
 * redis-server -> to run redis in your ROM, noticed that we use the default port: 6379 in our app
 * cd ./html-test && http-server -p 8001 -> to set up the front end page.
 * nginx -> to enable nginx

* Now you can go to http://localhost:8080/ to see this app :)

