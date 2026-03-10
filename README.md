# Distributed Chat System

A horizontally scalable real-time chat application built with WebSockets, Redis Pub/Sub, Docker, and Nginx.

This project demonstrates how to scale a real-time system across multiple backend instances while keeping messages synchronized between them.

---

# Architecture Overview

The system uses a distributed architecture where multiple Node.js servers handle WebSocket connections, while Redis ensures message synchronization between them.

```
Client
   ↓
NGINX (Load Balancer / Reverse Proxy)
   ↓
Multiple Node.js Chat Servers
   ↓
Redis Pub/Sub
   ↓
Clients receive synchronized messages
```

---

# Tech Stack

Backend

* Node.js
* Socket.IO
* Redis Pub/Sub

Infrastructure

* Docker
* Docker Compose
* Nginx (Load balancing)

Frontend

* Next.js
* React
* shadcn/ui

---

# Features

* Real-time chat using WebSockets
* Room-based messaging
* Horizontal scaling with multiple server instances
* Redis Pub/Sub for cross-server communication
* Nginx load balancing
* Fully containerized using Docker

---

# Project Structure

```
chat-system/
│
├── client/           # Next.js frontend
│
├── server/           # Node.js + Socket.IO backend
│
├── nginx/            # Nginx configuration
│   └── nginx.conf
│
├── docker-compose.yml
│
└── README.md
```

---

# How It Works

1. Clients connect to Nginx.
2. Nginx forwards requests to one of the backend servers.
3. When a user sends a message:

   * The server publishes it to Redis.
4. Redis broadcasts the message to all servers.
5. Each server sends the message to its connected clients.

This allows multiple backend instances to stay synchronized.

---

# Prerequisites

Make sure you have installed:

* Docker
* Docker Compose
* Node.js (optional for local development)

---

# Running the Project

## 1. Clone the Repository

```
git clone <your-repository-url>
cd chat-system
```

---

## 2. Start the System with Docker

Build and start all services:

```
docker compose up --build
```

This starts:

* Redis
* Nginx
* One backend server

---

## 3. Scale the Backend Servers

To run multiple server instances:

```
docker compose up --build --scale server=3
```

This will start:

```
server-1
server-2
server-3
```

All servers connect to Redis and are load balanced by Nginx.

---

## 4. Run in Detached Mode (Optional)

Run containers in the background:

```
docker compose up --build --scale server=3 -d
```

---

## 5. View Server Logs Only

```
docker compose logs -f server
```

---

# Accessing the Application

Frontend:

```
http://localhost:3000
```

Backend (via Nginx):

```
http://localhost
```

---

# Stopping the Project

Stop and remove containers:

```
docker compose down
```

---

# Key Concepts Demonstrated

* WebSocket based real-time communication
* Horizontal scaling of backend servers
* Redis Pub/Sub for distributed messaging
* Containerized infrastructure
* Nginx reverse proxy and load balancing

---

# Future Improvements

Possible enhancements include:

* Persistent message storage using PostgreSQL or MongoDB
* Authentication and user accounts
* Online presence indicators
* Message history
* Kafka-based event streaming
* Kubernetes deployment

---

# License

This project is open-source and available under the MIT License.
