const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
// array of questions for user
function promptUser(){
return inquirer.prompt([

{
    type: "input",
    message: "What is the title of your project?",
    name: "title"
},
{
    type: "input",
    message: "Please describe your project.",
    name: "discription"
},
{
    type: "input",
    message: "Please input your table of contents",
    name: "table"
},
{
    type: "input",
    message: "Please decribe the process of installing your project",
    name: "installation"
},
{
    type: "input",
    message: "How would you like your project to be used?",
    name: "usage"
},

{
    type: "checkbox",
    name:"license",
    message: "What licenses would you like to include",
    choices: [
        "MIT",
        "Apache",
        "ISC",
        "GNU GPLv3"
    ]
},
{
    type: "input",
    message: "Please list contributers",
    name: "contributing"
},
{
    type: "input",
    message: "Please list the testing process.",
    name: "testing"
},
{
    type: "input",
    message: "What is your github username?",
    name: "github"
},
{
    type: "input",
    message: "What is your email address?",
    name: "email"
},

]);
}

// function to write README file
function generateMarkdown(response){
    return `
    ${response.title}

    Table of Contents

    [Discription](#discription)
    [Installation](#installation)
    [usage](#usage)
    [Contributing](#contributing)
    [test](#test)
    [Questions](#questions)

    DESCRIPTION:
    ${response.discription}
    INSTALLATION:
    ${response.installation}
    USAGE:
    ${response.usage}
    CONTRIBUTING:
    ${response.contributing}
    TEST:
    ${response.testing}
    LICENSE: 
    The license being used is ${response.license}
    


    Questions:
    Click here to view my github page
    (https://github.com/${response.github})

    If you have any questions feel free to email me at ${response.email}.`;
    
}

// function to initialize program
async function init() {
    try {
        const response = await promptUser();
        const readMe = generateMarkdown(response);
        await writeFileAsync("README.md", readMe);
        console.log("File Created");       
    } catch (err){
        console.log(err);
    }

}

// function call to initialize program
init();
