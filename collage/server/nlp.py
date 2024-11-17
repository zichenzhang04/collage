from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Load a pre-trained Sentence-BERT model
model = SentenceTransformer('all-MiniLM-L6-v2')  # You can use other Sentence-BERT models

def get_semantic_similarity(text1, text2):
    """
    Computes the semantic similarity between two pieces of text using Sentence-BERT embeddings.

    Args:
        text1 (str): The first text input.
        text2 (str): The second text input.

    Returns:
        float: A similarity score between 0 and 1, where 1 indicates perfect similarity.
    """
    # Generate embeddings for both texts
    embeddings = model.encode([text1, text2])

    # Calculate cosine similarity between the embeddings
    similarity = cosine_similarity([embeddings[0]], [embeddings[1]])

    # Return the similarity score as a float
    return similarity[0][0]

# from PyPDF2 import PdfFileReader
# import nltk
# import os
# from nltk.corpus import stopwords
# from nltk.tokenize import word_tokenize

# # # Define the writable directory for NLTK data
# # nltk_data_dir = os.path.expanduser('~/nltk_data')

# # # Create the directory if it doesn't exist
# # os.makedirs(nltk_data_dir, exist_ok=True)

# # # Set the NLTK data path to the new directory
# # nltk.data.path.append(nltk_data_dir)

# # # Function to safely download NLTK data
# # def safe_nltk_download(package):
# #     try:
# #         nltk.download(package, download_dir=nltk_data_dir)
# #     except Exception as e:
# #         print(f"Error downloading {package}: {e}")

# # # Download the necessary NLTK data
# # safe_nltk_download('punkt')
# # safe_nltk_download('stopwords')

# def parse_resume(pdf_file):
#     """Return keywords from the resume input from the user when the user signs up."""
#     pdf_reader = PdfFileReader(pdf_file)
#     text = ''
#     for page_num in range(pdf_reader.getNumPages()):
#         page = pdf_reader.getPage(page_num)
#         text += page.extract_text()

#     stop_words = set(stopwords.words('english'))
#     word_tokens = word_tokenize(text, language="english")
#     # Filter out meaningless tokens - symbols and stopwords
#     filtered_words = [word for word in word_tokens
#                       if word.isalnum() and word.lower() not in stop_words]
#     # Filter out duplicate tokens
#     unique_keywords = list(set(filtered_words))
#     # Make the unique keywords into a long string with each token seperated by a space
#     keywords_string = ' '.join(unique_keywords)

#     return keywords_string
