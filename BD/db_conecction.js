const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        const url = 'mongodb://agderandre:agderandre@cluster0-shard-00-00.wxz7m.mongodb.net:27017,cluster0-shard-00-01.wxz7m.mongodb.net:27017,cluster0-shard-00-02.wxz7m.mongodb.net:27017/BD_inventarios?ssl=true&replicaSet=atlas-q5t7d1-shard-0&authSource=admin&retryWrites=true&w=majority';

        await mongoose.connect(url);

        console.log('Conexion mela sog');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getConnection,
}