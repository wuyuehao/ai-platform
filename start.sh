rm -rf build
npm run build
export FLASK_APP=flaskr
python3 -m flask run -h 0.0.0.0 -p 3000
