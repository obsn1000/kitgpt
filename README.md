# KitGPT

Ask Jason anything. iPhone-friendly personal AI chat site with voice responses.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- OpenAI API key
- Resemble.ai API key and voice UUID

### Environment Setup
1. Clone the repository
2. Create a `.env` file in the root directory with the following variables:
   ```
   RESEMBLE_API_KEY=your_resemble_api_key_here
   RESEMBLE_VOICE_UUID=your_voice_uuid_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Frontend Setup
1. Install dependencies:
   ```
   npm install
   ```
2. Build the frontend:
   ```
   npm run build
   ```

### Backend Setup
1. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```
2. Run the Flask server:
   ```
   python server.py
   ```

### Development
- For frontend development: `npm run dev`
- For backend development: `python server.py`

## Usage
1. Open your browser to `http://localhost:5000`
2. Type a message to Jason and click Send
3. Jason will respond with text and voice