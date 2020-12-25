const User = {};
const Axios = require("axios");
const axios = Axios.default;
let obj = {
    user_instruction_post: function (inst, re, SourceId) {
        let result = {};
        axios({
            method: 'post',
            url: "https://bot.randosoru.me/api/Source/" + SourceId + "/Customer/Orders",
            data: {
                order: inst,
                touchType: '1',
                replyDatas: [{
                    reply: re,
                    messageType: 1
                }]
            }
        })
            .then(function (res) {
                result = res.data;
                return result;
            })
            .then(console.log)
            .catch(console.error);
        if (result != undefined) {
            delete User[SourceId];
            return '指令新增成功';
        }
        else {
            return '指令新增失敗';
        }
    },


    user_instruction: async function (inst, SourceId) {

        if (User[SourceId] === undefined) {
            console.log('新增使用者');
            User[SourceId] = await this.instruction_ready(SourceId);
            return this.user_instruction_check(inst, User[SourceId]);
            //console.log(User.SourceId);
        }
        else {
            console.log("來過");
            if (this.user_instruction_check(inst, User[SourceId]) === undefined) {
                console.log("無資料");
                return undefined;
            }
            else {
                console.log("有資料");
                return this.user_instruction_check(inst, User[SourceId]);
            }
        }
    },
    instruction_ready: function (SourceId) {
        console.log("讀api");
        return axios
            //let SourceId = Ud609708ab511fc9e5ab8f735ac5c3e3d
            .get("https://bot.randosoru.me/api/Source/" + SourceId + "/Customer/Orders")
            .then(function (response) {
                return response.data;
                //console.log(instruction_data);
            })
    },
    user_instruction_check: function (inst, instruction_data) {
        let result = instruction_data.find(function (data) {
            //console.log('inst:'+inst);
            if (inst == data.cusOrder) {
                //console.log('有資料');
                return true;
            }
            else {
                //console.log('無資料');
                return false;
            }
        })
        if (result != undefined) {
            console.log(result.reply);
            return result.reply;
        }
        else {
            return undefined;
        }
    }
}

module.exports = obj;
