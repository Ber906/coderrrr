# Multiple Large Language Model API Wrapper

**Created by Samir**

---

## Overview

This project serves as a wrapper for multiple large language models, providing a unified interface for easy integration. The primary functionality includes interaction with Google's Text Service API, ChatGPT, and a custom BardAI assistant.

---

## Installation

To use this API wrapper, follow these steps:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the application:

   ```bash
   npm start
   ```

## Usage

### Google's Text Service API

- **Endpoint:** /api/palm
- **Method:** POST
- **Body:**
  ```json
  {
    "prompt": "Your prompt text here"
  }
  ```
- **Response:**
  ```json
  {
    "output": "Generated text output"
  }
  ```

### ChatGPT

- **Endpoint:** /api/chatgpt
- **Method:** GET
- **Query Parameter:**
  - question: Your question text
- **Response:**
  ```json
  {
    "response": "Generated response from ChatGPT"
  }
  ```

### BardAI

- **Endpoint:** /api/bard
- **Method:** GET
- **Query Parameter:**
  - question: Your question text
- **Response:**
  ```json
  {
    "message": "Generated message",
    "imageUrls": ["url1", "url2"]
  }
  ```



## Credits

Samir - Creator

Feel free to explore and integrate this API wrapper into your projects! If you want me to add other models comment below and Don't forgot to Star it Follow me for latest Updates