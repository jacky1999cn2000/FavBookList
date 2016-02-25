
module.exports = {

  loggedIn() {
    return !!localStorage.token
  },

  request: function(url, callback, data){
    let xhr = new XMLHttpRequest();
    if(!data){
      xhr.addEventListener('load', callback);
      xhr.open('GET', url);
      xhr.send();
    }else{
      xhr.addEventListener('readystatechange', callback);
      xhr.open('POST', url);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(data);
    }
  },

}
