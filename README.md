# Docker Compose Nodejs and MySQL example

## Run the System
Run the whole with only a single command:
```bash
docker-compose up
```

Docker will pull the MySQL and Node.js images .

The services can be run on the background with command:
```bash
docker-compose up -d
```

## Stop the System
Stopping all the running containers is also simple with a single command:
```bash
docker-compose down
```

If you need to stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use the command:
```bash
docker-compose down --rmi all
```

## Run the System with out Docker
Add proper environment veriables in app-convertz-test/.env (Databese configurayion and port details)file.

Goto app-convertz-test folder and run following commands

Install dependencies
```bash
npm install
```
Run project
```bash
npm run dev or npm start
```

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=test_db
DB_PORT=3306
NODE_DOCKER_PORT=6868
```
## API testing
Api collection(insomnia json) is added in the root folder of this project.
If you are not having insomnia you can use api curls and import it to some other api clients.

## List all service operators : 

```
curl --request GET \
  --url http://localhost:6868/api/bookings/listOperators \
  --header 'Content-Type: application/json' \
  --data '{
	"title" : "test",
"description":"Test",
	"published" : false
}'
```

## Create booking : 

```
curl --request POST \
  --url http://localhost:6868/api/bookings/ \
  --header 'Content-Type: application/json' \
  --data '{
	"day": 1,
	"startTime": 0,
	"endTime": 1,
	"serviceOperatorId": 3
}'
```

## Reschedule booking :
### param : booking ID

```
curl --request PUT \
  --url http://localhost:6868/api/bookings/1 \
  --header 'Content-Type: application/json' \
  --data '{
	"day": 1,
	"startTime": 5,
	"endTime": 6,
	"isReschedule" : true
}'
```
## Cancel booking :
### param : booking ID

```
curl --request PUT \
  --url http://localhost:6868/api/bookings/26 \
  --header 'Content-Type: application/json' \
  --data '{
	"isActive" : false
}'
```
## Get bookings of an operator :
### param : operator ID

```
curl --request GET \
  --url http://localhost:6868/api/bookings/3 \
  --header 'Content-Type: application/json'
```

## Get available slots of an operator :
### param : operator ID

```
curl --request GET \
  --url http://localhost:6868/api/bookings/listAvailableBookings/3 \
  --header 'Content-Type: application/json'
```



