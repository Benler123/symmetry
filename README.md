# symmetry
Strategic alignment for DevOps

## How to Run Locally
Symmetry comes in three parts all available in this repository. The screenshot daemon and back-end server must both be running to store inferences in the database wheras the front-end queries this database and can be ran standalone. 

### To Run Back-End
These steps must be completed in order. Additionally, you must be authenticated with the GCP SQL server. For IAM credentials, reach out to Tyler. First start the backend server.
```
uvicorn app:app --host 127.0.0.1 --port 8001
```
Once this is running, start the screenshot daemon. The userid is here is arbitrary and is used to associate inferences to a user.
```
python client.py --server_url http://127.0.0.1:8001/upload --userid Tyler
```
