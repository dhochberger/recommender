import os
import numpy as np
import pandas as pd


directory_path = os.path.abspath(os.path.dirname(__file__))
csv_path = os.path.join(directory_path, "titanic.csv")
df = pd.read_csv(csv_path).copy()


# df = df.rename(columns=lambda x: x.strip())

# df = df.apply(lambda x: x.str.strip() if x.dtype == "object" else x)

df["count"] = 1

# pourcentage par sexe
print(df.groupby(["sex"]).mean().round(2)[["survived", "age", "fare"]])
print("\n---------------------------------------\n")
# pourcentage par class
print(df.groupby(["pclass"]).mean().round(2)[["survived", "age", "fare"]])
print("\n---------------------------------------\n")
# pourcentage par sexe + survivant
print(df.groupby(["sex", "survived"]).mean().round(2)[["age", "fare"]])
print("\n---------------------------------------\n")
# nombre de survivant total, nombre total et prix par class
print(df.groupby(["pclass"]).sum()[["fare", "survived", "count"]])
print("\n---------------------------------------\n")
print("\n---------------------------------------\n")
print("\n---------------------------------------\n")
print("\n---------------------------------------\n")

# pourcentage de survivant par sexe
print(df.groupby(["sex", "survived"]).mean().round(2)[["age", "fare"]])
print("\n---------------------------------------\n")

# nombre de survivant par sexe
print(df.groupby(["sex", "survived"]).count()["count"])
print("\n---------------------------------------\n")

# plus agée
print(df.sort_values(["age"], ascending=False).head()[["age"]])


print("\n---------------------------------------\n")
# nombre de survivant par tranche d'age, class et sexe trier par ordre decroisant
print(
    df.groupby([pd.cut(df["age"], np.arange(0, 99, 9)), "pclass", "sex"])
    .sum()[["survived", "count"]]
    .sort_values("survived", ascending=False)
)

print("\n---------------------------------------\n")

pd.set_option("display.max_rows", None)
# pourcentage de survivant par destination
print(
    df.groupby("home.dest")
    .agg(survived=("survived", "mean"), count=("count", "sum"))
    .sort_values("count", ascending=False)
)
