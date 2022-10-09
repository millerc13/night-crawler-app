from tkinter import *
import pyrebase
import requests


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

#defining login function
def login():
    #getting form data
    uname=username.get()
    pwd=password.get()
    # Only run below line if user has not been created yet

    # auth.create_user_with_email_and_password(email, pwd)
    # auth_token = auth.sign_in_with_email_and_password(uname, pwd)

    try:
        auth_token = auth.sign_in_with_email_and_password(uname, pwd)
        message.set('Success')
        auth_message.set('auth_token: ' + auth_token['localId'])
        login_message.set('Logout')
        path_local = "user-vidsample.mp4"

        # Implementation of FIREBASE STORAGE
        path_on_cloud = 'users/' + auth_token['localId'] + '/videos/' + path_local
        print(path_on_cloud)


        #Upload Sample Video to firebase storage
        storage = firebase.storage()
        storage.child(path_on_cloud).put(path_local)


        # token_message.set('token_id: ' + auth_token['idToken'])
        # print(auth_token['localId'])
        # token_id = auth_token['idToken']

    except requests.exceptions.HTTPError as error:
        message.set('Invalid')
        print(error)
        error_message = error["error"]["message"]
        print(error_message)



    # message.set('Success\n' + 'user id:' + auth_token['localId'] + 'token_id' + auth_token['idToken'])








def Loginform():
    global login_screen
    login_screen = Tk()
    w = 800 # width for the Tk root
    h = 650 # height for the Tk root

    # get screen width and height
    ws = login_screen.winfo_screenwidth() # width of the screen
    hs = login_screen.winfo_screenheight() # height of the screen

    # calculate x and y coordinates for the Tk root window
    x = (ws)
    y = (hs/2) - (h/2)

    # set the dimensions of the screen
    # and where it is placed
    login_screen.geometry('%dx%d+%d+%d' % (w, h, x, y))
    #Setting title of screen
    login_screen.title("Login Form")
    #setting height and width of screen
    login_screen.geometry("340x200")
    #declaring variable
    global  message;
    global  auth_message;
    global  login_message;

    global username
    global password
    username = StringVar()
    password = StringVar()
    message=StringVar()
    auth_message=StringVar()
    login_message=StringVar(value='Login')

    #Creating layout of login form
    Label(login_screen,width="300", text="Please enter Night Bot Login Information", bg="orange",fg="white").pack()
    #Username Label
    Label(login_screen, text="Username").place(x=20,y=40)
    #Username textbox
    Entry(login_screen, textvariable=username).place(x=90,y=40)
    #Password Label
    Label(login_screen, text="Password").place(x=20,y=80)
    #Password textbox
    Entry(login_screen, textvariable=password ,show="*").place(x=90,y=80)
    #Label for displaying login status[success/failed]
    Label(login_screen, text="",textvariable=message).place(x=140,y=110)
    Label(login_screen, text="",textvariable=auth_message).place(x=10,y=140)

    #Login button
    Button(login_screen, text="Login",textvariable=login_message, width=10, height=1, bg="orange",command=login).place(x=130,y=170)
    login_screen.mainloop()
#calling function Loginform
Loginform()