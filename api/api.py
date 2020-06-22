import time
from flask import Flask, request
import json
app = Flask(__name__, static_folder="../build", static_url_path='/')

class User:
    def __init__(self,username,email):
        self.username=username
        self.email=email
    
    def setUsername(self, username):
        self.username = username

listOfUsers=[]
user1=User("user1","user1@gmail.com")
user2=User("user2","user2@gmail.com")

listOfUsers.append(user1)
listOfUsers.append(user2)

def getIndex(email):
    temp = None

    try:
        for index, i in enumerate(listOfUsers):
            if i.email == email:
                temp = index

        if temp is None:
            print("Invalid email address! Please enter a valid one.")
    except:
        print("Something went wrong while fetching index of email address! Please try again.")

    return temp

def getUserIndex(username):
    temp = None

    try:
        for index, i in enumerate(listOfUsers):
            if i.username == username:
                temp = index
                print(temp)

        if temp is None:
            print("Invalid user name! Please enter a valid one.")
    except:
        print("Something went wrong while fetching index of user name! Please try again.")

    return temp

@app.route('/')
def index():
	return app.send_static_file('index.html')

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/user/getMethod',methods=['GET'])
def getMethod():
    jsonList=[]
    try:
        jsonList=json.dumps([ob.__dict__ for ob in listOfUsers])
        if not jsonList:
            print("No users found!")

    except:
        print("Something went wrong while fetching users! Please try again.")
    
    return jsonList

@app.route('/user/postMethod',methods=['POST'])
def postMethod():
    try:
        postData=request.json
        newUser = User(postData['username'],postData['email'])
        listOfUsers.append(newUser)

        if not listOfUsers:
            print("Error creating the user! Please try again.")
    except:
        print("Something went wrong while processing the user create request! Please try again.")

    return "New User added!"

@app.route('/user/putMethod',methods=['PUT'])
def putMethod():
    try:
        putData=request.json
        index = getIndex(putData['email'])
        if index:
            listOfUsers[index].setUsername(putData['username'])
            return "Username updated!"
        else:
            return "No User found with this email!"
    except:
        print("Something went wrong while processing the user update request! Please try again.")

@app.route('/user/getUser',methods=['GET'])
def getUser():
    try:
        postData = request.json
        index = getUserIndex(postData['username'])
        print(index)
        if (index != None):
            print(listOfUsers[index])
            user=json.dumps(listOfUsers[index].__dict__)
            return user
        else:
            return "No User found with this username!"
    except:
        print("Something went wrong while processing the getUser request! Please try again.")

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000)
    

        