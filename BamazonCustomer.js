//Dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

//Create Connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "", 
    database: "Bamazon"
});

// connection.connect(function(err){
// 	if(err) throw err;
// 	console.log("connected as id " + connection.threadId);
// })

// connection.query('Select * From Products', function(error, response){
// 	if(error) throw error;
// 	console.log(response);
// })


//function display items
function displayItems(){
	connection.query('Select * From Products', function(error, response){
		if(error){
			console.log(error)
		};
		var displayTable = new Table({
			//column headers are the item names
			head: ['ItemID', 'ProductName', 'DepartmentName', 'Price', 'StockQuantity'],
  			colWidths: [10, 20, 20, 10, 20]
		});
		// table is an Array, so you can push
		for(var i = 0; i < response.length; i++){
			displayTable.push([response[i].ItemID, response[i].ProductName, response[i].DepartmentName, 
			response[i].Price, response[i].StockQuantity]); 
		}
		//console log to node screen
		console.log(displayTable.toString());
		userQuestions();	
	});
};

function userQuestions(){
	//ID of the product they would like to buy
	inquirer.prompt([
	{
    	name: "ID",
    	type: "input",
    	message: "What item number you would like to purchase?"
    },
    {
    	name: "Quantity",
    	type: "input",
    	message: "What is the quantity you would like to purchase?"
    },

	]).then(function(answers) {
  		var purchaseID = answers.ID;
  		var purchaseQty = answers.Quantity;
  		itemsPurchased(purchaseID, purchaseQty);
	});
}

function itemsPurchased(purchasedID, purchasedQuantity){
	connection.query('SELECT * FROM Products WHERE ItemID = ' + purchasedID, function(error, response){
		if(error){
			console.log(error)
		};
		if (purchasedQuantity <= response[0].StockQuantity){
			var yourCost = response[0].Price * purchasedQuantity;
			//update user
			console.log("Your total cost is: " + yourCost + " dollars.");
			console.log("Thanks for your purchase.");
			//update inventory
			connection.query('UPDATE Products SET StockQuantity = StockQuantity - ' + purchasedQuantity + ' WHERE ItemID = ' + purchasedID);
		}
		else{
			console.log("This product is out of stock.");
		};
	});
};

displayItems();












