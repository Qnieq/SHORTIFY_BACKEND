# SHORTIFY BACKEND

This is the backend application for the Shortify project, built primarily with NestJS and Prisma. Shortify is a URL shortening service that provides users with a simple way to generate short, manageable URLs.

## Table of Contents

- [Features](#features)
- [API](#api)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Features

- Shorten URLs quickly and easily
- Track the number of clicks on shortened URLs
- RESTful API for URL management

## API

### Endpoints

- **POST /shorten**: Create a short URL
- **GET /shorten/:shortUrl**: Redirect to the original URL
- **GET /shorten/info/:shortUrl**: Get information about a short URL
- **DELETE /shorten/delete/:shortUrl**: Delete a short URL
- **GET /shorten/analytics/:shortUrl**: Get analytics for a short URL

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Prisma**: ORM for database access.
- **TypeScript**: Main programming language used for the backend.
- **Dockerfile**: Used for containerizing the application.

## Installation

To install and run the application locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Qnieq/SHORTIFY_BACKEND.git
    cd SHORTIFY_BACKEND
    ```
    or
   ```bash
    docker pull qunie/shortify-backend
    cd shortify-backend
    ```

3. **Install the dependencies**:
    ```bash
    yarn install
    ```

4. **Run the application**:
    ```bash
    # development
    yarn run start

    # watch mode
    yarn run start:dev

    # production mode
    yarn run start:prod
    ```

5. **Docker (Optional)**:
    If you prefer to run the application in a Docker container, you can build and run the Docker image:
    ```bash
    docker build -t shortify-backend .
    docker run -p 3005:3005 shortify-backend
    ```

## Usage

Once the application is up and running, you can access the API at `http://localhost:3005`. You can use the API to shorten URLs and track their usage.






<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


