import wiringpi
from firebase import firebase
url = 'https://group13-night-crawler-default-rtdb.firebaseio.com'
fb = firebase.FirebaseApplication('https://group13-night-crawler-default-rtdb.firebaseio.com', None)
print(fb.get('/users/command/', None))


ENA = 22
ENB = 30
PIN = 27
INPUT = 0
OUTPUT = 1
PWM_OUTPUT = 2
PUD_OFF = 0
PUD_DOWN = 1
PUD_UP = 2
HIGH = 1
LOW = 0

wiringpi.wiringPiSetup()
wiringpi.pinMode(PIN, INPUT);
wiringpi.pullUpDnControl(PIN, PUD_UP);
wiringpi.pinMode(1,OUTPUT);
wiringpi.pinMode(26,OUTPUT);
wiringpi.pinMode(21,OUTPUT);
wiringpi.pinMode(22,OUTPUT);
wiringpi.pinMode(30,OUTPUT);
wiringpi.softPwmCreate(ENA, 0, 100)
wiringpi.softPwmCreate(ENB, 0, 100)



while True:
   velx = fb.get('/users/command/velx', None)
   rotate = fb.get('/users/command/rotate', None)
   if(velx == 1):
      print("forward\n");
      wiringpi.digitalWrite(21,HIGH);
      wiringpi.digitalWrite(26,HIGH);
      wiringpi.softPwmWrite(ENA,100);
      wiringpi.softPwmWrite(ENB,100);
      wiringpi.delay(5000);

   if(velx == -1):
      print("backwards\n");
      wiringpi.digitalWrite(21,LOW);
      wiringpi.digitalWrite(26,LOW);
      wiringpi.softPwmWrite(ENA,100);
      wiringpi.softPwmWrite(ENB,100);
      wiringpi.delay(2000);

   if(rotate == "left"):
      print("left\n");
      wiringpi.digitalWrite(21,LOW);
      wiringpi.digitalWrite(26,HIGH);
      wiringpi.softPwmWrite(ENA,90);
      wiringpi.softPwmWrite(ENB,90);
      wiringpi.delay(2000);

   if(rotate == "right"):
      print("right\n");
      wiringpi.digitalWrite(21,HIGH);
      wiringpi.digitalWrite(26,LOW);
      wiringpi.softPwmWrite(ENA,100);
      wiringpi.softPwmWrite(ENB,100);
      wiringpi.delay(5000);

   else:
      print("stop\n");
      wiringpi.softPwmWrite(ENA,0);
      wiringpi.softPwmWrite(ENB,0);
      wiringpi.delay(2000);