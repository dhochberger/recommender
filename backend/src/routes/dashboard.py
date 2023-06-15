from csv_datas import Datas
from flask import Blueprint, request
from utils.response_type import Response

dashboard_route = Blueprint('dashboard_route', __name__)

datas = Datas()

@dashboard_route.route('/dashboard', methods=['GET'])
def get_dashboard():
    total_clients = datas.total_unique_clients()
    total_clients_per_month = datas.total_clients_per_month()
    total_price_per_month = datas.total_price_per_month()

    total_products = datas.total_products_sold()
    total_products_per_month = datas.total_products_per_month()
    product_family_sold_by_month = datas.product_family_sold_by_month()
    return Response(
        label=list(
            total_clients_per_month), 
            data={
                "total": total_clients,
                "clients": list(total_clients_per_month.values()), 
                "price": list(total_price_per_month.values()),
                "total_products": total_products,
                "products": {
                    "label": list(total_products_per_month), 
                    "data": list(total_products_per_month.values())
                    },
                "family": {
                    "label": list(product_family_sold_by_month),
                    "data": list(product_family_sold_by_month.values())
                    },
                },
            code=200).get_res()
