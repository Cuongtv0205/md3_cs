const fs = require('fs');
const qs = require('qs');

const HomeStayService = require('C:\\Users\\HP.DESKTOP-35U4HVA\\WebstormProjects\\THI_TH_KT_MD3\\service\\homeStayService.js');
const CityService = require('C:\\Users\\HP.DESKTOP-35U4HVA\\WebstormProjects\\THI_TH_KT_MD3\\service\\cityService.js');

class HomeStayRouting {
    static async getHomeStayHtml(homestays, indexHtml) {
        let tbody = '';
        let index = 1;
        for (const homestay of homestays) {
            let city = await CityService.findByIdCity(homestay.idCity);
            tbody += `<tr style="text-align: center">
                <th scope="row">${index++}</th>
                <td>${homestay.name}</td>
                <td>${city[0].name}</td>
                <td>${homestay.bedroomNumber}</td>
                <td>${homestay.price}</td>
                <td>${homestay.toiletNumber}</td>
                <td>${homestay.descripttion}</td>
                <td><a href="/product/edit/${homestay.id}"class="btn btn-danger" >Edit</a></td>
                <td><a href="/product/delete/${homestay.id}"class="btn btn-danger">Delete</a></td>
            </tr>`
        }
        indexHtml = indexHtml.replace('{homestays}', tbody);
        return indexHtml;
    }

    static showHome(req, res) {
        fs.readFile('./views/home.html', 'utf-8', async (err, indexHtml) => {
            if (err) {
                console.log(err);
            } else {
                let homestays = await HomeStayService.getHomeStay();
                indexHtml = await HomeStayRouting.getHomeStayHtml(homestays, indexHtml);
                res.writeHead(200, 'text/html');
                res.write(indexHtml);
                res.end();
            }
        })
    }

    static showFromCreateHomeStay(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/homestay/create.html', 'utf-8', async (err, dataCreateHomeStay) => {
                if (err) {
                    console.log(err);
                } else {
                    let city = await CityService.getCity();
                    let optionHtml = ``;
                    for (let i = 0; i < city.length; i++) {
                        optionHtml += `<option value="${city[i].id}">${city[i].name}</option>`
                    }
                    dataCreateHomeStay = dataCreateHomeStay.replace('{city}', optionHtml);
                    res.writeHead(200, 'text/html');
                    res.write(dataCreateHomeStay);
                    res.end();
                }
            });
        } else if (req.method === 'POST') {
            let chunkHomestay = '';
            req.on('data', chunk => {
                chunkHomestay += chunk;
            });
            req.on('end', async (err) => {
                if (err) {
                    console.log(err);
                } else {
                    let homestay = qs.parse(chunkHomestay);

                    await HomeStayService.saveHomeStay(homestay);
                    req.writeHead(301, {'location': '/home'})
                }

            })
        }
    }

}

module.exports = HomeStayRouting;