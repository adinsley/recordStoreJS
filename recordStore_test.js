var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;


var imported = require('./recordStore');
var Record = imported.recordConstructor;
var Store = imported.storeConstructor;
var Customer = imported.customerConstructor;

describe('My JS Record Shop', function(){
  it('Can I add records and access the functions', function(){
    var record1 = new Record("Sign of the times", "Prince", 9.99);
    assert.equal(9.99, record1.price);
    assert.equal("Sign of the times", record1.title);
    assert.equal("Prince", record1.artist);
    assert.deepEqual([], record1.tracks);

  });

  it('Can I add tracks to records and access the information', function(){
    var record1 = new Record("Sign of the times", "Prince", 9.99);
    record1.addTrack("Gonna be a beautiful night")
    assert.equal(9.99, record1.price);
    assert.equal("Sign of the times", record1.title);
    assert.equal("Prince", record1.artist);
    assert.deepEqual(["Gonna be a beautiful night"], record1.tracks);

  });

  it('Can I create a record store and get it to display the store info', function(){
    var store1 = new Store("Selectadisc", "Nottingham")
    assert.equal("Selectadisc", store1.name);
    assert.equal("Nottingham", store1.city);
    assert.equal(0, store1.profit);
    assert.equal(0, store1.stockValue);
    assert.deepEqual({}, store1.records);

  });

  it('Can I add a record to the store and access the information', function(){
    var store1 = new Store("Selectadisc", "Nottingham")
    var record1 = new Record("Sign of the times", "Prince", 10);
    var record2 = new Record("Controversy", "Prince", 20);
    record1.addTrack("Gonna be a beautiful night")
    store1.addRecord(record1, 2);
    store1.addRecord(record2, 1);
    assert.deepEqual(1, store1.records["Controversy"].amount);
    assert.deepEqual(40, store1.stockValue);
    
  });

  it('Can I create an inventory with albums and amounts', function(){
    var store1 = new Store("Selectadisc", "Nottingham")
    var record1 = new Record("Sign of the times", "Prince", 10);
    var record2 = new Record("Controversy", "Prince", 20);
    record1.addTrack("Gonna be a beautiful night")
    store1.addRecord(record1, 20);
    store1.addRecord(record2, 10);
    assert.deepEqual([ { 'Sign of the times': 20 }, { Controversy: 10 } ], store1.listInventory());
    
    
  });

  it('Can I sell a record', function(){
    var store1 = new Store("Selectadisc", "Nottingham")
    var record1 = new Record("Sign of the times", "Prince", 10);
    var record2 = new Record("Controversy", "Prince", 20);
    var record3 = new Record("Diamonds and Pearls", "Prince", 5);
    record1.addTrack("Gonna be a beautiful night")
    store1.addRecord(record1, 20);
    store1.addRecord(record2, 2);
    store1.sellRecord(record2)
    store1.sellRecord(record2)
    assert.deepEqual(40, store1.profit);
    
    
  });

  it('Can I make an accurate  financial statement that I can use', function(){
    var store1 = new Store("Selectadisc", "Nottingham")
    var record1 = new Record("Sign of the times", "Prince", 10);
    var record2 = new Record("Controversy", "Prince", 20);
    var record3 = new Record("Diamonds and Pearls", "Prince", 5);
    record1.addTrack("Gonna be a beautiful night")
    store1.addRecord(record1, 20);
    store1.addRecord(record2, 10);
    store1.sellRecord(record2);
    store1.sellRecord(record2);
    var statement = store1.financialStatement();
    assert.deepEqual(360, statement["stockValue"]);
    assert.deepEqual(40, statement["takings"]);

    });

  it('Does my customer constructor work', function(){
    var store1 = new Store("Selectadisc", "Nottingham")
    var customer1 = new Customer("Andrew", 50)
    
    assert.equal("Andrew", customer1.name);
    assert.deepEqual(50, customer1.cash);

    });

  it('Can my customer buy a record with datetime', function(){
    var store1 = new Store("Selectadisc", "Nottingham")
    var customer1 = new Customer("Andrew", 50)
    var record1 = new Record("Sign of the times", "Prince", 10);
    customer1.buyRecord(record1, store1);
    assert.deepEqual({}, customer1.myRecords);

    });

  it('Customer buys record and autimatically runs sellRecors', function(){
    var store1 = new Store("Selectadisc", "Nottingham")
    var customer1 = new Customer("Andrew", 50)
    var record1 = new Record("Sign of the times", "Prince", 10);
    store1.addRecord(record1, 20);
    customer1.buyRecord(record1, store1);
    var statement = store1.financialStatement();
    assert.deepEqual(10, statement.takings);

    });

  it('Customer buys record and spends cash', function(){
    var store1 = new Store("Selectadisc", "Nottingham")
    var customer1 = new Customer("Andrew", 50)
    var record1 = new Record("Sign of the times", "Prince", 10);
    store1.addRecord(record1, 20);
    customer1.buyRecord(record1, store1);
    assert.deepEqual(40, customer1.cash);

    });

  it('Customer buys record and spends cash', function(){
    var store1 = new Store("Selectadisc", "Nottingham")
    var customer1 = new Customer("Andrew", 50)
    var record1 = new Record("Sign of the times", "Prince", 10);
    store1.addRecord(record1, 20);
    customer1.buyRecord(record1, store1);
    customer1.getPaid(100);
    assert.deepEqual(140, customer1.cash);

    });


})