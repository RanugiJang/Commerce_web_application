# 🛒 Commerce Web Application

A full-stack commerce web application with authentication, role-based authorization, and item management.

Built using:

- ⚙️ ASP.NET Core Web API (Backend)
- ⚛️ React + TypeScript (Frontend)
- 🎨 Tailwind CSS (UI Styling)
- 🗄 MySQL Database
- 🔐 JWT Authentication
- 🌐 Google OAuth2 Login

---

# 📌 Features

## 🔑 Authentication
- Email & Password login (Admin & User)
- Google OAuth2 login (User)
- JWT token authentication
- Role-based access control

## 👨‍💼 Admin Panel
- Add items
- Update items
- Delete items
- View all items

## 👤 User Panel
- View available items
- View price and stock status

# ⚙️ Backend Setup (ASP.NET Core)

## 1️⃣ Requirements

- .NET 8+
- MySQL Server

---

## 2️⃣ Configure `appsettings.json`

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "server=localhost;database=commerce_db;user=root;password=YOUR_PASSWORD"
  },
  "Jwt": {
    "Key": "your_super_secret_key",
    "Issuer": "CommerceApi",
    "Audience": "CommerceClient",
    "ExpiresMinutes": "60"
  },
  "Google": {
    "ClientId": "YOUR_GOOGLE_CLIENT_ID"
  }
}


