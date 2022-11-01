const HomeStayRouting = require('./handler/homeStayRouting');

const handler = {
    'home': HomeStayRouting.showHome,
    'homestay/create': HomeStayRouting.showFromCreateHomeStay
}


module.exports = handler;