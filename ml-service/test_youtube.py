# ml-service/test_youtube.py

import os
from dotenv import load_dotenv
from googleapiclient.discovery import build

# --- THIS IS THE KEY PART ---
# Explicitly load the .env file from the current directory
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=dotenv_path)

# Now, get the API key
YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')

def search_youtube(query):
    """
    Searches YouTube for videos based on a query and prints the results.
    """
    # Check if the API key was loaded correctly
    if not YOUTUBE_API_KEY:
        print("ERROR: YOUTUBE_API_KEY not found. Please check your .env file.")
        return

    try:
        # Use the API key when building the service
        youtube_service = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

        request = youtube_service.search().list(
            q=query, part='snippet', type='video', maxResults=5
        )
        response = request.execute()

        print(f"--- Top 5 YouTube Results for '{query}' ---")
        for item in response.get('items', []):
            title = item['snippet']['title']
            video_id = item['id']['videoId']
            video_url = f"https://www.youtube.com/watch?v={video_id}"
            print(f"\nTitle: {title}")
            print(f"URL: {video_url}")
        print("\n-----------------------------------------")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    search_query = "Web Development for beginners"
    search_youtube(search_query)