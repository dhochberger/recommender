import os
import numpy as np
import pandas as pd


directory_path = os.path.abspath(os.path.dirname(__file__))
csv_path = os.path.join(directory_path, "KaDo.csv")
df = pd.read_csv(csv_path).copy()

print(df.groupby(["CLI_ID"]).head())
