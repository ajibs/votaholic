# Votaholic
Votaholic allows you connect with your audience by allowing users create polls and users can vote on polls.

Votaholic is a [FreeCodeCamp](https://www.freecodecamp.org/) Project.


## Feature List
* Create as many polls as you like.
* Vote on polls (user can only vote once per poll; based on user IP address).
* Displays all polls on the app.
* View details of a poll.
* View all the polls you have created.
* Authenticated user can create a custom option on a poll
* Signup, Login and Logout of the app.


## Getting Started
Votaholic is hosted on heroku and can be accessed here:
 - [Production](https://votaholic.herokuapp.com/)

To use backend API's alone, please use the following instructions. 
  - Download and install [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)
  - Make sure you have working internet
  - Use the Service API's below with Postman (See how in: Using Postman, below)

### Service APIs:
  - [Signup](https://votaholic.herokuapp.com/signup): Uses username and password
  - [Login](https://votaholic.herokuapp.com/login): Uses username and password
  - [Create Poll](https://votaholic.herokuapp.com/new-poll): Takes in the poll details, user must be logged in
  - [Vote Poll](https://votaholic.herokuapp.com/cast-vote): Uses 'value' of poll option, 'value' of custom option and '_id' of poll.


### Using Postman:
 - Install [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)
 - In the Postman window, populate the url window with the API endpoint you want to take for a test run.
 - For the Service API's listed above, click on the dropdown by the right of the url window, change from get to post
 - Click on the body tab, select the radio button: x-www-form-urlencoded
 - Populate the request body with the appropriate key value pairs: 
      - Signup : keys - username and password
      - Login: keys - username and password
      - Create Poll: keys - title and options (each option should be separated by a comma)
      - Vote Poll: keys - labelID, custom and id
- Click on Send

## Prerequisites
 These are what you need installed on your computer to use the application:

 - Web Browser (Chrome, or Mozilla, or Safari, or Opera, or Microsoft Edge )

 #### For Developerss:
 - [Git](https://git-for-windows.github.io/)
 - [Node.js](https://nodejs.org/en/download/)
 - [MonogDb](https://www.mongodb.com/download-center#community)
 - [Yarn](https://yarnpkg.com/en/docs/install)
 - ``` yarn ``` will install all dependencies
     


## Built With

- [Git](https://git-scm.com/) - Version Control
- [Node.js](https://nodejs.org/) - JS Runtime Environment
- [Yarn](https://yarnpkg.com) - Package Manager
- [Express](https://expressjs.com/en/starter/installing.html) - Web Framework
- [EJS](http://ejs.co/) - Templating Engine
- [mLab](https://mlab.com/) - Database 
- [Heroku](www.heroku,com) - Hosting and Continuous Deployment
- [VS Code](https://code.visualstudio.com/) - Code Editor
- [Chrome](https://www.google.com/chrome/browser/desktop/index.html) - Browser


## Author

* [Bolu Ajibawo](github.com/ajibs)



## Acknowledgments
* [FreeCodeCamp](https://www.freecodecamp.org/)
* [Chingu Cohorts](https://chingu-cohorts.github.io/chingu-directory/)
* Red Pandas
* Developer Community
* Family
* Friends