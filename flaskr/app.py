from flask import Flask
from flask import request
app = Flask(__name__)



@app.route("/")
def hello():
    return "Hello World!"

@app.route('/api/jobs', methods=['GET', 'POST'])
def handleJobs():
    if request.method == 'POST':
        print(request.data)
        return request.data
    else:
        return "Hello!"


def parse_request():
    data = request.data
