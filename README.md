## Inspectra
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
