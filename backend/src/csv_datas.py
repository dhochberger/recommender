import os
import zipfile

import pandas as pd
from pandas import read_csv

""" directory_path = os.path.abspath('.')
kado_file = os.path.join(directory_path, "KaDo.csv")
if not os.path.exists(kado_file):
  with zipfile.ZipFile(os.path.abspath('../KaDo.zip'), 'r') as zip_ref:
      zip_ref.extractall("./")
else:
  print("KaDo already unzipped")
df = pd.read_csv(kado_file) """

directory_path = os.path.abspath('.')
df_cluster = os.path.join(directory_path, "df_cluster.csv")
if not os.path.exists(df_cluster):
    with zipfile.ZipFile(os.path.abspath('../df_cluster.zip'), 'r') as zip_ref:
      zip_ref.extractall("./")
else:
    print('df_cluster_csv already exists')

df = pd.read_csv(df_cluster)

import seaborn as sns
import statsmodels.api as sm

sns.set()
from sklearn.cluster import KMeans

lst_prod = df[['LIBELLE', 'PRIX_NET']]
lst_prod_1 = lst_prod.drop_duplicates(subset=['LIBELLE'])
lst_prod_2 = pd.DataFrame(df.groupby(["LIBELLE"]).size(), columns=['SUM'])
lst_prod_3 = pd.merge(lst_prod_1, lst_prod_2, on="LIBELLE")
x = lst_prod_3.iloc[:,1:3]

import pickle

kmeans_model = os.path.join(directory_path, "kmeans.pkl")
kmeans = {}
if not os.path.exists(kmeans_model):
    print('training kmeans')
    kmeans = KMeans()
    kmeans.fit(x)
    pickle.dump(kmeans, open('kmeans.pkl', 'wb'))
else:
    print('model exists, loading model')
    kmeans = pickle.load(open("kmeans.pkl", "rb"))

identified_clusters = kmeans.fit_predict(x)

class Datas:

    def total_unique_clients(self):
        return df['CLI_ID'].nunique()

    def total_clients_per_month(self):
        frame = df.groupby(['MOIS_VENTE'])['CLI_ID'].nunique().to_dict()
        return frame

    def total_price_per_month(self):
        frame = df.groupby(['MOIS_VENTE'])['PRIX_NET'].sum().to_dict()
        return frame

    def total_products_sold(self):
        return df["FAMILLE"].count().sum().item()

# nombre produit vendu par mois
    def total_products_per_month(self):
        frame = df.groupby(["MOIS_VENTE", "FAMILLE"])['PRIX_NET'].sum().to_dict()
        return frame

# produit vendu par famille par mois
    def product_family_sold_by_month(self):
        frame = df.groupby(["FAMILLE"])['MOIS_VENTE'].count().round(2).to_dict()
        return frame

# liste des clients
    def get_clients_list(self):
        frame = df["CLI_ID"].unique().tolist()
        return frame

# liste d'un client
    def get_client_by_id(self, client_id):
        frame = df.loc[df['CLI_ID'] == client_id].to_dict()
        return frame

# tout les prix d'un label de produit
    def get_all_product_price(self, product_label):
        frame = df.loc[df['LIBELLE'] == product_label][['MOIS_VENTE','PRIX_NET']].to_dict()
        return frame

#### FONCTION DE SUGGESTION DE PRODUIT ####
    def get_most_sold_item_by_FAMILLE(self, family_name):
        rslt_df = df[df['FAMILLE'] == family_name]
        return rslt_df.groupby(["LIBELLE"]).size().sort_values(ascending=False).head(5).to_dict()

    def get_most_sold_item_by_MAILLE(self, mesh_name):
        rslt_df = df[df['MAILLE'] == mesh_name]
        return rslt_df.groupby(["LIBELLE"]).size().sort_values(ascending=False).head(5).to_dict()

    def get_most_sold_item_by_UNIVERS(self, universe_name):
        rslt_df = df[df['UNIVERS'] == universe_name]
        return rslt_df.groupby(["LIBELLE"]).size().sort_values(ascending=False).head(5).to_dict()

    def get_month_tickets(self, client_id):
        rslt_df = df[df['CLI_ID'] == client_id]
        return rslt_df.groupby(["MOIS_VENTE"])["TICKET_ID"].nunique().to_dict()

    def suggest(self, client_id):
        result = df.loc[df['CLI_ID'] == client_id]
        return {"month_tickets": list(self.get_month_tickets(client_id).values()), "nb_achat": len(result), "nb_passage": len(result.groupby(['TICKET_ID'])), "univers":list(result['UNIVERS'].mode()), "maille": list(result['MAILLE'].mode()), "famille": list(result['FAMILLE'].mode())}
