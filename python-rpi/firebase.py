# import libraries needed from firebaes
import pyrebase
# Configuration copied from firebase console.
config = {
  'apiKey': "AIzaSyD-8O8ys8bwF4N4-bGavw5KwziaHwELVNU",
  'authDomain': "group13-night-crawler.firebaseapp.com",
  'databaseURL': "https://group13-night-crawler-default-rtdb.firebaseio.com",
  'projectId': "group13-night-crawler",
  'storageBucket': "group13-night-crawler.appspot.com",
  'messagingSenderId': "52466109472",
  'appId': "1:52466109472:web:3f22774086f5053cd74045",
  'measurementId': "G-QN54Z2X23D"
}



# Initialize firebase with config copied from firebase console
firebase = pyrebase.initialize_app(config);


# Create reference to firauth service
auth = firebase.auth();

# Make reference to firebase realtime database
# - this will be responsible for moving the servo from application
db = firebase.database();

# Test username and password
email = 'vidsample@gmail.com'
pwd = '121212'

# Create test user given credentials
# Only run below line if user has not been created yet
# auth.create_user_with_email_and_password(email, pwd)
auth_token = auth.sign_in_with_email_and_password(email, pwd)
print(auth_token['localId'])
# A user's idToken expires after 1 hour, so be sure to use the user's refreshToken to avoid stale tokens.
token_id = auth_token['idToken']

# Realtime Database Example Usage:``
# new_user = {
#         'username': 'this is a new random username',
#         'bday': '01/01/1990',
#         'age': 32,
#         'bio': 'i am a new user',
#         'email': 'thisISrandom23432@gmail.com',
#     }
# db.child('users').child('random_username').set(new_user, token_id)

# Local File
path_local = "sample-15s.mp4"

# Implementation of FIREBASE STORAGE
path_on_cloud = 'users/' + auth_token['localId'] + '/videos/' + path_local
print(path_on_cloud)


#Upload Sample Video to firebase storage
storage = firebase.storage()
storage.child(path_on_cloud).put(path_local)
