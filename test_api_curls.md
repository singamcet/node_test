#List all service operators : 

curl --request GET \
  --url http://localhost:6868/api/bookings/listOperators \
  --header 'Content-Type: application/json' \
  --data '{
	"title" : "test",
"description":"Test",
	"published" : false
}'

#Create booking : 

curl --request POST \
  --url http://localhost:6868/api/bookings/ \
  --header 'Content-Type: application/json' \
  --data '{
	"day": 1,
	"startTime": 0,
	"endTime": 1,
	"serviceOperatorId": 3
}'

#Reschedule booking :
#param : booking ID

curl --request PUT \
  --url http://localhost:6868/api/bookings/1 \
  --header 'Content-Type: application/json' \
  --data '{
	"day": 1,
	"startTime": 5,
	"endTime": 6,
	"isReschedule" : true
}'

#Cancel booking :
#param : booking ID

curl --request PUT \
  --url http://localhost:6868/api/bookings/26 \
  --header 'Content-Type: application/json' \
  --data '{
	"isActive" : false
}'

#Get bookings of an operator :
#param : operator ID

curl --request GET \
  --url http://localhost:6868/api/bookings/3 \
  --header 'Content-Type: application/json'

#Get available slots of an operator :
#param : operator ID

curl --request GET \
  --url http://localhost:6868/api/bookings/listAvailableBookings/3 \
  --header 'Content-Type: application/json'

