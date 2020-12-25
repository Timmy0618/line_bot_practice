let obj = {
    select_img: function (name) {
        let characterInfo = require("./characterInfo.json");
        let img = {};
        console.log("start");
        for (i = 0; i < characterInfo.length; i++) {
            if (characterInfo[i].Name == name) {
                img = {
                    type: 'image',
                    originalContentUrl: characterInfo[i].Image,
                    previewImageUrl: characterInfo[i].HeadImage
                };
                return img;
            }
        }
    },

    select_skill: function (name) {
        let characterInfo = require("./characterInfo.json");
        let test = "";
        console.log("start");
        for (i = 0; i < characterInfo.length; i++) {
            if (characterInfo[i].Name == name) {
                for (j = 0; j < characterInfo[i].Skill.length; j++) {
                    test += characterInfo[i].Skill[j].name + "\n";
                    test += characterInfo[i].Skill[j].description + "\n";
                }
                console.log(test);
                return test;
            }
            else {
                return ("找不到" + name + "角色");
            }
        }
    },
    select_character: function (name) {
        let characterInfo = require("./characterInfo.json");
        let result = '';
        console.log("start");
        for (i = 0; i < characterInfo.length; i++) {
            if (characterInfo[i].Name == name) {
                //console.log(characterInfo[i].Info);
                for (j = 0; j < characterInfo[i].Info.length; j++) {
                    console.log(characterInfo[i].Info);
                    result += JSON.stringify(characterInfo[i].Info[j]) + "\n";
                }
                console.log(result);
                return result;
            }
            else
                return "角色不存在";
        }
    },
    skill_message: function (name) {
        let result = JSON.stringify(require("./message.json"));
        let characterInfo = require("./characterInfo.json");

        for (i = 0; i < characterInfo.length; i++) {
            if (characterInfo[i].Name == name) {
                var test = result.replace(/{character}/i, name);
                let j = 0;
                //for(j=0;j<characterInfo[i].Skill.length;j++)
                test = test.replace(/{name}/i, characterInfo[i].Skill[j].name);
                test = test.replace(/{type}/i, characterInfo[i].Skill[j].type);
                test = test.replace(/{image}/i, characterInfo[i].Skill[j].image);
                test = test.replace(/{effect}/i, characterInfo[i].Skill[j].effect);
                test = test.replace(/{description}/i, characterInfo[i].Skill[j].description)
                //}
                console.log(test);
                let final = {
                    type: "flex",
                    altText: "選單訊息",
                    contents: JSON.parse(test),
                }
                return final;
            }
            else {
                return ("找不到" + name + "角色");
            }
        }
    }
}

module.exports = obj;