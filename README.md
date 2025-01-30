# 🚀 Rodud_Shipping_Tracker

## 📌 Overview
This project is a **full-stack** application that consists of:
1. **React Native App** - A mobile application built with React Native.
2. **Laravel Backend** - A RESTful API backend powered by Laravel.
3. **Laravel Admin Panel** - A web-based admin dashboard for managing the application.

---

## 🏗️ Tech Stack
- **Frontend (Mobile)**: React Native, Expo
- **Backend**: Laravel, Laravel Passport (for authentication)
- **Admin Panel**: Laravel Blade, TailwindCSS
- **Database**: MySQL 
- **Authentication**: JWT (via Laravel Passport)
- **Storage**: Local storage

---

## 🔧 Installation & Setup

### **1️⃣ Backend (Laravel API & Admin Panel)**

#### 📌 Prerequisites:
- PHP `^8.x`
- Composer
- MySQL / PostgreSQL
- Node.js & NPM (for frontend assets)
- Laravel `^10.x`

#### 🚀 Setup
```sh
# Clone the repo
git clone https://github.com/saad189/Rodud.git

# Navigate to the backend
cd ordertrackingbackend

# Install dependencies
composer install

# Copy the environment file
cp .env.example .env

# Configure database settings in .env
# Then run migrations
php artisan migrate

# Generate app key
php artisan key:generate

# Install Laravel Passport
php artisan passport:install

# Start the Laravel server
php artisan serve
