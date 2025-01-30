from flask import Flask,render_template
from flask_cors import CORS
import json
import requests

app = Flask(__name__)
CORS(app)

def make_prompt(url,prompt,filename,model="llama2"):
    data = {'prompt':prompt,
            'model':model}
    
    data = json.dumps(data)
    response = requests.post(url,data)
    #print(res.text)
    #print(response.text)
    
    #need to check status code !!!
    with open(filename,"w") as f:
        f.write(response.text)
    

def read_msg(filename):
    with open(filename,"r") as f:
        res = f.readlines()

    msg = ""
    for l in res:
        #print(l)
        tmp_dic = json.loads(l)
        print(tmp_dic)
        if tmp_dic["done"] == False:
            #print(tmp_dic["done"])
            #print(tmp_dic)
            msg += tmp_dic["response"]
    
    return msg

@app.route("/")
@app.route("/index/")
def index():
    data = {
        "name":"app",
        "value":10455
    }
    return render_template("index.html",data=data)


@app.route("/data/")
def get_data():
    return {"mydata":"here some  data"}


url = "http://localhost:11434/api/generate"
filename = "response.txt"


@app.route("/prompt/<prompt>")
def get_answer(prompt,url=url,filename=filename):
    print(prompt)
    make_prompt(url,prompt,filename)
    result = read_msg(filename)
    return {"prompt":prompt,"answer":result}

if __name__ == "__main__":
    app.run(host="127.0.0.1",port=5000)