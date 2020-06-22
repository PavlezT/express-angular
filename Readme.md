# Structure
* Client - stores Angular app for front page of Admin pannel
* Backend - stores Node.js Express app

# Setup
clone project using `git clone <path to project>`
### Client
go to Client folder by `cd Client`

* run `npm i` there 	
* then run `npm run build` (can take about ~5 minutes) 	

### Backend
go to Backend folder by `cd ../Backend`	

* run `npm i` 	
* then run `npm start` 	

# Start
To run server, go to the `cd Backend` folder and run `npm start`

> for prodution usege (with pm2)
> Run `npm run prod`

visit [this link to open Web page](http://localhost:3000)

user:
----
`login: admin`
----
`password: qwerty123`

# Swagger
Api documentation is hosted on 
http://localhost:3000/api-docs

# Start with Docker
> **Note:** to start project make sure you have **docker** and **docker-compose** installed.

## Run application

### Notes: Settings for application --> .env 

- docker-compose up -d

### To stop application:

- docker-compose down

### To view logs in realtime

- docker-compose logs -f