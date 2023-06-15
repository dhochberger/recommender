from flask import Flask
from flask_cors import CORS

from routes.clients import clients_route
from routes.dashboard import dashboard_route
from routes.products import products_route

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(clients_route)
app.register_blueprint(dashboard_route)
app.register_blueprint(products_route)

@app.route('/')
def home():
  return 'Recommender Home route'

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
