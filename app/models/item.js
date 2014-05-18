'use strict';

class Item{
  constructor(type){
    this.type = type;

    switch(type){
      case 'autogrow':
        this.cost = 50000;
        this.image = '/img/autogrow.jpg';
        break;
      case 'autoseed':
        this.cost = 65000;
        this.image = '/img/autoseed.jpg';
        break;
      case 'autoroot':
        this.cost = 85000;
        this.image = '/img/autoroot.jpg';
        break;
      case 'castle':
        this.cost = 1000000;
        this.image = '/img/castle.jpg';
        break;
    }
  }
}

module.exports = Item;
