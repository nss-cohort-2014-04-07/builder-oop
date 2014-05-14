'use strict';

var users = global.nss.db.collection('users');

class User{
  constructor(username){
    this.username = username;
    this.wood = 0;
    this.cash = 0;
  }

  static login(username, fn){
    username = username.trim().toLowerCase();
    users.findOne({username:username}, (e, user)=>{
      if(user){
        fn(user);
      }else{
        user = new User(username);
        users.save(user, ()=>fn(user));
      }
    });
  }
}

module.exports = User;
