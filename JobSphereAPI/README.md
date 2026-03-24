# JobSphere API

This is a RESTful API built with Node.js, Express, and MongoDB. It provides endpoints for managing users and jobs.

## Endpoints

### Users

- `GET /api/v1/users`: Get all users
- `GET /api/v1/users/:id`: Get a user by ID
- `POST /api/v1/users`: Create a new user
- `PUT /api/v1/users/:id`: Update a user by ID
- `DELETE /api/v1/users/:id`: Delete a user by ID

### Jobs

- `GET /api/v1/jobs`: Get all jobs
- `GET /api/v1/jobs/:id`: Get a job by ID
- `POST /api/v1/jobs`: Create a new job
- `PUT /api/v1/jobs/:id`: Update a job by ID
- `DELETE /api/v1/jobs/:id`: Delete a job by ID

## Authentication

The API uses JSON Web Tokens (JWT) for authentication. The JWT is signed using the `JWT_SECRET` environment variable. The JWT payload contains the user ID and the user's first and last name.

To generate a JWT, you can use the `generateToken` function in the `jwt.ts` file. Here's an example of how to use it:

```typescript
import { generateToken } from "./jwt"; // Import the generateToken function

const token = generateToken({ userId: "123", firstName: "John", lastName: "Doe" }); // Generate a JWT
```

To verify a JWT, you can use the `verifyToken` function in the `jwt.ts` file. Here's an example of how to use it:

```typescript
import { verifyToken } from "./jwt"; // Import the verifyToken function

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3In0.5d8a8-4f0b0-4e0a-a0c0-0f5a0-5d8a8-4f0b0-4e0a-a0c0-0f5a0";

const user = verifyToken<User>(token); // Verify the JWT

console.log(user); // Output: { userId: "123", firstName: "John", lastName: "Doe" }
```

## Environment Variables

The API uses the following environment variables:

- `MONGODB_URI`: The MongoDB connection URI
- `PORT`: The port number to run the API on
- `JWT_SECRET`: The secret key used to sign and verify JWTs
- `JWT_EXPIRES_IN`: The expiration time for JWTs in hours

## Running the API

To run the API, you can use the following command:

```bash
pnpm run dev
```

This will start the API on the specified port and listen for incoming requests.

## Seeding the Database

To seed the database with sample data, you can use the following command:

```bash
pnpm run seed
```

This will insert sample data into the database.
