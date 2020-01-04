
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

import json


# Firestore Official API Reference: https://googleapis.dev/python/firestore/latest/
class FirestoreClient:
    def __init__(self):
        cred = credentials.Certificate("serviceAccountKey.json") 
        firebase_admin.initialize_app(cred)
        self.db = firestore.client()

    def show_users(self):
        docs = self.db.collection('users').get()
        for doc in docs:
            print(doc.to_dict())
        return
    
    def show_units(self):
        docs = self.db.collection('units').get()
        for doc in docs:
            print(doc.to_dict())
        return
    
    def create_units_seed(self,units_seed):
        units_ref = self.db.collection('units')
        for unit_seed in units_seed:
            units_ref.add(unit_seed)
        return
    
    def create_users_seed(self,users_seed):
        users_ref = self.db.collection('users')
        for user_seed in users_seed:
            users_ref.add(user_seed)
        return
    
    def update_favorite_count(self):
        pass

    def delete_units_seed(self):
        docs = self.db.collection('units').get()
        for doc in docs:
            doc.reference.delete()
        return
    
    def delete_users_seed(self):
        docs = self.db.collection('users').get()
        for doc in docs:
            doc.reference.delete()
        return

if __name__ == "__main__":

    with open("units_seed.json","r") as f:
        units_seed=json.load(f)
    # with open("users_seed.json","r") as f:
    #     users_seed=json.load(f)

    fc = FirestoreClient()
    fc.delete_units_seed()
    # fc.delete_users_seed()

    fc.create_units_seed(units_seed)
    # fc.create_users_seed(users_seed)
    
