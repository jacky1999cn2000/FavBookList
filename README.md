# FavBookList

### 后端API

1. /search 通过豆瓣API按照关键字搜索书籍
2. /readfree 通过ISBN在readfree.me网站上搜索相应书籍的网页


---

### 前端

---

### TRIVIA

* MongoDB
 * [通过brew安装local mongodb](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)
 * [/data/db means that it's directly under the '/' root directory](http://stackoverflow.com/questions/7948789/mongodb-mongod-complains-that-there-is-no-data-db-folder)
 * ['sudo mongod' works, 'mongod' doesn't - The Solution](http://www.amirsahib.com/sudo-mongod-works-mongod-doesnt-hot-to-fix/)
 * MongoLab(u:jackyzhao p:GoogleStory123!@#)(https://mongolab.com/databases/favbooklist#users)
 * MongoLab connection
   ``` connection.js  
   mongodb_remote: {  
     adapter: 'sails-mongo',  
     url: process.env.MONGOLAB_URI  
   }      
   ```
    ``` run.sh
    export MONGOLAB_URI=mongodb://root:root@ds055525.mongolab.com:55525/favbooklist
    ```
  * local connection
    ``` connection.js
    mongodb_local: {
      adapter: 'sails-mongo',
      host: 'localhost',
      port: 27017,
      // user: 'username',
      // password: 'password',
      database: 'favbooklist'
    },
    ```
