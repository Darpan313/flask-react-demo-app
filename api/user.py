from flask import Flask,request
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
    for index, i in enumerate(listOfUsers):
        if i.email == email:
            temp = index
    return temp

@app.route('/getMethod',methods=['GET'])
def getMethod():
    jsonList=json.dumps([ob.__dict__ for ob in listOfUsers])
    return jsonList

@app.route('/postMethod',methods=['POST'])
def postMethod():
    postData=request.json
    newUser = User(postData['username'],postData['email'])
    listOfUsers.append(newUser)
    return "New User added!"

@app.route('/putMethod',methods=['PUT'])
def putMethod():
    putData=request.json
    index = getIndex(putData['email'])
    if index:
        listOfUsers[index].setUsername(putData['username'])
        return "Username updated!"
    else:
        return "No User found with this email!"

if __name__=="__main__":
    app.run(host="0.0.0.0",port=5000,debug=True)
