var pudding_data;
const Axios = require("axios");
const axios = Axios.default;

var pudding_ready = axios
    .get("https://script.google.com/macros/s/AKfycbyXHd14Hk1l3Mi-hXYpGvwXGYQsCvAlBMaHeiC-XzNwGi_9PrI0/exec?method=getOrderList")
    .then(function (response) {
        pudding_data = response.data;
    })
let obj = {

    pudding: async function (text) {
        await pudding_ready;
        console.log("pudding");
        let result = pudding_data.filter(function (data) {
            if (text == data.order) {
                return true;
            }
            else {
                return false;
            }
        })
        if (result.length === 0) {
            console.log("無資料");
            return undefined;
        }
        else {
            return result[this.getRandomInt(result.length)].reply;
        }

    },

    getRandomInt: function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
module.exports = obj;