import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")

print(f"Testing API Key: {API_KEY[:5]}...{API_KEY[-5:]}")

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')

try:
    response = model.generate_content("Say 'AI is working'")
    print(f"SUCCESS: {response.text}")
except Exception as e:
    print(f"FAILURE: {e}")
