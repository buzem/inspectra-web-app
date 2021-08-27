## Inspectra Demo
### Setup
- Have E-Mail Postfach & Phone ready
- Have the E-Mail and Phone Number of all Team Members ready
- Open Inspectra
- Have the provided Login
- All Scraping URLs

### User
- Username: `seba`
- Password: `test`

### Scraping URLs
- Get
  - Covid: https://api.corona-zahlen.org/germany
  - Spaceflight News: https://api.spaceflightnewsapi.net/v3/articles
  - Cryto: http://api.bitcoincharts.com/v1/markets.json
  - Short We Share: https://bit.ly/373ni0R
  - Long We Share: http://europe-west1-weshare-api.cloudfunctions.net/getAvailableVehicles?cityId=81cb439f-3b59-11e9-9928-06cf929d95ea
- Post
  - https://postman-echo.com/post

### Local Setup
1. `mongod --dbpath "./db"`
2. `npm install`
3. `cd frontend npm install`
4. `npm run devstart`

### Steps:  
PERSON A:
1. Recap of Business Idea (1 Min)
2. [Optional] Open Inspector and Login
3. Application Overview
	- Navbar
	- Login / Logout
	- Data Collector Page, Creations Page, Notifications Page 
	- We will walk through all pages in a minute to showcase our four use cases
4. Use Case Number 1: Data Collector Set-Up
	- Create Covid Data Collection for every Minute
	- Show Form Validation
5. Use Case Number 2: Monitor data collection     
	- Watch the Data Collection for a Minute
	- Show the Data Collected for an Event
	- Go to a second Data Collector and show a broken Data Collection (Error Data Collector)

PERSON B:  
1. Use Case Number 3: Visualize the collected data
   - Create a new Graph for the Number of Covid Cases (switch to Area Chart, change Colours)
   - Add Graph to an Existing Covid Dashboard
   - Show another Dashboard  
2. Use Case Number 4: Setup notifications on data collectors
   - Create a Notification on the Number of Cases to be greater than 1000
# inspectra-web-app
# inspectra-web-app
