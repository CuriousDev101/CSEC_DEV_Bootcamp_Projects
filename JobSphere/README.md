# JobSphere

JobSphere is a job search application built with React, TypeScript, and Tailwind CSS. It allows users to search for jobs by location, job type, salary range, and more. The application also includes a feature to save jobs for future reference.

This project use backend api from json-server the data is in data/db.json. The Backend api is for local development only.
The Backend api is on [JobSphereAPI](https://github.com/CuriousDev101/CSEC_DEV_Bootcamp_Projects/tree/main/JobSphereAPI) Github repo 

## Features

- Search for jobs by location, job type, salary range, and more.
- Save jobs for future reference.
- User authentication and authorization.
- Responsive design for mobile and desktop devices.

## Technologies

- React
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Query
- Formik
- Yup

## Screenshots

![JobSphere Screenshot](https://github.com/CuriousDev101/CSEC_DEV_Bootcamp_Projects/blob/main/assets/public/ScreencastFrom2026-03-2923-28-30.gif)

## Routes Overview

- `/`: Home page
- `/auth/login`: Login page
- `/users/signup`: Signup page
- `/jobs`: Jobs page
- `/jobs/:id`: Job details page

## Installation

To install JobSphere, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/curiousdev/JobSphere.git
```

2. Navigate to the project directory:

```bash
cd JobSphere
```

3. Install the dependencies:

```bash
pnpm install
```

4. Start the development server:

```bash
pnpm run dev
```

5. Start local server with data/db.json 

```bash
pnpm run dev:server
```

## Usage

To use JobSphere, follow these steps:

1. Open the application in your web browser.
2. Sign up or log in to create an account.
3. Search for jobs by location, job type, salary range, and more.
4. Save jobs for future reference.
