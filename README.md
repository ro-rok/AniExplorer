# Anime Recommendation System

This project is an Anime Recommendation System that allows users to find anime that is similar to their favorite ones. The application uses Flask for the backend and React for the frontend. It utilizes a pre-trained model to recommend similar animes and retrieves anime details from the MyAnimeList (MAL) API.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [React Components](#react-components)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- Search for an anime by name.
- Retrieve anime details using the MyAnimeList (MAL) API.
- Find similar animes using a pre-trained model.
- Display similar animes along with their details and similarity scores.

## Requirements

- Python 3.7+
- Node.js 14+
- Flask
- React

## Installation

### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/orangeappleak/anime_recommender.git
   cd anime_recommender
   ```

2. **Set Up a Virtual Environment:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. **Install Python Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Load Anime ID Weights:**

   - Place the `id_weights.pkl` file in the root directory of the project.

5. **Set Up MyAnimeList API Client ID:**

   - Replace `client_id` in the Flask app with your MAL API client ID.

6. **Run the Flask Server:**

   ```bash
   python app.py
   ```

### Frontend Setup

1. **Navigate to the React App Directory:**

   ```bash
   cd frontend
   ```

2. **Install Node.js Dependencies:**

   ```bash
   npm install
   ```

3. **Run the React App:**

   ```bash
   npm start
   ```

## Usage

1. Open your web browser and navigate to `http://127.0.0.1:3000/`.
2. Enter the name of an anime you like in the input field.
3. Click on the "Find Similar Animes" button to retrieve a list of similar animes along with their details.

## API Endpoints

### `POST /find_similar`

**Description:**  
Finds similar animes based on the name of the anime provided.

**Request Body:**

```json
{
  "anime_name": "Your Anime Name"
}
```

**Response:**

```json
{
  "similar_animes": [
    {
      "anime_details": {
        "id": 12345,
        "title": "Similar Anime Title",
        "main_picture": {
          "medium": "https://image.url"
        },
        "synopsis": "Anime synopsis",
        ...
      },
      "similarity": 0.95
    },
    ...
  ]
}
```

**Error Responses:**

- `404` if the anime is not found.
- `500` if there is a server error.

## React Components

### `App`

- **Description:** The main component that handles the search input, fetches similar animes, and displays the results.

- **State:**
  - `animeName` (string): Stores the name of the anime entered by the user.
  - `similarAnimes` (array): Stores the list of similar animes returned by the backend.

- **Functions:**
  - `handleSearch`: Fetches similar animes from the backend based on the user's input.

### `AnimeChild`

- **Description:** A child component that displays the details of a similar anime including the title, similarity percentage, and main image.

- **Props:**
  - `animeDetails` (object): Contains details about the anime (title, main picture, etc.).
  - `sim` (float): The similarity score between the input anime and this anime.

## Project Structure

```plaintext
anime_recommender/
│
├── app.py                    # Flask application
├── id_weights.pkl            # Serialized anime ID weights after getting trained through TensorFlow model
├── anime_data/               # Directory containing CSV files with anime data (optional)
├── frontend/                 # React application directory
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── index.js          # React entry point
│   │   └── AnimeChild.js     # Child component for displaying anime details
│   └── public/
│       └── index.html        # HTML template
└── README.md                 # Project documentation
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
