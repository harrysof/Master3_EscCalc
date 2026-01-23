# 🎓 Master 3 Grade Calculator

A premium, high-performance grade calculator built for university students. Calculate your semester average with style and precision.

![Static Badge](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Static Badge](https://img.shields.io/badge/Tailwind_CSS-3.4-blue?style=for-the-badge&logo=tailwind-css)
![Static Badge](https://img.shields.io/badge/Framer_Motion-11-purple?style=for-the-badge&logo=framer)

## ✨ Features

- **Dynamic Branch Selection**: Support for multiple academic branches (ELN, AUTO, INFO, etc.) with custom coefficient data.
- **"What-If" Simulation**: Enter your target average and see exactly what grades you need in your remaining modules.
- **Real-time Calculations**: Instant average updates as you type your grades.
- **Premium UI/UX**:
  - Responsive layout optimized for both Desktop and Mobile.
  - Interactive background with a 3D grid and mouse-tracking orbs (Desktop).
  - Smooth animations powered by Framer Motion.
  - Modern "Glassmorphism" aesthetic (Desktop).
- **Mobile Performance Optimized**:
  - Automatically disables heavy 3D effects and blur filters on mobile devices for a snappy, buttery-smooth experience.
  - Reordered layout for better accessibility on smaller screens.

## 🚀 Recent Optimizations

- **Static Title for Mobile**: Improved initial load performance by disabling infinite liquid animations on small screens.
- **Deep Performance Optimization**: 
  - Disabled the 3D grid background on mobile.
  - Switched from heavy `backdrop-blur` to solid colors on mobile.
  - Removed expensive text glowing effects during scrolling on mobile.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Hooks (useState, useMemo)
- **Deployment**: [Vercel](https://vercel.com/)

## 📦 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/harrysof/Master3_EscCalc.git
    cd Master3_EscCalc
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```

## 📄 License

This project is open-source. Created with ❤️ by Sofiane Belkacem Nacer.
