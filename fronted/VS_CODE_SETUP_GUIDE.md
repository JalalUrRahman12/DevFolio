# DevFolio - VS Code Setup & Running Instructions

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **VS Code** - [Download here](https://code.visualstudio.com/)
- **Git** (optional but recommended)

### Step 1: Open Project in VS Code

1. **Open VS Code**
2. **File → Open Folder**
3. Navigate to and select the `devfolio-frontend` folder
4. Click **"Select Folder"**

### Step 2: Install Dependencies

1. **Open Terminal in VS Code:**
   - Press `Ctrl + `` (backtick) or
   - Go to **Terminal → New Terminal**

2. **Install dependencies:**
   ```bash
   npm install
   ```
   OR if you prefer pnpm:
   ```bash
   pnpm install
   ```

### Step 3: Start Development Server

Run the following command in the terminal:
```bash
npm run dev
```
OR with pnpm:
```bash
pnpm run dev
```

The application will start and you'll see output like:
```
VITE v6.3.5  ready in 493 ms
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.100:5173/
```

### Step 4: View Your Application

1. **Open your browser**
2. **Navigate to:** `http://localhost:5173/`
3. **Your DevFolio application is now running!**

## 🛠️ Development Tips

### Recommended VS Code Extensions
1. **ES7+ React/Redux/React-Native snippets**
2. **Prettier - Code formatter**
3. **Auto Rename Tag**
4. **Bracket Pair Colorizer**
5. **GitLens**

### Project Structure
```
devfolio-frontend/
├── src/
│   ├── assets/          # Images and static files
│   ├── components/      # Reusable UI components
│   │   └── ui/         # shadcn/ui components
│   ├── pages/          # Page components
│   ├── App.jsx         # Main application component
│   ├── App.css         # Global styles
│   └── main.jsx        # Entry point
├── public/             # Public assets
├── index.html          # HTML template
└── package.json        # Dependencies and scripts
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Making Changes
1. **Edit files** in the `src/` directory
2. **Save changes** - the browser will automatically reload
3. **View updates** instantly in your browser

## 🎨 Key Features Implemented

### ✅ Modern Design
- **Gradient backgrounds** and modern color scheme
- **Smooth animations** using Framer Motion
- **Responsive design** for all devices
- **Professional typography** and spacing

### ✅ Interactive Components
- **Hover effects** on cards and buttons
- **Animated statistics** counters
- **Gradient text** effects
- **Glass morphism** navigation bar

### ✅ Project Showcase
- **Featured projects** with real images
- **Technology badges** for each project
- **Rating system** with star displays
- **Professional project cards** with hover animations

### ✅ User Authentication UI
- **Modern login page** with social login options
- **Registration form** with validation styling
- **Password visibility toggle**
- **Responsive form design**

## 🚨 Troubleshooting

### Port Already in Use
If you see "Port 5173 is in use", the system will automatically use the next available port (5174, 5175, etc.)

### Dependencies Issues
If you encounter dependency issues:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Browser Not Opening
Manually open your browser and go to the URL shown in the terminal.

## 📱 Testing on Mobile
The application is fully responsive. To test on mobile:
1. **Find your Network URL** in the terminal output
2. **Open that URL** on your mobile device (must be on same WiFi)

## 🎯 For Your Evaluation

### What to Highlight:
1. **Modern, professional design** that stands out
2. **Smooth animations** and interactive elements
3. **Responsive layout** works on all screen sizes
4. **Real project showcase** with actual images
5. **Complete user flow** (home → login → register)
6. **Professional branding** and consistent styling

### Demo Flow:
1. **Start with homepage** - show hero section and stats
2. **Scroll through features** - highlight the 4 key features
3. **Show project gallery** - demonstrate hover effects
4. **Navigate to login/register** - show form designs
5. **Emphasize responsive design** - resize browser window

## 🔥 Quick Demo Script

"This is DevFolio, a modern student project repository and talent hiring platform. Notice the professional gradient design, smooth animations, and clean typography. The homepage showcases key statistics and features with interactive hover effects. Our project gallery displays real student work with technology badges and ratings. The authentication system features modern form design with social login options. Everything is fully responsive and ready for production deployment."

---

**🎉 Your project is now ready for evaluation! Good luck!**

