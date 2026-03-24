# Game API

This is a simple API that allows you to create, read, update, and delete games.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/curiousdev/GameApi.git
```

2. Install the dependencies:

```bash
pnpm install
```

3. Start the server:

```bash
pnpm run dev
```

4. Open your browser and navigate to `http://localhost:3000/games`.

## Usage

To create a new game, send a POST request to the `/games` endpoint with the following JSON body:

```json
{
  "name": "My Game",
  "price": 99.99
}
```

## Endpoints

### GET /games

Returns a list of all games.

### GET /games/:id

Returns the game with the specified ID.

### POST /games

Creates a new game with the specified name and price.

### PUT /games/:id

Updates the game with the specified ID.

### DELETE /games/:id

Deletes the game with the specified ID.

## Environment Variables

The following environment variables are required:

- `PORT`: The port number to use for the server.
