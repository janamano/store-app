# Store App 

```
git clone https://github.com/janamano/store-app.git
cd store-app
docker-compose up -d
```
go to http://localhost:8080/

to run the app locally without containers, pull from the `local` branch (not tested yet)
```
pip install flask
pip install cloudant
cd server/
Python server.py
cd ..
npm install
npm run create
npm run start
```
go to http://localhost:8080/
