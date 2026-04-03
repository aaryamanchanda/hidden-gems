# 🗺️ Hidden Gems Local Guide
*Discover the real world, verified by locals.*

## 🌟 Overview
Hidden Gems Local Guide is a community-driven travel platform designed to help users bypass crowded tourist traps. It empowers locals to share authentic, lesser-known spots while travelers can explore these unique locations on an interactive map.

## ⚠️ Problem
Modern travel platforms are saturated with paid listings, sponsored content, and highly commercialized "hotspots." Authentic, local-loved places — from secret viewpoints to tucked-away cafes — often lack the marketing budget to be discovered, resulting in travelers having generic, one-size-fits-all experiences.
## 💡 Solution
A platform built purely around organic discovery. Hidden Gems Local Guide provides a zero-sponsored map experience where every location is submitted by a local. To maintain quality and combat spam, the platform uses an intelligent AI validation layer to detect misleading content before it reaches the community.

## ✨ Features
- **Interactive Map:** Pan, zoom, and visually discover hidden locations.
- **Drop-A-Pin Submissions:** Add your own discoveries by intuitively clicking right on the map.
- **AI Verification:** Real-time fake-detection layer that automatically scans submissions for authenticity.
- **Modern UI:** Sleek, immersive design featuring dark mode, glassmorphism, and bento-box layouts.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, TypeScript, Tailwind CSS
- **Map**: Leaflet
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Authentication**: Firebase

## ⚙️ How It Works
1. **Browse:** Users interact with a Leaflet map to discover verified spots near them.
2. **Submit:** Locals add a new location via an intuitive submission form.
3. **Verify:** The FastAPI backend uses an AI system to analyze the submission for authenticity and missing context.
4. **Publish:** Once verified, the gem is stored in MongoDB and dynamically rendered on the map.

## 🏗️ System Architecture
```text
[ Client (React/Vite) ] <---> [ Authentication (Firebase) ]
        |
        v
[ Backend (FastAPI) ] ------> [ AI Verification Layer ]
        |
        v
[ Database (MongoDB) ]
```

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/hidden-gems.git
   cd hidden-gems
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

## 🔭 Future Scope
- **User Profiles & Leaderboards:** Gamifying contributions to reward the best local guides.
- **Advanced Filtering:** Sorting gems by weather conditions or time of day.
- **Offline Maps:** Downloadable regions for traveling without internet access.

## 🤝 Team
- **Backend** [Aarya Manchanda]
- **Frontend** [Pratul Kashyap]
- **AI Integration** [Saumya Agarwal]
- **Database & APIs** [Manthan Bobade]
