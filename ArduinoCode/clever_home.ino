#include "DHT.h"

#define DHTPIN 53
#define DHTTYPE DHT11
#define radiatorPin 22
#define fanPin 37
#define morotPin 62
#define ledPin 63
#define lampPin 64

String hour = "";

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);

  pinMode(radiatorPin, OUTPUT);
  digitalWrite(radiatorPin, LOW);
  pinMode(fanPin, OUTPUT);
  pinMode(morotPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(lampPin, OUTPUT);
  dht.begin();
}

void loop() {
  int temp = dht.readTemperature();
  int humid = dht.readHumidity();
  delay(50); 
  Serial.print(temp);
  Serial.print(",");
  Serial.print(humid);
  Serial.println();

  if (temp < 12) {
    digitalWrite(radiatorPin, HIGH);
  }
  else if (temp > 18) {
    digitalWrite(radiatorPin, LOW);
  }
  if (humid < 45) {
    digitalWrite(fanPin, HIGH);
  } else if (humid > 65) {
    digitalWrite(fanPin, LOW);
  }

  if (Serial.available()) // Read from serial port
  {
    char key = Serial.read();
    String val = Serial.readString();
    switch (key) {
      case 'a':
        digitalWrite(morotPin, HIGH);
        break;
      case 'b':    
        digitalWrite(morotPin, LOW);
        break;
      case 'c':    
        digitalWrite(ledPin, HIGH);
        break;
      case 'd':    
        digitalWrite(ledPin, LOW);
        break;
      case 'e':    
        digitalWrite(lampPin, HIGH);
        break;
      case 'f':    
        digitalWrite(lampPin, LOW);
        break;
      case 'g':    
        digitalWrite(fanPin, HIGH);
        break;
      case 'h':    
        digitalWrite(fanPin, LOW);
        break;
      case 'i':    
        digitalWrite(radiatorPin, HIGH);
        break;
      case 'j':    
        digitalWrite(radiatorPin, LOW);
        break;
    }
  }
  delay(50);
}
