var _ = require('lodash');
var prompt = require('prompt');


// Create a constructor to create Record objects with artist, title, price

var Record = function(title, artist, price){
  this.title = title;
  this.artist = artist;
  this.price = price;
  this.tracks = []

}

Record.prototype = {
  addTrack:function(trackName){
    this.tracks.push(trackName);
  }

}

// Create a RecordStore that has a name, city and multiple records in it's inventory

var Store = function(name, city){
  this.name = name;
  this.city = city;
  this.records = {};
  this.profit = 0;
  this.stockValue = 0;
}

Store.prototype = {
  addRecord:function(record, quantity){
    var key = record.title
    var quantity = quantity || 0;

    if(this.records[key]){
    this.records[key].amount += quantity;  
    }else{
    this.records[key] = {album:record, amount:quantity} 
    
    }//close of if statement
    this.stockValue += (quantity * this.records[key].album.price);

},//close of function
  listInventory:function(){
    inventory = [];
    for(var record in this.records){
        inventoryObject = {};

        inventoryObject[record] = this.records[record].amount;


        // inventoryObject = {record: this.records[record].amount}

        inventory.push(inventoryObject);
    }
    return inventory;
  },

  sellRecord:function(record){
    var key = record.title
      if(this.records[key]){ 
          if(this.records[key].amount > 0){
            this.records[key].amount-= 1;
            this.profit += this.records[key]["album"].price;
            this.stockValue -= this.records[key]["album"].price;
          }else{
            console.log("Sorry out of stock")
          }
      }else{
          console.log("This item is not known")
      }
    
  },

  financialStatement:function(){
    fianceObject = {};
    fianceObject["takings"] = this.profit;
    fianceObject["stockValue"] = this.stockValue;
    fianceObject["inventory"] = this.listInventory();
    console.log(fianceObject)
    return fianceObject
  }

}//close of Store.prototype


//Record Collector Stuff //

var Customer = function(name, cash){
  this.name = name;
  this.cash = cash;
  this.myRecords = {};
}

Customer.prototype = {
  buyRecord: function(record, store){
    var key = record.title;
    if(store.records[key]){
      this.myRecords[key] = {from:store.name, details:record, purchasedOn:new Date().toDateString()};
      store.sellRecord(record);
      this.cash -= record.price;
    }else{
      console.log("Record not available at this store");
    }
  },

  getPaid: function(payment){
    this.cash += payment;
  },

  // enquireAbout:function(store){
  //   prompt.start();
  //   prompt.get(['recordName']), function (err, results){
  //     var key = results.recordName;
  //     if(store.records[key]){
  //       console.log('Record is available');
  //     }else{
  //       console.log('Record not available');
  //     }
  //  } 

  // }
    

}




// Use TDD all the way through!



module.exports = {
  recordConstructor: Record,
  storeConstructor: Store,
  customerConstructor: Customer
}