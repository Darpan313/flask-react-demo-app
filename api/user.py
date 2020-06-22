from flask import Flask,request
import json

app = Flask(__name__, static_folder="../build", static_url_path='/')

class User:
    def __init__(self,username,email):
        self.username=username
        self.email=email
listOfUsers=[]
user1=User("user1","user1@gmail.com")
user2=User("user2","user2@gmail.com")

listOfUsers.append(user1)
listOfUsers.append(user2)


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


if __name__=="__main__":
    app.run(host="0.0.0.0",port=5000,debug=True)
