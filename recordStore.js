var _ = require('lodash')


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
// Give the RecordStore a balance i.e. cash in bank.
// Add some records to your RecordStore.
// Create a method that lists the inventory.
// Create a method so that the RecordStore can sell a record. Adjust the cash in bank to take into account the price of the record sold
// Create a method that reports on the financial situation of the store. Cash and value of inventory.
// Create a RecordCollector (or customer) constructor who can buy and sell records.
// Use TDD all the way through!



module.exports = {
  recordConstructor: Record
}