
module.exports = {

  url: 'http://localhost:1337', // 'http://favbooklist.herokuapp.com',

  loggedIn() {
    return !!localStorage.bookclubtoken;
  },

  request: function(url, callback, method, options){
    options = options || {};
    let xhr = new XMLHttpRequest();

    switch (method) {
      case 'GET':
        xhr.addEventListener('load', callback);
        xhr.open('GET', url);
        if(options.jwt){
          xhr.setRequestHeader('jwt', options.jwt);
        }
        xhr.send();
        break;
      case 'POST':
        xhr.addEventListener('readystatechange', callback);
        xhr.open('POST', url);
        xhr.setRequestHeader('content-type', 'application/json');
        if(options.jwt){
          xhr.setRequestHeader('jwt', options.jwt);
        }
        xhr.send(options.data);
        break;
      case 'DELETE':
        xhr.addEventListener('readystatechange', callback);
        xhr.open('DELETE', url);
        xhr.setRequestHeader('content-type', 'application/json');
        if(options.jwt){
          xhr.setRequestHeader('jwt', options.jwt);
        }
        xhr.send(options.data);
        break;
      default:
        console.log('Something Wrong...');
    }
  },

}
