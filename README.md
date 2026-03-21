# TravelVerse 🌍

Welcome to **TravelVerse**, a full-stack platform built with modern web technologies, providing a seamless and engaging user experience for travelers and enthusiasts.

## 🚀 Overview

TravelVerse is architected as a monolithic repository containing two main ecosystems:
- **Frontend**: A dynamic, interactive user interface built with React.
- **Backend**: A robust RESTful API and server environment powered by Laravel (PHP).

## 🛠 Tech Stack

- **Frontend**: React.js, Vite (build tool), npm/yarn packages.
- **Backend**: Laravel (PHP ecosystem), Composer, MySQL/PostgreSQL (Database).

## 📂 Project Structure

```text
TravelVerse/
├── backend/       # Laravel API, Models, Controllers, and Migrations
├── frontend/      # React SPA, Components, Assets, and Views
└── README.md
```

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- **Node.js** & **npm/yarn** (For the frontend)
- **PHP** & **Composer** (For the backend API)
- A local database service (e.g., MySQL, PostgreSQL, or SQLite)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/gofa10/TravelVerse.git
   cd TravelVerse
   ```

2. **Backend Setup:**
   ```sh
   cd backend
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   php artisan serve
   ```
   *Note: Ensure your database credentials are correctly filled in the `.env` file before migrating.*

3. **Frontend Setup:**
   Open a new terminal window or tab:
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the platform:**
   Open your browser and navigate to the local server URL provided by Vite (usually `http://localhost:5173`).

---
_Developed for the TravelVerse project._
