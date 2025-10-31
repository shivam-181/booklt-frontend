✈️ Booklt: Experiences & Slots Booking Application

This project is a complete end-to-end full-stack web application developed to fulfill the requirements of the Internshala Fullstack Development assignment. It simulates a travel booking platform where users can browse experiences, select available time slots, and complete a secure booking.

🎯 Technical & Functional Highlights

Category

Requirement

Solution Implemented

Frontend

Framework, Styling

Next.js (App Router), TypeScript, TailwindCSS

User Flow

Home → Details → Checkout → Result

Fully implemented with responsive UI.

Data Handling

Dynamic Slot Management

Backend decrements available spots in MongoDB upon successful booking. Prevents double-booking.

APIs

Promo Validation

POST /api/promo/validate with hardcoded logic (e.g., SAVE10).

State

Clean Implementation

Uses useSearchParams for data passing and useState/useMemo for client-side calculations (price, discount).

🛠️ Technology Stack

Component

Technology

Details

Frontend

Next.js 14+ (App Router) & TypeScript

Hosted on Vercel.

Styling

TailwindCSS 3.x & Custom Design Tokens

Used for a responsive, mobile-first design matching the Figma spec.

Backend

Node.js & Express

Hosted on Render.

Database

MongoDB (Atlas) & Mongoose

Used for durable storage of Experience, Slots, and Booking records.

⚙️ How to Run Locally

This project is split into two folders: booklt-backend and booklt-frontend. Both must be running concurrently.

Prerequisites

Node.js (LTS) installed.

MongoDB Atlas: A live connection string is required.

1. Backend Setup (booklt-backend folder)

Step

Command

Description

1. Install

npm install

Installs dependencies (Express, Mongoose, dotenv).

2. Environment

Create a .env file

Add PORT=8000 and MONGO_URI=<YOUR_ATLAS_CONNECTION_STRING>

3. Seed Data

npm run seed:import

Crucial: Loads sample experiences and slots into the database.

4. Start API

npm run dev

Starts the server on http://localhost:8000 (auto-restarts).

2. Frontend Setup (booklt-frontend folder)

Step

Command

Description

1. Install

npm install

Installs dependencies (Next.js, Tailwind, etc.).

2. Environment

Create a .env.local file

Add NEXT_PUBLIC_API_URL=http://localhost:8000/api

3. Start App

npm run dev

Starts the Next.js development server on http://localhost:3000.

🌐 Live Application Links

Component

Platform

Status

URL

Frontend App

Vercel

LIVE

| **Frontend App** | **Vercel** | LIVE | [https://booklt-fresh-deploy.vercel.app/](https://booklt-fresh-deploy.vercel.app/) |
Backend API

Render

LIVE

| **Backend API** | **Render** | LIVE | [https://booklt-api.onrender.com](https://booklt-api.onrender.com) |
Source Code

GitHub Repository

Public

| **Source Code** | **GitHub Repository** | Public | [booklt-frontend GitHub Repo](https://github.com/shivam-181/booklt-frontend) |
