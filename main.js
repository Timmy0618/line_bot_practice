const Axios = require("axios");
const axios = Axios.default;

var linebot = require('linebot');

var charac = require('./character.js');
var user = require('./user_instruction.js');
var pudding = require('./pudding_bot.js');
const { testing } = require("./funcTest.js");

var bot = linebot({
  channelId: '1583242058',
  channelSecret: '1332d9bb7917800cd26abc5bcf190874',
  channelAccessToken: 'JwYtcOuQ5H1zZLmrOuoR+uOj+nzSJZC0yknywu4ns0D3jN+4JhdEuM8/JGyRs+Ss/Fwl370VDuWPbh/IJcpjwEmPVQcBfUdazFi8VVKV5i2XWiCiX88PfhV/l5XtXkzQKIRkCLYKOwCf6ZLiefisawdB04t89/1O/w1cDnyilFU='
});


bot
  .on('message', async function (event) {
    console.log(event.message.text);
    let SourceId = event.source.userId;
    console.log(SourceId);
    let reply = await check(event.message.text, SourceId);
    event
      .reply(reply)
      .then(function (data) {
        // success
      })
      .catch(function (error) {
        // error
      });
  });

bot.listen('/', 5000);


async function check(text, SourceId) {
  let tag = ' ';
  let name = ' ';
  let re = ' ';
  let result;
  if (text.indexOf('#') != -1) {
    console.log('# 判斷');
    tag = text.split(" ")[0];
    name = text.split(" ")[1];
    re = text.split(" ")[2];
  }

  console.log('tag: ' + tag + 'name: ' + name + 're: ' + re);

  switch (tag) {
    case "#功能測試":
      return testing();
    case "#圖片":
      return charac.select_img(name);
    case "#技能":
      return charac.select_skill(name);
    case "#角色":
      return charac.select_character(name);
    case "#角色技能":
      return charac.skill_message(name);
    case "#新增指令":
      return user.user_instruction_post(name, re, SourceId);
    default:
      console.log('default');
      result = await user.user_instruction(text, SourceId);
      if(result != undefined)
        return result;
      else if(result == undefined){
        console.log("布丁");
        return pudding.pudding(text);
      }        
  }
}





/*
function select_img(name){
  let characterInfo = require("./characterInfo.json");
  let img  = {};
  console.log("start");
  for (i=0;i<characterInfo.length;i++){
      if(characterInfo[i].Name == name){
        img = {
          type: 'image',
          originalContentUrl: characterInfo[i].Image,
          previewImageUrl: characterInfo[i].HeadImage
        };
        return img;
      }
  }
}*/
/*
function select_skill(name){
  let characterInfo = require("./characterInfo.json");
  let test = "";
  console.log("start");
  for (i=0;i<characterInfo.length;i++){
      if(characterInfo[i].Name == name){
        for(j=0;j<characterInfo[i].Skill.length;j++){
          test += characterInfo[i].Skill[j].name+"\n";
          test += characterInfo[i].Skill[j].description+"\n";
        }
        console.log(test);
        return test;
      }
      else{
        return("找不到"+name+"角色");
      }
  }
}
*/