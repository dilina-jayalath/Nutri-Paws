# NutriPaws Web Application

## Overview

This is a simple To-Do Task web application with three main components:

1. **Database**: MySQL
2. **Backend API**: Spring Boot (Java) with REST API
3. **Frontend UI**: Angular 15 with Material UI & Bootstrap (Desing it as example ui)

The application allows users to

- Create new tasks (title + description)
- View the 5 most recent tasks
- Mark tasks as completed (completed tasks are removed from the UI)

All components are **containerized using Docker** and managed with **Docker Compose**.

---

## Tech Stack

- **Database**: MySQL
- **Backend**: Java (Spring Boot, Spring Data JPA, Spring Web, Spring Boot Test)
- **Frontend**: Angular 15, Angular Material, Bootstrap
- **Containerization**: Docker, Docker Compose

---

## Setup & Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/smsdahanayaka/isp_nutripaws.git
cd isp_nutripaws
```

### 2️⃣ Run the Application using Docker

Ensure you have **Docker** and **Docker Compose** installed.

```sh
docker-compose build

docker-compose up -d
```

###  Access the Application

- `http://localhost:4300`
---

## Backend Unit Testing

### Running Backend Unit testings 

1. **Build and run the application containers:**

   ```sh
   docker-compose up --build
   ```

2. **Run the unit tests in the backend service container:**

   when you run::

   ```sh
   docker-compose up --build
   ```

   The backend will first run the tests, and if successful, it will launch the Spring Boot application.
Alternatively, if you only want to run the tests manually in the backend container, you can run.

   ```sh
   docker-compose run backend mvn test
   ```

### Running Unit Tests Locally (Without Docker)

To run the tests locally (without Docker), follow these steps:

1. **Start the Backend (Spring Boot) with Tests:**

   ```sh
   cd backend
   mvn test
   ```

   This command will run all unit tests in the backend module.

2. **Review Test Results:**

   Test results will be shown in the terminal. You can also find detailed reports in the `target/test-classes` folder.

---

This will start the **MySQL Database, Spring Boot Backend, and Angular Frontend** in separate containers.

### 3️⃣ Access the Application

- **Frontend (Angular UI):** `http://localhost:4300`
- **Backend (Spring Boot API):** `http://localhost:8081`
- **Database (MySQL):** ` localhost:3309 (Default credentials in ``dockercompose.yml `

---

## Development (Without Docker)

### 2️⃣ Start the Backend (Spring Boot)

```sh
cd backend
mvn spring-boot:run
```

### 3️⃣ Start the Frontend (Angular 15)

```sh
cd frontend
npm install
ng serve
```


---



## Project Structure

```
/isp_nutripaws
│── /backend          # Spring Boot (Java) backend
│── /frontend         # Angular 15 frontend
│── /docker-compose.yml # Docker setup
│── README.md         # Documentation
```

---

## Notes

- ( In docker )Make sure **port 3306 (MySQL), 8080 (Backend), and 80(Frontend)** are not in use before running the app.\

- ( FOR LOCAL ACCESS )Make sure port 3309 (MySQL), 8081 (Backend), and 4300 (Frontend) are not in use before running the app. \

- Modify environment variables inside `docker-compose.yml` if needed.

- All test cases must pass before deployment.

🚀 **Enjoy coding!** 🎯
