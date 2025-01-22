# Library Management System

## Overview
This project is a simple library management system built using **Node.js** and connected to a **MySQL** database. It supports basic CRUD operations for books, along with a search functionality. The project is fully dockerized for easy deployment and scalability.

---

## Features
- Create, Read, Update, and Delete (CRUD) operations for books.
- Search books by title or author.
- Environment variables for secure and customizable configuration.
- Dockerized setup with separate containers for the app and database.

---

## Project Structure
```
project-folder/
├── server.js
├── package.json
├── package-lock.json
├── .env
├── database/
│   └── schema.sql
├── Dockerfile
├── docker-compose.app.yml
├── docker-compose.db.yml
└── README.md
```

### Key Files
- **`server.js`**: The main server file for handling API requests.
- **`package.json`**: Manages project dependencies.
- **`.env`**: Stores environment variables.
- **`schema.sql`**: SQL script to set up the database schema.
- **`Dockerfile`**: Configuration for building the Node.js application container.
- **`docker-compose.app.yml`**: Docker Compose file for the application.
- **`docker-compose.db.yml`**: Docker Compose file for the database.

---

## Setup Instructions

### Prerequisites
- **Node.js** and **npm** installed.
- **MySQL** installed locally (optional if running via Docker).
- **Docker** and **Docker Compose** installed.

### Local Setup (Without Docker)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up the database:**
   - Log in to MySQL:
     ```bash
     mysql -u root -p
     ```
   - Execute the schema file:
     ```sql
     source database/schema.sql;
     ```

3. **Run the server:**
   ```bash
   node server.js
   ```
   The server will run on `http://localhost:3000`.

4. **Test the APIs**:
   Use tools like Postman or `curl` to test the endpoints (refer to API documentation below).

### Dockerized Setup

1. **Create a Docker network:**
   ```bash
   docker network create app_network
   ```

2. **Start the database container:**
   ```bash
   docker-compose -f docker-compose.db.yml up -d
   ```

3. **Start the application container:**
   ```bash
   docker-compose -f docker-compose.app.yml up --build
   ```

4. The application will be accessible at `http://localhost:3000`.

---

## API Documentation

### Endpoints
- **POST `/api/books`**: Add a new book.
  - Request Body (JSON):
    ```json
    {
      "title": "Book Title",
      "author": "Author Name",
      "description": "Book description."
    }
    ```

- **GET `/api/books`**: Retrieve all books.

- **GET `/api/books/:id`**: Retrieve a specific book by ID.

- **PUT `/api/books/:id`**: Update a book.
  - Request Body (JSON):
    ```json
    {
      "title": "Updated Title",
      "author": "Updated Author",
      "description": "Updated description."
    }
    ```

- **DELETE `/api/books/:id`**: Delete a book by ID.

---

## Environment Variables
Define the following variables in the `.env` file:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=library
PORT=3000
```

---

## Troubleshooting

### Common Issues
- **Error: Access denied for user 'root'@'localhost'**
  - Verify the username and password in the `.env` file.

- **Error: Cannot connect to MySQL server**
  - Ensure the MySQL server is running and accessible.

- **Permission denied for Docker**
  - Add your user to the Docker group:
    ```bash
    sudo usermod -aG docker $USER
    ```

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a clear description of your changes.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

