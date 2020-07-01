import time
from flask import Flask, request
import json
import pymongo

app = Flask(__name__, static_folder="../build", static_url_path='/')

client=pymongo.MongoClient("mongodb+srv://shwethasubash:webgroup19@webtutorial.uaxed.mongodb.net/<dbname>?retryWrites=true&w=majority")
db=client.web

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/user/getMethod',methods=['GET'])
def getMethod():
    userCollection=db.User
    results=userCollection.find({},{'_id':0})
    print(results)
    listOfUsers = list(results)
    return {"users" : listOfUsers}

@app.route('/user/getUser',methods=['GET'])
def getUser():
    postData = request.json
    user = postData['username']
    userCollection=db.User
    results=userCollection.find({'username': user},{'_id':0})
    if results.count():
        listOfUsers=list(results)
        return {"user" : listOfUsers[0]}; 
    else:
        return "No User found with this username!"

@app.route('/user/postMethod',methods=['POST'])
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

@app.route('/user/putMethod', methods=['PUT'])
def putMethod():
    try:
        putData=request.json
        email = putData['email']
        user = putData['username']
        userCollection=db.User
        result=userCollection.find({'email':email}).count()
        if result:
            userCollection.update_one({"email": email},{"$set":{"username": user}})
            return "Username updated!"
        else:
            return "No User found with this email!"
    except:
        print("Something went wrong while processing the user update request! Please try again.")

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000)

