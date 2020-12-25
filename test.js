const Axios = require("axios");
const axios = Axios.default;


const express = require('express')
const app = express()

var instruction_data = [];

function read_data(){
  return axios
  .get("https://bot.randosoru.me/api/Source/Ud609708ab511fc9e5ab8f735ac5c3e3d/Customer/Orders")
  .then(function(response){
  instruction_data = response.data;
  //console.log(instruction_data);
  })
}



function user_instruction_check(inst,re){
  let result = instruction_data.find(function(data){
    if (inst == data.cusOrder){
      console.log('有資料');
      return true;
    }      
    else{
      console.log('無資料');
      return false;
    }
  })
  if(result != undefined)
    return result;
}

function user_instruction_post(inst, re){
  axios({
    method: 'post',
    url: "https://bot.randosoru.me/api/Source/Ud609708ab511fc9e5ab8f735ac5c3e3d/Customer/Orders",
    data: {
      order: inst,
      touchType: '1',
      replyDatas:[{
        reply: re,
        messageType: 1
      }]
    }
  })
  .then(res => res.data)
  .then(console.log)
  .catch(console.error);
}

async function user_instruction(inst,re){
  await read_data();
  user_instruction_post(inst,re);  
}
user_instruction('456','success');

function skill_message(name){
  let result = JSON.stringify(require("./message.json"));
  let characterInfo = require("./characterInfo.json");

  for (i=0;i<characterInfo.length;i++){
    if(characterInfo[i].Name == name){
      var test = result.replace(/character/i,name);
      
      for(j=0;j<characterInfo[i].Skill.length;j++){
        test = test.replace(/name/i,characterInfo[i].Skill[j].name);
        test = test.replace(/type/i,characterInfo[i].Skill[j].type);
        test = test.replace(/effect/i,characterInfo[i].Skill[j].effect);
        test = test.replace(/description/i,characterInfo[i].Skill[j].description)  
      }
      console.log(test);
      return test;
    }
    else{
      return("找不到"+name+"角色");
    }
  }
}

/*
function find(callback) {
  for (let i = 0; i < myArray.length; i++) {
    if (callback(myArray[i]) === true) {
      return myArray[i];
    }
  }

  return undefined;
}



async function getData(index) {
  let hanshino_result = await hanshino();
  console.log(hanshino_result);
}



function pudding(text){
  return axios
    .get("https://script.google.com/macros/s/AKfycbyXHd14Hk1l3Mi-hXYpGvwXGYQsCvAlBMaHeiC-XzNwGi_9PrI0/exec?method=getOrderList")
    .then(function (response){
      let test = response.data.order;
      response.data.find(function(data){
        if (text == data.order){
          //console.log(data.reply);
          return data.reply; 
        }});
    })
}

function hanshino(){
  return axios
    .get("https://hanshino.randosoru.me/api/Pudding/Statistics")
    .then(function (response) {
      let keys = Object.keys(response.data);
      let values = Object.values(response.data);
      let len = keys.length;
      var test = "";
      //console.log("hanshino:");
      
      for(i=0;i<len;i++){
        //console.log(keys[i],"=>",values[i]);
        test += keys[i]+"=>"+values[i];
      }
      //console.log(Object.entries(response.data));
      //console.log(test);
      
      return test;
    })    
}*/

