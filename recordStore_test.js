var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;


var imported = require('./recordStore');
var Record = imported.recordConstructor;

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

})