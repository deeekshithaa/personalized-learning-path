# ml-service/app.py

import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from googleapiclient.discovery import build
from flask_cors import CORS # We need to handle CORS for our Python server too!

# --- Initialization ---
load_dotenv()
YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')

app = Flask(__name__)

# IMPORTANT: Set up CORS to allow requests from our Vue frontend
# We'll allow all origins for now during development.
CORS(app) 

# --- Helper Function for YouTube Search ---
def search_youtube(query, max_results=5):
    """
    Performs a YouTube search and returns a list of video data.
    """
    if not YOUTUBE_API_KEY:
        print("ERROR: YOUTUBE_API_KEY not found.")
        return [] # Return an empty list if key is missing

    try:
        youtube_service = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)
        
        search_request = youtube_service.search().list(
            q=query,
            part='snippet',
            type='video',
            maxResults=max_results
        )
        response = search_request.execute()

        videos = []
        for item in response.get('items', []):
            video_data = {
                "title": item['snippet']['title'],
                "videoId": item['id']['videoId'],
                "url": f"https://www.youtube.com/watch?v={item['id']['videoId']}",
                "thumbnail": item['snippet']['thumbnails']['high']['url']
            }
            videos.append(video_data)
        
        return videos

    except Exception as e:
        print(f"An error occurred during YouTube search: {e}")
        return []

# --- API Routes ---
@app.route('/')
def index():
    return "ML Recommendation Service is live!"

@app.route('/recommend', methods=['POST'])
def recommend():
    # 1. Get the user's profile from the incoming request
    data = request.get_json()
    user_goal = data.get('goal')
    user_skill = data.get('skillLevel')

    if not user_goal or not user_skill:
        return jsonify({"error": "goal and skillLevel are required"}), 400

    # 2. Create a dynamic search query
    search_query = f"{user_goal} tutorial for {user_skill}s"
    print(f"Performing YouTube search for: '{search_query}'")

    # 3. Get the video recommendations
    recommended_videos = search_youtube(search_query, max_results=6) # Let's get 6 videos

    # 4. Return the recommendations as JSON
    return jsonify(recommended_videos)


# --- Run the App ---
if __name__ == '__main__':
    app.run(port=5001, debug=True)