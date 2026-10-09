# Tayyaba Saddique — Front-End Web Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

A high-performance personal portfolio website designed and built for **Tayyaba Saddique**, a Front-End Web Developer based in Nowshera, Pakistan. Built using modern web technologies, smooth Framer Motion micro-interactions, dark/light theme switching, and an elegant gold-accented glassmorphism aesthetic.

---

## ✨ Features

- **🎨 Luxury & Modern Design**: Dark and Light mode themes powered by `next-themes` with gold glow accents and glassmorphism cards.
- **⚡ Fluid Animations**: Smooth scroll reveals, timeline animations, and interactive hover states powered by Framer Motion.
- **🖱️ Custom Interactive Cursor**: Spring-interpolated pointer tracking with smart element hovering on desktop devices.
- **💼 Interactive Projects Showcase**: Filterable project gallery (Web Apps, E-Commerce, Landing Pages, Dashboards).
- **🛠️ Tech Arsenal & Skills**: Categorized technical skills, tools, and soft skills with animated counters and marquee ticker.
- **📜 Professional Experience & Education**: Centered alternating timeline showcasing academic background and work history.
- **📄 Resume Viewer & Download**: Integrated 1-click CV download and direct viewing link for [`resume.pdf`](public/resume.pdf).
- **📬 Contact & Social Connectivity**: Working inquiry form, direct WhatsApp, Email, Google Maps location, and social share buttons with clipboard integration.
- **📱 Fully Responsive**: Pixel-perfect layout tailored for mobile, tablet, and desktop screens.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) & Radix UI Toast
- **Database ORM**: [Prisma](https://www.prisma.io/) (SQLite ready)

---

## 📁 Project Structure

```text
Tayyaba_Portfolio/
├── prisma/
│   └── schema.prisma           # Prisma schema definition
├── public/
│   ├── logo.svg                # Brand vector logo
│   ├── profile.jpg             # Profile picture
│   ├── resume.pdf              # Resume / CV document
│   └── robots.txt              # Search engine crawler configuration
├── src/
│   ├── app/
│   │   ├── api/route.ts        # Health check API route
│   │   ├── globals.css         # Tailwind v4 styles, custom animations & theme variables
│   │   ├── layout.tsx          # Root layout with fonts, theme & toast providers
│   │   └── page.tsx            # Main single-page portfolio layout
│   ├── components/
│   │   ├── portfolio/          # Feature sections (Hero, About, Projects, Skills, Contact, etc.)
│   │   └── ui/                 # Reusable UI primitives (buttons, dialogs, toasts, etc.)
│   ├── hooks/                  # Custom React hooks (use-toast, use-mobile)
│   └── lib/                    # Utility functions and Prisma client instance
├── .env.example                # Sample environment variables
├── eslint.config.mjs           # ESLint 9 configuration with Next.js plugin
├── next.config.ts              # Next.js build configuration (standalone enabled)
├── package.json                # Project dependencies and cross-platform npm scripts
└── tsconfig.json               # TypeScript compiler configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18.18+ or 20+) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CodewithAz01/Tayyaba.git
   cd Tayyaba
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (optional, for database queries):
   ```bash
   cp .env.example .env
   ```

### Development

Run the local development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

### Production Build

Create an optimized production build:
```bash
npm run build
```

Run the production server:
```bash
npm run start
```

Or run the standalone server:
```bash
npm run start:standalone
```

### Code Quality & Linting

Run ESLint:
```bash
npm run lint
```

Run TypeScript verification:
```bash
npx tsc --noEmit
```

---

## 👤 Developer Profile

- **Name**: Tayyaba Saddique
- **Role**: Front-End Web Developer
- **Location**: Nowshera, Khyber Pakhtunkhwa, Pakistan
- **Education**: BS in Computer Science, Northern University Nowshera
- **Email**: [tayyaba.saddique.cs@gmail.com](mailto:tayyaba.saddique.cs@gmail.com)
- **WhatsApp**: [+92 332 1952862](https://wa.me/923321952862)

---

## 📄 License

This project is private and created for Tayyaba Saddique's personal portfolio.
