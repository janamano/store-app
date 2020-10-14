# this script is run once
from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result, ResultByKey

client = Cloudant.iam("a454668f-f2b1-4c32-957c-b048729bcb7d-bluemix", "slHj-MPKODbJgLIFJYa92QVHvVxxszMZEfMTE-CC83x9")
client.connect()

database_name = "store_db"
database = client.create_database(database_name)
if (database.exists()):
    print('db creation success')


# create some users
users = [
    ["Bob", "bob@gmail.com", "12345678", "pass4bob", "bob123"],
    ["Alice", "alice@gmail.com", "87654321", "pass4alice", "alice234"],
    ["Steve", "steve@gmail.com", "13579111", "stevesteve", "steve654"],
]

for user in users:
    user_document = {
        'documentType': 'User',
        'id': user[4],
        'name': user[0],
        'email': user[1],
        'creditCard': user[2],
        'password': user[3]
    }

    doc = database.create_document(user_document)
    if (doc.exists()):
        print(user)

# create some items
items = [
    ["T-Shirt", "Clothes", 29.99, 45],
    ["Pants", "Clothes", 39.99, 20],
    ["Jacket", "Clothes", 50.99, 1],
    ["Dress", "Clothes", 40.99, 3],
    ["Banana", "Food", 1.99, 3],
    ["Apple", "Food", 0.99, 33],
    ["Chicken", "Food", 10.99, 23],
    ["Salad", "Food", 2.99, 13],
    ["Bread", "Food", 3.99, 3],
    ["Pizza", "Food", 3.99, 3],
    ["Milk", "Food", 4.99, 4],
    ["Bat", "Sports", 99.99, 4],
    ["Ball", "Sports", 10.99, 7],
    ["Gloves", "Sports", 40.99, 4],
    ["Helmet", "Sports", 43.99, 4],
]

for item in items:
    item_document = {
        'documentType': 'Item',
        'name': item[0],
        'type': item[1],
        'price': item[2],
        'stock': item[3]
    }

    doc = database.create_document(item_document)
    if (doc.exists()):
        print(item)

client.disconnect()