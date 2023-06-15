import os
import pandas as pd

directory_path = os.path.abspath(os.path.dirname(__file__))
csv_path = os.path.join(directory_path, "titanic.csv")
df = pd.read_csv(csv_path)
# print(df.head(5))

# print(df.columns)
# print(df["age"])

nullCount = 0
ageCount = 0

for index, row in df.iterrows():
    age = str(round(row["age"], 2))
    if age == "nan":
        nullCount += 1
    else:
        ageCount += 1

print(f"age {ageCount} non-null {nullCount} null")
