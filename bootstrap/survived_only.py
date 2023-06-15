import os
import pandas as pd


directory_path = os.path.abspath(os.path.dirname(__file__))
csv_path = os.path.join(directory_path, "titanic.csv")
df = pd.read_csv(csv_path)

survivedCount = 0
averageAge = 0
averageFare = 0
# for index, item in df.iterrows():
#   if (item['survived']):
#     survivedCount += 1
#     print(item['age'])


print(df.loc[df["survived"] == 1].describe()[["age", "fare", "survived"]])

# print(f"total: {survivedCount}\nage: {averageAge}\nfare: {averageFare}")
