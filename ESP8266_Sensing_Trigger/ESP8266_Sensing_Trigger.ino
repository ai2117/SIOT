

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

const char* ssid = "MOVISTAR_3526";
const char* password = "P5FHq6dUJY3NL6VuMfvF";


const int analogInPin = A0;  // ESP8266 Analog Pin ADC0 = A0
float sensorValue = 0;  // value read 
int sensorSum = 0;  // value read
int sensorAverage = 0;  // value read
float sensorAngle = 0;
float angleAverage = 0;

int i=0;
int j=0;

//urls to send get request
const char* host = "dweet.io";
const char* serverName = "http://maker.ifttt.com/trigger/arduino_trigger/with/key/cXxctz2iEFWqfVF7Vu3Ozz";


void setup() {
  Serial.begin(9600);

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());


}

void loop() {

  i= 0;
  j= 0;
  float sensorSum = 0;
  float sensorAngle = 0;
  float sensorAverage = 0;
  float angleAverage = 0;
  float sensorangle = 0;

// get sensor values every 3s, during five minutes
 
  while (i<100)
  {
    float sensorValue = analogRead(analogInPin);
    Serial.print(sensorValue);
    //map the values into angles
    float sensorangle=((sensorValue-812)*90)/151;
    Serial.print(sensorangle);
    sensorAngle= sensorAngle + sensorangle;

    delay (3000);
    i= i+1;
  }
  
// calculate average posture from the past 5 minutes
  angleAverage = sensorAngle / 100;
  Serial.print("Sensor angle is");
  Serial.print(angleAverage);  
  
  Serial.print("Connecting to ");
  Serial.println(host);

  // send a get request to dweet with the value
  
  WiFiClient client;
  // Use WiFiClient class to create TCP connections
  const int httpPort = 80;
  if (!client.connect(host, httpPort)) 
  {
    Serial.println("connection failed");
    return;
  }
  client.print(String("GET /dweet/for/tracking_posture_IoT?posture=") + String(angleAverage) + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "Connection: close\r\n\r\n");
               
  delay(3000);
 


  // send a get request to IFTTT applet to trigger MongoDB Realm
  if(WiFi.status()== WL_CONNECTED)
  {
    HTTPClient http;
    http.begin(serverName);
    int httpResponseCode = http.GET();
    http.end();
  }
  else 
  {
    Serial.println("WiFi Disconnected");
    }

  }
