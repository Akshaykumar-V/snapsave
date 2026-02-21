# 💰 SnapSave

**AI-powered expense analyzer for PhonePe UPI users**

Know where your money actually goes. Upload your PhonePe statement PDF, get instant spending insights — 100% private, runs entirely in your browser.

## Features

- 📊 **Dashboard** — Total spent/received, category breakdown pie chart, daily spending bar chart, AI money-saving tips
- 🔍 **Insights** — Top merchants table, month-over-month comparison, repeated expenses, time-of-day heatmap, potential savings calculator
- 🎯 **Goals** — Monthly savings goal tracker, per-category budget progress, achievements/badges
- 🔒 **Privacy-first** — PDF parsed locally in the browser with PDF.js; no data ever leaves your device
- 📱 **Responsive** — Mobile bottom nav + desktop top nav

## Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** for styling
- **Recharts** for charts (pie, bar)
- **React Router v6** for navigation
- **PDF.js (pdfjs-dist)** for in-browser PDF parsing
- **LocalStorage** for session persistence

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── charts/          # SpendingPieChart, DailyBarChart, TimeHeatmap, BudgetProgress
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── StatCard.jsx
│   ├── Badge.jsx
│   ├── ProgressBar.jsx
│   ├── AlertItem.jsx
│   ├── Navbar.jsx
│   └── UploadZone.jsx
├── data/
│   └── sampleData.js    # Sample Feb 2025 transactions + category colours
├── hooks/
│   └── useTransactions.js
├── pages/
│   ├── LandingPage.jsx
│   ├── UploadPage.jsx
│   ├── DashboardPage.jsx
│   ├── InsightsPage.jsx
│   └── GoalsPage.jsx
└── utils/
    ├── analytics.js     # Totals, category breakdown, daily/merchant/time analytics
    ├── categorize.js    # Keyword-based auto-categorisation
    ├── pdfParser.js     # PDF.js PhonePe statement parser
    └── storage.js       # LocalStorage helpers
```

## Uploading a PhonePe Statement

1. Open the PhonePe app → tap your profile icon (top right)
2. Go to **Transaction History** → select a date range (up to 6 months)
3. Tap **Download Statement** → choose PDF → save to device
4. Upload the PDF on the Upload page

If you don't have a PDF, click **"Try with sample data"** to explore with demo transactions.

## Deployment

The project includes a `vercel.json` for single-page-app rewrites. Deploy with:

```bash
npx vercel
```

## License

MIT
