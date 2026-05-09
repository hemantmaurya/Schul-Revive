# SchulRevive - School Management System

A modern, full-stack **School Management System** built with React, Node.js, and PostgreSQL, fully containerized using Docker.

---

## ✨ Features

- Modern React frontend with Vite
- Node.js + Express backend
- PostgreSQL database
- Hot reload in development
- Easy setup with Docker Compose
- pgAdmin for database management

---

## 🚀 Quick Start

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/hemantmaurya/Schul-Revive.git
cd schulrevive
```
### 2. Start the Application
# First time setup (removes old data and builds fresh)
```
docker compose down -v
docker compose up -d --build
```
### 3. Access the Services
```
Frontend (React Application)
http://localhost:5173  
Backend (Node.js API)
http://localhost:4000
pgAdmin (Database Management Tool)
http://localhost:5050
```

### 4. Login to pgAdmin

URL: 
```
http://localhost:5050
```
Login Credentials:

Email: admin@schulnetz.com
Password: admin123

After logging in, register the database:

Right-click on Servers → Register → Server
In the General tab:
Name: Schulnetz Database

In the Connection tab:
Host name/address: schulnetz-db
Port: 5432
Username: weAdmin
Password: pass123word

Click Save

### Common Docker Commands

```
# Start services
docker compose up -d

# Stop services
docker compose down

# Fresh start (recommended first time or when having issues)
docker compose down -v
docker compose up -d --build

# View logs
docker compose logs -f
docker compose logs backend -f
docker compose logs db -f
docker compose logs pgadmin -f

# Rebuild a specific service
docker compose up -d --build backend

```

### Project Structure 

```
schulrevive/
├── backend/              # Node.js + Express backend
├── frontend/             # React + Vite frontend
├── docker-compose.yml    # Docker configuration
├── README.md

```

### Tech Stack

*** Frontend: React, Vite
*** Backend: Node.js, Express, Nodemon
*** Database: PostgreSQL 16
*** Database Tool: pgAdmin 4
*** Containerization: Docker & Docker Compose

### 🔧 Environment Variables
All environment variables are pre-configured in docker-compose.yml:

Backend Database URL:
DATABASE_URL=postgresql://weAdmin:pass123word@db:5432/schulnetz
Frontend API URL:
VITE_API_URL=http://localhost:4000


### 📝 Important Notes

Database data is persisted using Docker volumes.
Use docker compose down -v only when you want to completely reset the database.
All services are currently configured for development with hot reload.

### 🤝 Contributing
Contributions, issues, and feature requests are welcome!
