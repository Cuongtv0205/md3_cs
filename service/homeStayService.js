const Connection = require('../model/connection');
Connection.connecting();


class HomeStayService {
    static getHomeStay() {
        let connection = Connection.getConnecting();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM homestay', (err, homeStayHtml) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(homeStayHtml);
                }
            })
        })

    }

    static saveHomeStay(homestay) {

        let connection = Connection.getConnecting();
        return new Promise((resolve, reject) => {
            connection.query(`insert into homestay (name, idCity, bedroomNumber, price, toiletNumber, descripttion)
                              VALUES ('${homestay.name}', ${homestay.idCity}, ${homestay.bedroomNumber},
                                      ${homestay.price}, ${homestay.toiletNumber}, '${homestay.descripttion}
                                      ')`, (err, dataHomeStay) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(dataHomeStay);
                }
            })
        })
    }

    static findByIdHomeStay(id) {
        let connection = Connection.getConnecting();
        return new Promise((resolve, reject) => {
            connection.query(`select *
                              from homestay
                              where id = ${id}`, (err, homestays) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(homestays);
                }
            })
        })
    }

}


module.exports = HomeStayService;

HomeStayService.getHomeStay();
