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

# Environment Variables
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=name
DB_PASSWORD=pass
DB_DATABASE=roduddb

SESSION_DOMAIN=192.168.1.9
SANCTUM_STATEFUL_DOMAINS=192.168.1.9

(I used Gmail)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=mail
MAIL_PASSWORD=pass
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=mail
MAIL_FROM_NAME="Truck Ordering App"

# Access Admin Panel: url/admin/login (http://127.0.0.1:8000/admin/login)

#### Front-end (React Native)

# Navigate to mobile directory
cd ordertrackingapp

# Install dependencies
npm install

# Start Expo
npx expo start
or
npx expo run:android (not tested on iOs)


#### Screenshots

#Admin Panel

![image](https://github.com/user-attachments/assets/59d0c5ac-9a4d-4377-89e4-8a870eb04857)

#Mobile App

![image](https://github.com/user-attachments/assets/8231ff0f-510d-4c61-887a-b558482c8777)









