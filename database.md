//create user matching the .env file with createdb

npx dotenv sequelize-cli db:create

npx sequelize-cli model:generate --name DirectMessage --attributes userOneId:integer,userTwoId:integer,messageText:string,messageImg:string

npx sequelize-cli model:generate --name Group --attributes name:string,avatar:string,description:string

npx sequelize-cli model:generate --name Channel --attributes name:string,groupId:integer

npx sequelize-cli model:generate --name UserGroupJoin --attributes userId:integer,groupId:integer

npx sequelize-cli model:generate --name ChannelMessage --attributes channelId:integer,userId:integer,messageText:string,messageImg:string

npx sequelize-cli model:generate --name Notification --attributes userId:integer,channelMessagesId:integer,directMessagesId:integer,read:boolean

for electron in package.json
  "main": "./src/main.js",
    "start": "electron .",

  in index.html

for browser in package.json
  "main": "index.js",
  "start": "react-scripts start",

  in index.html

  <script src="./index.js"></script>