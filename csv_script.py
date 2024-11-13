import pandas as pd
df = pd.read_csv('course-tags.csv')
unique_values = df['Subject'].unique()

print([subject for subject in unique_values])