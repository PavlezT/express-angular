const MongoOplog = require('mongo-oplog');
// const config = require('../config');
const mongoose = require('mongoose');

module.exports = function () {
    const opts = {
        coll: 'patients',
        // ts: Date.now()/1000
    };
    
    const oplog = MongoOplog(mongoose.connection.db, opts)
 
    oplog.tail()

    oplog.on('error', error => {
        console.log('cursor error:', error);
    });
    
    oplog.on('insert', doc => {
        console.log('doc:', doc);
    });

    oplog.on('update', doc => {
        console.log('update doc:', doc);
    });
}