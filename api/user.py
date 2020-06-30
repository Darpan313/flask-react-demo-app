from flask import Flask,request, jsonify
import json
import pymongo

app = Flask(__name__, static_folder="../build", static_url_path='/')

client=pymongo.MongoClient("mongodb+srv://shwethasubash:webgroup19@webtutorial.uaxed.mongodb.net/<dbname>?retryWrites=true&w=majority")
db=client.web

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

# @app.route('/getMethod',methods=['GET'])
# def getMethod():
#     jsonList=[]
#     try:
#         jsonList=json.dumps([ob.__dict__ for ob in listOfUsers])
#         if not jsonList:
#             print("No users found!")

#     except:
#         print("Something went wrong while fetching users! Please try again.")
    
#     return jsonList

@app.route('/getMethod',methods=['GET'])
def getMethod():
    listOfUsers={}
    userCollection=db.User
    results=userCollection.find({},{'_id':0})
    print(results)
    listOfUsers=list(results)
    jsonList=json.dumps(listOfUsers)
    return jsonList

@app.route('/postMethod',methods=['POST'])
def postMethod():
    try:
        postData=request.json
        userCollection=db.User
        newUser = {'username': postData['username'], 'email':postData['email'] }
        userExists=userCollection.find(newUser)
        #To check if document already exists
        for i in userExists:
            print(i)
            return "User already exists!"
        #To add the document to the collection
        userCollection.insert_one(newUser)
    except:
        print("Something went wrong while processing the user create request! Please try again.")
    return "New User added!"

@app.route('/putMethod',methods=['PUT'])
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
    postData = request.json
    user = postData['username']
    userCollection=db.User
    results=userCollection.find({},{'username':user})
    print(results)
    listOfUsers=list(results)
    jsonList=json.dumps(listOfUsers)
    return jsonList

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000)

        
