# FavBookList

### 后端API

* Book API
 * GET /book/search?q=[关键字]&start=[index] 通过豆瓣API按照关键字搜索书籍
```
  {
    "hasNext": true,
    "hasPrev": false,
    "nextStart": 20,
    "books": [
      {
        "images": {
          "small": "https://img3.doubanio.com/spic/s6640171.jpg",
          "large": "https://img3.doubanio.com/lpic/s6640171.jpg",
          "medium": "https://img3.doubanio.com/mpic/s6640171.jpg"
        },
        "alt": "http://book.douban.com/subject/6510686/",
        "title": "Google时代的工作方法",
        "author": [
          "【美】道格拉斯*梅里尔  詹姆斯*马丁"
        ],
        "isbn13": "9787508627601"
      },
      {
        "images": {
          "small": "https://img3.doubanio.com/spic/s3965260.jpg",
          "large": "https://img3.doubanio.com/lpic/s3965260.jpg",
          "medium": "https://img3.doubanio.com/mpic/s3965260.jpg"
        },
        "alt": "http://book.douban.com/subject/3352459/",
        "title": "星球Google",
        "author": [
          "兰德尔·斯特罗斯"
        ],
        "isbn13": "9787802491168"
      },
      {
        "images": {
          "small": "https://img1.doubanio.com/spic/s1518849.jpg",
          "large": "https://img1.doubanio.com/lpic/s1518849.jpg",
          "medium": "https://img1.doubanio.com/mpic/s1518849.jpg"
        },
        "alt": "http://book.douban.com/subject/1396503/",
        "title": "Google成功的七堂课",
        "author": [
          "罗耀宗"
        ],
        "isbn13": "9787121013577"
      },
      {
        "images": {
          "small": "https://img1.doubanio.com/spic/s1377613.jpg",
          "large": "https://img1.doubanio.com/lpic/s1377613.jpg",
          "medium": "https://img1.doubanio.com/mpic/s1377613.jpg"
        },
        "alt": "http://book.douban.com/subject/1346353/",
        "title": "Google成功的七堂課",
        "author": [
          "羅耀宗"
        ],
        "isbn13": "9789572983768"
      }
    ]
  }
```
 * GET /book/readfree?q=[ISBN] 通过ISBN在readfree.me网站上搜索相应书籍的网页
 ```
  {
    "status": "notFound"
  }
 ```
 ```
   {
     "status": "http://readfree.me/book/3352459/"
   }
 ```

 * POST /book -d [name:booklist名字] -h [jwt:login返回的token] 为jwt中user创建一个booklist
  ```
    {
      "status": "error",
      "statusMessage": "A booklist with same name already exists."
    }
  ```
  ```
    {
      "status": "ok",
      "data": {
        "name": "novels",
        "owner": "56d892f19eea865c0536ac4e",
        "createdAt": "2016-03-04T02:51:52.865Z",
        "updatedAt": "2016-03-04T02:51:52.865Z",
        "id": "56d8f8489eea865c0536ac51"
      }
    }
  ```

 * GET /book -h [jwt:login返回的token] 返回jwt中user的信息和booklist
   ```
   {
      "status": "ok",
      "data": {
        "booklist": [
          {
            "name": "sci-fi",
            "owner": "56d892f19eea865c0536ac4e",
            "createdAt": "2016-03-04T02:38:08.811Z",
            "updatedAt": "2016-03-04T02:38:08.811Z",
            "id": "56d8f5109eea865c0536ac4f"
          },
          {
            "name": "sports",
            "owner": "56d892f19eea865c0536ac4e",
            "createdAt": "2016-03-04T02:38:12.905Z",
            "updatedAt": "2016-03-04T02:38:12.905Z",
            "id": "56d8f5149eea865c0536ac50"
          },
          {
            "name": "novels",
            "owner": "56d892f19eea865c0536ac4e",
            "createdAt": "2016-03-04T02:51:52.865Z",
            "updatedAt": "2016-03-04T02:51:52.865Z",
            "id": "56d8f8489eea865c0536ac51"
          }
        ],
        "username": "liang.zhao83@gmail.com",
        "createdAt": "2016-03-03T19:39:29.006Z",
        "updatedAt": "2016-03-03T19:39:29.006Z",
        "id": "56d892f19eea865c0536ac4e"
      }
    }
   ```
 * DELETE /book -d [booklist:booklist] -h [jwt:login返回的token] 为jwt中user移除此booklist

 ```
 {
  "status": "ok",
  "data": [
    {
      "name": "novels",
      "owner": "56d892f19eea865c0536ac4e",
      "createdAt": "2016-03-04T02:51:52.865Z",
      "updatedAt": "2016-03-04T02:51:52.865Z",
      "id": "56d8f8489eea865c0536ac51"
    }
  ]
}
 ```

 * POST /book/booklist -d [book:book,booklist:booklist] -h [jwt:login返回的token] 将此book添加到此booklist中去

 ```
 {
   "status": "ok",
   "data": {
     "images": {
       "small": "https://img1.doubanio.com/spic/s28278604.jpg",
       "large": "https://img1.doubanio.com/lpic/s28278604.jpg",
       "medium": "https://img1.doubanio.com/mpic/s28278604.jpg"
     },
     "alt": "http://book.douban.com/subject/26582822/",
     "title": "重新定义公司",
     "author": [
       "[美]埃里克·施密特"
     ],
     "isbn13": "9787508653594",
     "createdAt": "2016-03-04T03:05:21.412Z",
     "updatedAt": "2016-03-04T03:05:21.412Z",
     "id": "56d8fb719eea865c0536ac52"
   }
 }
  ```

 * GET /book/booklist?id=[booklistid] -h [jwt:login返回的token] 返回该booklist中所有的books
   ```
   {
      "status": "ok",
      "data": {
        "books": [
          {
            "images": {
              "small": "https://img1.doubanio.com/spic/s28278604.jpg",
              "large": "https://img1.doubanio.com/lpic/s28278604.jpg",
              "medium": "https://img1.doubanio.com/mpic/s28278604.jpg"
            },
            "alt": "http://book.douban.com/subject/26582822/",
            "title": "重新定义公司",
            "author": [
              "[美]埃里克·施密特"
            ],
            "isbn13": "9787508653594",
            "createdAt": "2016-03-04T03:05:21.412Z",
            "updatedAt": "2016-03-04T03:05:21.412Z",
            "id": "56d8fb719eea865c0536ac52"
          },
          {
            "images": {
              "small": "https://img1.doubanio.com/spic/s8894789.jpg",
              "large": "https://img1.doubanio.com/lpic/s8894789.jpg",
              "medium": "https://img1.doubanio.com/mpic/s8894789.jpg"
            },
            "alt": "http://book.douban.com/subject/3865371/",
            "title": "Google将带来什么?",
            "author": [
              "杰夫·贾维斯"
            ],
            "isbn13": "9787802491502",
            "createdAt": "2016-03-04T03:07:11.059Z",
            "updatedAt": "2016-03-04T03:07:11.059Z",
            "id": "56d8fbdf9eea865c0536ac54"
          }
        ],
        "owner": "56d892f19eea865c0536ac4e",
        "name": "sports",
        "createdAt": "2016-03-04T02:38:12.905Z",
        "updatedAt": "2016-03-04T03:07:11.065Z",
        "id": "56d8f5149eea865c0536ac50"
      }
    }
   ```

 * DELETE /book/booklist -d [book:book,booklist:booklist] -h [jwt:login返回的token] 将此book此booklist中移去
  ```
  {
    "status": "ok"
  }
  ```
* Auth API
 * GET /auth/check?username=[username] 检查username是否存在 存在返回error,不存在返回ok
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
 * [programatically naviate out of compoments](https://github.com/reactjs/react-router/blob/master/docs/guides/NavigatingOutsideOfComponents.md)
 * [browserHistory使用时配置server - 部署前修改](https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md)
 * [setTimeout scope的绑定 (closure or bind())](http://stackoverflow.com/questions/1728563/changing-the-scope-of-an-anonymous-function-on-a-settimeout-causes-a-weird-warni)
   ```
     setTimeout((function(){
       this.setState({messages:this.state.messages});
       browserHistory.push('/');
     }).bind(this), 3000);
   ```
 * [React-Bootstrap](http://react-bootstrap.github.io/getting-started.html)

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
 * [当update项目的时候](https://dashboard.heroku.com/apps/favbooklist/deploy/heroku-git)
