# Gathering Food & Drink Tracker 🍹

A custom web app to track, organize, and claim food and drinks for upcoming gatherings.

## Features
- **Dashboard:** Sorted list of upcoming gatherings with completion progress bars.
- **Gathering Details:** Add Food or Drink requirements and allow participants to "claim" them.
- **Offline Persistence:** Uses browser 'localStorage', making it perfectly capable of functioning without a server. 
- **Premium Design:** Curated dark modern theme with glassmorphism components.

---

## 🚀 Deployment Guide

Since the application uses `localStorage` to save its data, it operates completely within the client browser. You do not need to deploy a complex backend database. 

### Method 1: Deploy to Vercel (Recommended, Easiest)
Vercel provides free, zero-config deployments for Vite React apps.
1. Create a GitHub repository and push this local project to it.
2. Go to [Vercel](https://vercel.com/) and sign in with GitHub.
3. Click **"Add New Project"** and import the repository.
4. Leave all settings as default (Framework Preset: Vite) and click **Deploy**.
5. Once finished, you will get a live `.vercel.app` URL to share with your friends!

### Method 2: Deploy to GitHub Pages
If you prefer keeping everything on GitHub natively:
1. In `vite.config.js`, add `base: '/your-repo-name/'`.
2. Run `npm run build` in your terminal to generate the `dist` folder.
3. You can set up a GitHub Action to deploy the `dist` folder to GitHub pages automatically or push the `gh-pages` branch directly via the `gh-pages` npm package.

> **Warning**
> Because it uses `localStorage`, if you deploy it on Vercel or GitHub Pages and share the URL with your friends, **everyone will have their own independent, private list of gatherings on their devices**. Changes Alice makes on her phone won't sync to Bob's phone. If your goal was to have a centralized live list that syncs instantly across all friends' phones, we would need to integrate a database like **Firebase** or **Supabase**.
