const mysql = require('mysql');

class Connection {
    static configToMySql = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'homestay_database',
        charset: 'utf8_general_ci'
    }

    static getConnecting() {
        return mysql.createConnection(this.configToMySql);
    }

    static connecting() {
        Connection.getConnecting().connect((error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('---Connection Success---');
            }
        });
    }
}
Connection.connecting();
module.exports = Connection;