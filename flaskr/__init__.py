import os

from flask import Flask
from flask import request
from . import db
import docker
from concurrent.futures import ThreadPoolExecutor

executor = ThreadPoolExecutor(max_workers=3)


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
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

    def task():
        c = docker.from_env()
        c.containers.run('wuyuehao/ai:1.2','/workspace/ai-platform/runmodel.sh', network_mode='host')

    @app.route('/api/jobs', methods=['GET', 'POST'])
    def handleJobs():
        if request.method == 'POST':
            executor.submit(task)
            result = executor.submit(task)
            print(result)
            return result
        elif request.method == 'GET':
            executor.submit(task)
            result = executor.submit(task)
            print(result)
            return result
        else:
            return "hello"


    db.init_app(app)


    return app
