from csv_datas import Datas
from flask import Blueprint, request
from utils.response_type import Response

products_route = Blueprint('products_route', __name__)

datas = Datas()

@products_route.route('/products', methods=['GET'])
def get_total_products():
    frame = datas.total_products_sold()
    return Response(label="max products", data=frame, code=200).get_res()

@products_route.route('/products/month', methods=['GET'])
def get_products_per_month():
    frame = datas.total_products_per_month()
    return Response(label=list(frame), data=list(frame.values()), code=200).get_res()

@products_route.route('/products/price', methods=['GET'])
def get_value_per_month():
    frame = datas.product_family_sold_by_month()
    return Response(label=list(frame), data=list(frame.values()), code=200).get_res()

@products_route.route('/products/<string:product_label>/price', methods=['GET'])
def get_all_product_price(product_label):
    frame = datas.get_all_product_price(product_label)
    return Response(label=list(frame), data=list(frame.values()), code=200).get_res()

@products_route.route('/products/most_sold/family/<string:family_name>', methods=['GET'])
def get_most_sold_item_by_family(family_name):
    frame = datas.get_most_sold_item_by_FAMILLE(family_name)
    return Response(label=list(frame), data=list(frame.values()), code=200).get_res()

@products_route.route('/products/most_sold/mesh/<string:mesh_name>', methods=['GET'])
def get_most_sold_item_by_mesh(mesh_name):
    frame = datas.get_most_sold_item_by_MAILLE(mesh_name)
    return Response(label=list(frame), data=list(frame.values()), code=200).get_res()

@products_route.route('/products/most_sold/universe/<string:universe_name>', methods=['GET'])
def get_most_sold_item_by_universe(universe_name):
    frame = datas.get_most_sold_item_by_UNIVERS(universe_name)
    return Response(label=list(frame), data=list(frame.values()), code=200).get_res()