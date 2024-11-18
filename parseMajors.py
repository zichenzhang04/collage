import pandas as pd

df = pd.read_csv("Majors.csv") 
final = []
for index, row in df.iterrows():
    if row['Program'] != 'Program':
        program = row['Program'].split(' (')
        final.append(program[0])

print(final)