import os


from . import db
import docker
import json
from concurrent.futures import ThreadPoolExecutor
from flask import Blueprint, send_from_directory


from flask import Flask, request, redirect, url_for
from werkzeug.utils import secure_filename
from . import ModelUtils as mu

UPLOAD_FOLDER = 'upload/models/'
ALLOWED_EXTENSIONS = set(['zip','txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


executor = ThreadPoolExecutor(max_workers=10)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True, static_folder='../build')
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
        UPLOAD_FOLDER=UPLOAD_FOLDER
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/api/upload', methods=['GET', 'POST'])
    def upload_file():
        if request.method == 'POST':
            # check if the post request has the file part
            for filename, file in request.files.items():
                print(filename)
                if filename == '':
                    print('No selected file')
                    return "empty file name"
                if file and allowed_file(filename):
                    filename = secure_filename(filename)
                    filePath = os.path.join(app.config['UPLOAD_FOLDER'], filename);
                    file.save(filePath)
                    print("saving...")
                    print(filename)
                    return json.dumps(mu.process_file(filePath), ensure_ascii=False)
                else:
                    print("illegal filename")
                    return filename

        return "Not Post?"

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "":
            return send_from_directory('../build', path)
        else:
            return send_from_directory('../build', 'index.html')

    def task(input):

        layer = input[0]
        gpu = input[1]
        c = docker.from_env()
        c.containers.run('wuyuehao/ai:1.2','/workspace/ai-platform/runmodel.sh '+str(layer), environment=["CUDA_VISIBLE_DEVICES="+gpu], network_mode='host')

    import time
    def dummytask(layer):
        time.sleep(1)
        print ("submit for layer = " +str(layer))


    @app.route('/api/jobs', methods=['GET', 'POST'])
    def handleJobs():
        if request.method == 'POST':
            gpu = 0
            data = json.loads(request.data.decode("utf-8"))
            layerList = []
            for i in range (data['minNumLayers'], data['maxNumLayers'], data['numOfLayersStep']):
                layerList.append([i,gpu])
                if gpu== 0:
                    gpu = 1
                else:
                    gpu = 0
            print(layerList)

            executor.map(task, layerList)

            return str(len(layerList)) + " submitted"

        elif request.method == 'GET':
            list = [3,4,5,6,7,8,9,10]
            for i in list:
                executor.submit(dummytask(i))
                #executor.submit(task(i))

            return "submitted"
        else:
            return "hello"


    db.init_app(app)


    return app
