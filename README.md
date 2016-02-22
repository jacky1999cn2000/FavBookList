# FavBookList

### 后端API

* Book API
 * GET /book/search?q=[关键字] 通过豆瓣API按照关键字搜索书籍
 * GET /book/readfree?q=[ISBN] 通过ISBN在readfree.me网站上搜索相应书籍的网页

 * POST /book -d [name:booklist名字] -h [jwt:login返回的token] 为jwt中user创建一个booklist
 * GET /book -h [jwt:login返回的token] 返回jwt中user的信息和booklist
 * DELETE /book -d [booklist:booklist] -h [jwt:login返回的token] 为jwt中user移除此booklist

 * POST /book/booklist -d [book:book,booklist:booklist] -h [jwt:login返回的token] 将此book添加到此booklist中去
 * GET /book/booklist?id=[booklistid] -h [jwt:login返回的token] 返回该booklist中所有的books
 * DELETE /book/booklist -d [book:book,booklist:booklist] -h [jwt:login返回的token] 将此book此booklist中移去

* Auth API
 * GET /auth/check -h [jwt:login返回的token] 检查jwt里面的user是否存在
 * POST /auth/register -d [userName:用户名(邮箱), password:password] 注册用户(密码在数据库中用bcrypt加密)
 * POST /auth/login -d [userName:用户名(邮箱), password:password] 用户登录，密码通过bcrypt验证成功后，生成jwt返回
 * DELETE /auth/user -h [jwt:login返回的token] 删除jwt里面的user以及该user所有的booklist

---

### 前端

* sass
 * [如何用bower安装bootstrap and bootswatch theme - 参考style.scss里面的注释](https://github.com/guru-digital/bootswatch-sass)

* gulpfile.js
 * minify-html task 用来最小化html(index.html)
 * sass task 用来compile scss
 * compressed task 用来压缩js
 * connect task 用来serve dist目录下的index.html静态文件
 * watch task 用来监视html,sass,js的变化，然后run相应的task
 * livereload 使得每个task完成后自动reload
 * browserify 把所有的js文件以及用到的dependencies都打包成一个文件
 * babelify 用来把jsx代码转换为js(记住要装babel presets并加到.babelrc里面去)
 * vinyl-source-stream和streamify是为了使得不同的gulp module间stream保持一致
 * uglify 混淆代码

* ReactJS
 * [context](https://medium.com/@skwee357/the-land-of-undocumented-react-js-the-context-99b3f931ff73#.ff4zsw3gy)
 * [react router - examples文件夹里有各种例子](https://github.com/reactjs/react-router/tree/latest)

---

### FRONTEND TRIVIA

 * [animated.css](https://daneden.github.io/animate.css/)
  * 和document中有点不一样的是，当定义一个animate的duration之类的时候，需要写明是哪个animation，如下：
  ```
  .animated.shake
  {
   -webkit-animation-duration: 0.3s;
      -moz-animation-duration: 0.3s;
       -ms-animation-duration: 0.3s;
        -o-animation-duration: 0.3s;
           animation-duration: 0.3s;
  }
  ```
 * React可以在render中通过 ref={(ref) => this.self = ref} 来设定一个自己的ref,然后在其他函数中引用

 ```
 render: function(){

   let divCss = this.props.display ? "alert alert-danger alert-wall animated shake" : "hide";

   return <div className={divCss} ref={(ref) => this.self = ref}>
             <strong>Error:</strong> {this.props.content}
         </div>;
 }

 componentDidUpdate: function() {
   setTimeout(()=>{this.self.className="hide"},3000);
 },
 ```

  * [glyphicon icon位置问题](https://github.com/twbs/bootstrap/issues/12873)
  * bootswatch貌似没有定义下面这一系列(error success)东西，需要自己加进去
     ```
     .has-error {
       .form-control{
         border-color: $brand-danger;
       }
     }
     ```

---

### BACKEND TRIVIA

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

* heroku deploy
 * [git需要在sails项目的根目录，否则的话heroku cedar无法辨识](http://stackoverflow.com/questions/8361475/heroku-push-rejected-no-cedar-supported-app-detected)
 * [如果碰到"heroku does not appear to be a git repository",意味着尚未把heroku加到git remote中去](https://devcenter.heroku.com/articles/git)
 * [如果想移除某个git remote](https://help.github.com/articles/removing-a-remote/)
 * [favbooklist项目把front和sails-app放在一起了，为了depoy sails-app到heroku,需要从github上git clone下来整个项目到一个新地方，然后把sails-app摘出来，再在sails-app里面走这套流程](http://vort3x.me/sailsjs-heroku/)
 * 因为上述的原因^,当update项目的时候，先从heroku上“git clone https://git.heroku.com/favbooklist.git”,login heroku,然后添加heroku remote(heroku git:remote -a favbooklist),然后把旧code从sails-app文件夹里删除，把新的粘贴进去，然后git add, git push
