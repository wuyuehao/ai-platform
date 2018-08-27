import os

from flask import Flask
from flask import request
from . import db
import docker
import json
from concurrent.futures import ThreadPoolExecutor
from flask import Blueprint, send_from_directory

executor = ThreadPoolExecutor(max_workers=3)


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True, static_folder='../build')
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
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

    def task():
        c = docker.from_env()
        c.containers.run('wuyuehao/ai:1.2','/workspace/ai-platform/runmodel.sh', network_mode='host')

    def task(layer):
        c = docker.from_env()
        c.containers.run('wuyuehao/ai:1.2','/workspace/ai-platform/runmodel.sh '+str(layer), network_mode='host')

    def dummytask(layer):
        print ("submit for layer = " +str(layer))

    @app.route('/api/jobs', methods=['GET', 'POST'])
    def handleJobs():
        if request.method == 'POST':
            data = json.loads(request.data)
            layerList = []
            for i in range (data['minNumLayers'], data['maxNumLayers'], data['numOfLayersStep']):
                layerList.append(i)
            print(layerList)

            for i in layerList:
                executor.submit(dummytask(i))
                executor.submit(task(i))


            return str(len(layerList)) + " submitted"

        elif request.method == 'GET':
            executor.submit(task)
            executor.submit(task)
            return "submitted"
        else:
            return "hello"


    db.init_app(app)


    return app
