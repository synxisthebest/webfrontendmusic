# 🎵 Aether - Glassmorphic Web Music Player (GitHub Pages + Render Edition)

A modern, visually stunning Web Music Player featuring a **Glassmorphism** aesthetic, Tailwind CSS styling, HTML5 Web Audio API live spectrum visualizer, designed for instant deployment on **GitHub Pages** connected to a **Render** Python backend (`yt-dlp` streaming proxy).

---

## ✨ Features

- **Glassmorphic Aesthetic:** Translucent frosted glass containers (`backdrop-filter blur`), dark midnight gradient background, ambient glowing neon pastel accents (purple, pink, cyan).
- **GitHub Pages Ready:** Clean single-file web application (`index.html`) ready to host on GitHub Pages or static hosts.
- **Render Cloud Proxy Integration:** Stream audio directly from YouTube using your Render backend endpoint:
  ```
  https://ten-backend-cua-ban.onrender.com/play-audio?url=[ENCODED_YOUTUBE_URL]
  ```
- **In-App Backend Settings:** Built-in modal to configure/update your live Render URL on the fly (saved to browser `localStorage`).
- **Real-time Web Audio Visualizer:** Dynamic HTML5 Canvas audio spectrum analyzer featuring 3 visual modes (Bars, Oscilloscope Wave, Circular Spectrum).
- **Full Player Controls:** Play/Pause, Scrubber progress bar seeking with elapsed & total duration, Volume control slider, Mute toggle, Shuffle, Repeat, Vinyl spinning animation.

---

## 🚀 Deployment Instructions

### 1. Host Frontend on GitHub Pages
1. Push `index.html` to your GitHub repository.
2. Go to **Settings > Pages** in your GitHub repository.
3. Select `main` branch and `/ (root)` folder, then click **Save**.
4. Your music player is live at `https://your-username.github.io/your-repo-name`!

---

### 2. Deploy Python Streaming Backend to Render
1. Create a free account on [Render.com](https://render.com).
2. Click **New +** -> **Web Service** and connect this GitHub repository.
3. Use the following settings:
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`
4. Deploy! Render will give you your backend URL, for example:
   `https://my-music-proxy.onrender.com`

---

## ⚙️ Connecting Frontend to Render Backend

1. Open your live music player page on GitHub Pages.
2. Click the **Cloud Settings** icon (<i class="fa-solid fa-cloud"></i> / <i class="fa-solid fa-gear"></i>) in the sidebar or top bar.
3. Paste your actual Render backend URL (e.g. `https://my-music-proxy.onrender.com`) and click **Save & Test Connection**.
4. Paste any YouTube URL into the search bar and enjoy glassmorphic cloud audio streaming!
