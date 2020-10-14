from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result, ResultByKey
from cloudant.query import Query
from flask import *

import atexit

# DB setup
client = Cloudant.iam("a454668f-f2b1-4c32-957c-b048729bcb7d-bluemix", "slHj-MPKODbJgLIFJYa92QVHvVxxszMZEfMTE-CC83x9")
client.connect()
database = client['store_db']


app = Flask(__name__)
app.secret_key = 'secret-key'

@app.route('/api/test', methods=['GET'])
def index():
    print('request:')
    print(request)
    return jsonify({'name' : 'hello_world'})


@app.route('/api/getUser')
def getUser():
    return jsonify({'user' : session['username']})

@app.route('/api/getUserInfo')
def getUserInfo():
    query = Query(database, selector={'id': {'$eq': session['username'] }})
    result = query(limit=10)['docs'][0]
    ret = jsonify({'name' : result['name'], 'id': result['id'], 'email': result['email']})
    return ret



@app.route('/api/getItems', methods=["GET"])
def items():
    items = []
    for doc in database:
        if (doc['documentType'] == "Item"):
            items.append(doc)
    
    return jsonify({'items' : items})

@app.route('/api/signup', methods=['POST'])
def sign_up():
    user = request.get_json()
    #check unique
    user_doc = {
        'documentType': 'User',
        'name': user['name'],
        'id': user['id'],
        'email': user['email'],
        'creditCard': '1212121212',
        'password': user['password']
    }

    database.create_document(user_doc)
    session['username'] = user['id']
    return jsonify({'success': 'success'}) 

@app.route('/api/login', methods=["POST"])
def login():
    valid = False
    credentials = request.get_json()
    query = Query(database, selector={'id': {'$eq': credentials['username'] }})
    result = query(limit=10)['docs'][0]
    print(result)
    if (result):
        if (result['password'] == credentials['password']):
            valid = True
            session['username'] = credentials['username']
    
    return jsonify({'success': 'success'})

@app.route('/api/logout', methods=["GET"])
def logout():
    session.pop('username')
    return jsonify({'success': 'success'})

@app.route('/api/getTransactions', methods=["GET"])
def getTransactions():
    query = Query(database, selector={'documentType': {'$eq': 'Transaction'}})
    results = query(limit=100)['docs']
    transactions = []
    for result in results:
        if (result['user'] == session['username']):
            transactions.append(result)
    
    return jsonify({'transactions': transactions})


@app.route('/api/transaction', methods=["POST", "PUT"])
def transaction():
    transaction = request.get_json()

    if (request.method == "POST"):
        print(transaction)
        trans_doc = {
            'documentType': 'Transaction',
            'user': transaction['username'],
            'item': transaction['item'],
            'price': transaction['price'],
            'date': transaction['date']
        }
        database.create_document(trans_doc)
        # return jsonify({'success': 'success'})

    query = Query(database, selector={'name': {'$eq': transaction['item'] }})
    result = query(limit=10)['docs'][0]
    print(result)
    print('heyyyyyyyy')
    document = database[result['_id']]
    if (result):
        document['stock'] -= 1
        document.save()
        return jsonify({'success': 'success'})


if (__name__ == "__main__"):
    app.run(debug=True)

@atexit.register
def shutdown():
    if (client):
        client.disconnect()