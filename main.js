#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "Chalk";
let myBalance = 100000;
const mypin = 123456;
// Print ATM Color.
console.log(chalk.gray("\n \tATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: "Enter your pin code:",
        type: "number",
    }
]);
if (pinAnswer.pin === mypin) {
    console.log("pin is correct, login successfully!");
    console.log(`current account balance is ${myBalance}`);
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: "Select an operation:",
            type: "list",
            choices: [
                "withdraw amount",
                "check balance",
            ]
        }
    ]);
    if (operationAns.operation === "withdraw amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                message: "Select a withdrawal method:",
                type: "list",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    message: "Select Amount:",
                    type: "list",
                    choices: [1000, 2000, 5000, 10000, 20000, 50000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log("Insufficient Balance");
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash}withdraw Successfully`);
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "Enter the amount to withdraw:",
                    type: "number",
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log("Insufficient Balance");
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} withdraw succcessfully`);
                console.log(`your remaining balance is: ${myBalance}`);
            }
        }
        else if (operationAns.operation === "check balance") {
            console.log(`your current balance is: ${myBalance}`);
        }
    }
}
else {
    console.log("pin is incorrect, try again!");
}
