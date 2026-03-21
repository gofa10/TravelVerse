# 🌍 **TravelVerse**

<!-- <p align="center">
  <img src="/assets/logo.png" alt="TravelVerse Logo" width="180" />
</p> -->

<p align="center">
  <b>منصة سياحية متكاملة</b> ✨<br/>
  رحلات • فنادق • مطاعم • سيارات • رحلات طيران • أنشطة • كروز
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Laravel-10-FF2D20?style=for-the-badge&logo=laravel" />
  <img src="https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux" />
  <img src="https://img.shields.io/badge/React_Query-TanStack-FF4154?style=for-the-badge" />
</p>

---

## 🎯 فكرة المشروع

**TravelVerse** هو مشروع Full‑Stack ضخم بيهدف لتجميع كل ما يخص السفر والسياحة في مكان واحد، مع تجربة مستخدم سريعة، سلسة، واحترافية، سواء للمستخدم العادي أو للإدارة أو المرشد السياحي.

---

## 🧩 Features Overview

| Feature          | Description                       |
| ---------------- | --------------------------------- |
| 🧭 Trips         | استعراض وحجز الرحلات السياحية     |
| 🏨 Hotels        | عرض فنادق مع فلترة متقدمة         |
| 🍽 Restaurants   | مطاعم بتقييمات وصور               |
| 🚗 Cars          | تأجير سيارات                      |
| ✈ Flights        | البحث عن رحلات طيران              |
| 🎯 Activities    | أنشطة سياحية                      |
| 🛳 Cruises       | رحلات بحرية                       |
| ❤️ Favorites     | مفضلة (Watchlist)                 |
| 📦 Reservations  | إدارة الحجوزات                    |
| 👤 Auth          | Login / Register / Reset Password |
| 🧑‍💼 Dashboards | Admin & Tour Guide                |

---

### 🏠 Home Page

* عرض الرحلات
* Lazy Loading
* Animations
* Performance Optimized

---

### 🧭 Trips Page

**Features:**

* Filters (City, Price, Rate)
* Sort by Price & Rating
* Grid Layout (4 Cards)

---

### 🏨 Hotels Page


**Advanced Filters:**

* Property Type
* Amenities
* Rating
* Price Range

---

### ✈ Flights Page


* From / To
* Dates
* Travel Class
* Pagination

---

### ❤️ Watchlist (Favorites)


* Unified for all models
* Remove / Add instantly
* React Query Caching

---

### 📦 My Reservations

* Trips / Hotels / Flights
* Table + Modal
* Status Tracking

---

## 🧑‍💼 Admin Dashboard

### Features

* CRUD (Trips, Hotels, Cars, Flights, Restaurants)
* Pagination
* Search & Filter
* Image Upload (File / URL)

---

## 🧑‍✈️ Tour Guide Dashboard

* Same UI as Admin
* Limited Permissions
* Own Trips Only

---

## ⚙ Tech Stack

### Frontend

* React 18
* Redux Toolkit
* React Query
* MUI / Bootstrap / Styled Components
* LazyLoadImage
* React Spring

### Backend

* Laravel 10
* RESTful API
* Sanctum Auth
* Polymorphic Relations
* Seeder & Factories

---

## 🗂 Project Structure

```bash
travelverse/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   └── hooks/
├── backend/
│   ├── app/Models
│   ├── app/Http/Controllers
│   └── database/seeders
```

---

## 🚀 Performance

* Lazy Loading Images
* Skeleton Placeholders
* Optimized API Calls
* React Query Caching

---

## 🔐 Authentication Flow

* Login
* Register
* Forgot Password
* Reset Password

---

## 🛠 Installation

### Backend

in https://github.com/Abdallah-Younes10/TravelVersse-API

```bash
composer install
php artisan migrate --seed
php artisan serve
```

### Frontend

```bash
npm install
npm run dev
```

---

## 📌 Future Improvements

* Payments Integration
* Real‑time Notifications
* Multi‑Language Support
* Dark Mode

---

## 👨‍💻 Author

**Abdullah Younes**
💼 Full‑Stack Developer
📧 Contact: *01205481100*

---

<p align="center">✨ TravelVerse – Explore the world your way ✨</p>
