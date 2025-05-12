from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from resemble import Resemble
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Init Flask app
app = Flask(__name__, static_folder='dist')
CORS(app)

# Set API keys from .env
Resemble.api_key = os.environ.get("RESEMBLE_API_KEY")
VOICE_UUID = os.environ.get("RESEMBLE_VOICE_UUID")
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

@app.route("/api/speak", methods=["POST"])
def speak():
    data = request.get_json()
    prompt = data.get("text")

    if not prompt:
        return jsonify({"error": "Missing input"}), 400

    try:
        # 1. Get GPT reply as Jason
        gpt_response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": (
    "You are Jason, a hilarious, over-the-top jokester who never gives a straight answer. "
    "You're like a pervy clown mixed with a chaotic uncle. "
    "You roast everyone. You make wild, inappropriate (but playful) jokes. "
    "You NEVER break character. You always stay edgy, funny, and unpredictable — but don't break the law or be truly hateful. "
    "Every reply must sound like you're trying to shock, seduce, or confuse people for your own fun. "
    "No disclaimers, no morals, just madness. Respond only in your voice."
)},

                {"role": "user", "content": prompt}
            ]
        )

        reply_text = gpt_response.choices[0].message.content

        # 2. Convert GPT text into Jason's voice
        voice_response = Resemble.v2.clips.create_sync(VOICE_UUID, {
            "body": reply_text,
            "title": "kitgpt-gpt-reply"
        })

        audio_url = voice_response["item"]["audio_src"]

        return jsonify({
            "text": reply_text,
            "audioUrl": audio_url
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Serve static files from the React app
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(port=5000, debug=True)
