# SIOT
Posture and Productivity Tracker, Sensing and IoT project

# Website
https://www.angelaibanez-design.com
Created with WIX. Charts created with MongoDB Charts, embedded as iframes.

# Video
https://drive.google.com/drive/folders/1P6o46Jn9vHqnFnC5CGuBHSdd3GXLR617?usp=sharing

# Data sources:
- Flex sensor - measuring the user's posture
- RescueTime API https://www.rescuetime.com

# Hardware:
- ESP8266 
- Flex sensor

# Software:
- MongoDB Atlas, MongoDB Realm, MongoDB Charts
- IFTTT
- dweet.io - simple messaging service which requires no setup
- Pushover API - https://pushover.net

# In this Repository:


- ESP8266_Sensing_Trigger : code running in the ESP8266:
    - Reading and mapping the sensor values
    - Sending a get request to dweet.io with the posture's average
    - Sending a get request to my IFTTT applet which can be found https://ifttt.com/applets/ShWUKpJt
     
- Reading and mapping the sensor values
    - Sending a get request to dweet.io with the posture's average
    - Sending a get request to my IFTTT applet which can be found https://ifttt.com/applets/ShWUKpJt
      
- MongoDB Realm Functions (setup: "3rd service" function, set a http webhook with the "GET" method)

    - Retrieving_and_storing.js
        - Function triggered by IFTTT applet (which is triggered by ESP8266)
        - Retrieves the data from the RescueTime API (productivity) and from dweet.io (posture) and pre-processes it
        - Stores the data in MongoDB Atlas (the database can be found in the repository as a csv file, although the data was retrieved from MongoDB atlas directly and this file was not used)
            
    - Actuation.js
         - Function triggered by another IFTTT applet every 15 minutes
         - Reads the last values stored in the db, processes it
         - Sends a get request to pushover, to send a push notification to the user with feedback
         - Creates 'gold-stars', shown in the user's dashboard
            
- Aggregation_Pipelines_charts
    - Aggregation Pipelines used in MongoDB charts to process the data and generate the website's live, interactive, charts.

- Data_analysis
    - Data analysis performed in python
           

