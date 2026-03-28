# Admin Panel — Leaderboards, Raffles, Wheel Management

## 1. Project Overview

This project is an admin panel for managing gamification features such as Leaderboards, Raffles, and Spin-to-Win Wheels.  
It allows administrators to create, edit, delete, and view entities, along with managing prizes and configurations through a structured UI.

---

## 2. Architecture

The project follows a **feature-based modular architecture**, where each domain (leaderboard, raffle, wheel) is isolated into its own module.

### Key principles:
- Separation of concerns (UI / API / state / validation)
- Reusable components
- Scalable structure for adding new features

### Folder Structure

src/
app/
layout/
providers/
router/

shared/
api/
lib/
ui/
constants/

features/
leaderboard/
raffle/
wheel/


### Why this architecture?

- Easy to scale (add new features without touching others)
- Keeps business logic close to feature
- Reduces large monolithic files

---

## 3. Tech Stack

| Technology | Version | Purpose |
|----------|--------|--------|
| React | 18+ | UI library |
| TypeScript | 5+ | Type safety |
| Vite | 5+ | Build tool |
| Material UI (MUI) | 5+ | UI components |
| React Hook Form | 7+ | Form state management |
| Zod | 3+ | Schema validation |
| React Query (@tanstack) | 5+ | Server state management |
| React Router | 6+ | Routing |
| JSON Server | latest | Mock API |

---

1. Install dependencies

npm install

2. Start the development client

npm run dev

3. Start the mock API server (in a new terminal)

npm run server

----

API Reference

GET    /leaderboards
GET    /leaderboards/:id
POST   /leaderboards
PUT    /leaderboards/:id
DELETE /leaderboards/:id

GET    /leaderboardsPrizes
POST   /leaderboardsPrizes
DELETE /leaderboards/:id

GET    /raffles
GET    /raffles/:id
POST   /raffles
PUT    /raffles/:id
DELETE /raffles/:id

GET    /rafflePrizes
POST   /rafflePrizes
DELETE /rafflePrizes/:id

GET    /rafflePrizes
POST   /rafflePrizes
DELETE /rafflePrizes/:id

GET    /wheels
GET    /wheels/:id
POST   /wheels
PUT    /wheels/:id
DELETE /wheels/:id


🔹 1. Feature-based არქიტექტურა

პროექტში არჩეულია feature-based სტრუქტურა (leaderboard, raffle, wheel), ნაცვლად layer-based (components, hooks, etc.).

ეს გადაწყვეტილება მივიღე იმიტომ, რომ:
თითოეული ფუნქციონალი არის იზოლირებული თავის მოდულში
კოდის გაფართოება მარტივია (ახალი feature დამატება არ არღვევს არსებულს)
მცირდება დამოკიდებულებები სხვადასხვა მოდულებს შორის
თავიდან ავიცილეთ დიდი და რთულად სამართავი ფაილები

მაგალითად, wheel feature-ში ერთად არის:

API
hooks
form logic
UI

რაც მნიშვნელოვნად აუმჯობესებს კოდის ორგანიზებას.