# FavBookList

### 后端API

1. /search 通过豆瓣API按照关键字搜索书籍
2. /readfree 通过ISBN在readfree.me网站上搜索相应书籍的网页
3. /register 注册用户(密码在数据库中用bcrypt加密)
4. /login 用户登录，密码通过bcrypt验证成功后，生成jwt返回


---

### 前端

---

### TRIVIA

* MongoDB
 * [通过brew安装local mongodb](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)
 * [/data/db means that it's directly under the '/' root directory](http://stackoverflow.com/questions/7948789/mongodb-mongod-complains-that-there-is-no-data-db-folder)
 * ['sudo mongod' works, 'mongod' doesn't - The Solution](http://www.amirsahib.com/sudo-mongod-works-mongod-doesnt-hot-to-fix/)
 * [MongoLab(u:jackyzhao p:GoogleStory123!@#)](https://mongolab.com/databases/favbooklist#users)
 * 在connection.js中设置adapter & 在models.js选择adapter & 在run.sh中设置env var
 * [Heroku & Sails](http://pburtchaell.com/2015/sails/)

* bcrypt
 * [为了安全，在保存到db之前先使用bcrypt来hash密码](http://codetheory.in/using-the-node-js-bcrypt-module-to-hash-and-safely-store-passwords/)
 * [使用bcrypt-as-promised，以便利用co package](https://www.npmjs.com/package/bcrypt-as-promised)

* jwt
 * [The Anatomy of a JSON Web Token](https://scotch.io/tutorials/the-anatomy-of-a-json-web-token)
 * [The Ins and Outs of Token Based Authentication](https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication)
 * [Authenticate a Node.js API with JSON Web Tokens](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens)

* sailsjs model validation
 * [在create和update时候使用try...catch来捕获 MismatchError](http://sailsjs.org/documentation/concepts/models-and-orm/validations)
