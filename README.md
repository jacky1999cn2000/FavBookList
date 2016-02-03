# FavBookList

### 后端API

##### Book API
1. GET /book/search?q=[关键字] 通过豆瓣API按照关键字搜索书籍
2. GET /book/readfree?q=[ISBN] 通过ISBN在readfree.me网站上搜索相应书籍的网页

1. POST /book -d [name:booklist名字] -h [jwt:login返回的token] 为jwt中user创建一个booklist
2. GET /book -h [jwt:login返回的token] 返回jwt中user的信息和booklist
3. DELETE /book -d [booklist:booklist] -h [jwt:login返回的token] 为jwt中user移除此booklist

1. POST /book/booklist -d [book:book,booklist:booklist] -h [jwt:login返回的token] 将此book添加到此booklist中去
2. GET /book/booklist?id=[booklistid] -h [jwt:login返回的token] 返回该booklist中所有的books
3. DELETE /book/booklist -d [book:book,booklist:booklist] -h [jwt:login返回的token] 将此book此booklist中移去

##### Auth API
1. POST auth/register -d [userName:用户名(邮箱), password:password] 注册用户(密码在数据库中用bcrypt加密)
2. POST auth/login -d [userName:用户名(邮箱), password:password] 用户登录，密码通过bcrypt验证成功后，生成jwt返回



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

* 端口被占用
 * [如何找到占用某端口的进程然后kill掉](http://stackoverflow.com/questions/12397175/how-do-i-close-an-open-port-from-the-terminal-on-the-mac)

* sails policies
 * [policies简介](http://sailsjs.org/documentation/concepts/policies)
 * policies/isAuthenticated.js用来解析jwt,结果存在req.user里面

* sails configs
 * [config简介](http://sailsjs.org/documentation/concepts/configuration)
 * config/appconfig.js里放入可变参数
