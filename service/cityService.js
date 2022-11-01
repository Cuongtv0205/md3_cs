const Connection = require('../model/connection');
Connection.connecting();

class CityService {
    static getCity() {
        let connection = Connection.getConnecting();
        return new Promise((resolve, reject) => {
            connection.query(`select *
                              from city`, (err, dataCity) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(dataCity);
                }
            })
        })
    }

    static findByIdCity(id) {
        let connection = Connection.getConnecting();
        return new Promise((resolve, reject) => {
            connection.query(`select *
                              from city
                              where id = ${id}`, (err, cityData) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(cityData);
                }
            })
        })
    }

}

CityService.getCity();

module.exports = CityService;