# MongoDB Project

## Description

This project is a simple CRUD application that uses MongoDB as the database. It allows users to create, read, update, and delete data from a MongoDB database.

## Features

- CRUD operations for a `User` collection

## Installation

1. Clone the repository:

```bash
git clone https://github.com/curiousdev/mongodbProject.git
```

2. Navigate to the project directory:

```bash
cd mongodbProject
```

3. Install the dependencies:

```bash
pnpm install
```

4. Create a `.env` file in the project directory and add the following environment variables:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
PORT=3000
```

5. Start the server:

```bash
pnpm dev
```

## Usage

To create a new user, send a POST request to the `/users` endpoint with the following JSON payload:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 30
}
```

To read all users, send a GET request to the `/users` endpoint.

To read a specific user, send a GET request to the `/users/<id>` endpoint, where `<id>` is the ID of the user you want to read.

To update a user, send a PUT request to the `/users/<id>` endpoint, where `<id>` is the ID of the user you want to update. Include the updated user data in the request body.

To delete a user, send a DELETE request to the `/users/<id>` endpoint, where `<id>` is the ID of the user you want to delete.
