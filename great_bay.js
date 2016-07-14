//CONNECT TO DB
var mysql = require('mysql');
var connection = mysql.createConnection({
 host: "localhost",
 port: 3306,
 user: "root",
 password: "1234",
 database: "greatBay"
})

connection.connect(function(err) {
 if(err) throw err;
 console.log("connected as id " + connection.threadId);
})

//require inquirer
var inquirer = require('inquirer');
//prompt for post or bid
inquirer.prompt([

 {
   type: "input",
   name: "userInput",
   message: "Would you like to post an item or bid on an item?"
 }


]).then(function(answers){

 // console.log(location.userInput);
 // If the user guesses the password...
 if (answers.userInput == "post"){

   inquirer.prompt([

     {
     type: "input",
     name: "itemName",
     message: "What is the name of your item?",
   },
     {
     type: "list",
     name: "itemCondition",
     message: "What condition is your item in?",
     choices: ["Bad", "Fair", "Good", "Excellent"]
   },
   {
     type: "input",
     name: "itemColor",
     message: "What color is your item?",
   },
   {
     type: "input",
     name: "itemPrice",
     message: "How much is your item?",
   }

   ]).then(function(answers){
     console.log(answers.itemName);
     console.log(answers.itemCondition);
     console.log(answers.itemColor);
     console.log(answers.itemPrice);
   })
 }
 // If the user doesn't guess the password...
 else if (answers.userInput == "bid"){

   // console.log("==============================================");
   // console.log("");
   // console.log("Sorry " + user.name);
   // console.log("I'm calling the cops!");
   // console.log("");
   // console.log("==============================================");

 }
})