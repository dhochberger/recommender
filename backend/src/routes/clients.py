from csv_datas import Datas
from flask import Blueprint, request
from utils.response_type import Response

clients_route = Blueprint('clients_route', __name__)
datas = Datas()

@clients_route.route('/clients', methods=['GET'])
def get_clients_list():
    frame = datas.get_clients_list()
    return Response(label='clients list', data=frame, code=200).get_res()

@clients_route.route('/clients/<int:client_id>', methods=['GET'])
def get_client_by_id(client_id):
    frame = datas.suggest(client_id)
    return Response(label=client_id, data=frame, code=200).get_res()
    
@clients_route.route('/clients/month', methods=['GET'])
def get_clients_per_month():
    frame = datas.total_clients_per_month()
    return Response(label=list(frame), data=list(frame.values()), code=200).get_res()

@clients_route.route('/clients/price', methods=['GET'])
def get_value_per_month():
    frame = datas.total_price_per_month()
    return Response(label=list(frame), data=list(frame.values()), code=200).get_res()

