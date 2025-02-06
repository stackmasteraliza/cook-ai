# Express.js Cooking AI Chatbot

This project is a Node.js and Express-based API that allows users to ask cooking-related questions. It uses Hugging Face's LLaMA model to generate AI-powered responses.

## Features
- Query Hugging Face's LLaMA model for cooking advice.
- Handle API requests and responses using Express.js.
- JSON-based API for easy integration with frontend applications.

## Video Presentation


## Requirements
- Node.js (v14+)
- Express.js
- Hugging Face API key

## Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/stackmasteraliza/cook-ai.git
   cd cook-ai
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add your Hugging Face API key:
   ```sh
   HUGGINGFACE_API_KEY=your_api_key_here
   ```

## Usage
1. Start the server:
   ```sh
   node index.js
   ```
2. Make a request to the API:
   ```sh
   curl -X POST http://localhost:3000/ask -H "Content-Type: application/json" -d '{"question": "How do I make a perfect omelette?"}'
   ```

## API Endpoints
### `POST /ask`
**Request:**
```json
{
  "question": "How do I make a perfect omelette?"
}
```

**Response:**
```json
{
  "answer": "To make a perfect omelette, beat eggs, heat butter in a pan, pour the eggs, and fold when slightly firm."
}
```

## Technologies Used
- Node.js
- Express.js
- Hugging Face API (LLaMA Model)

## License
This project is licensed under the MIT License.

