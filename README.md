# 🤖 AI E-commerce Data Agent

> Transform your e-commerce data analysis with natural language AI

A modern, full-stack web application that enables businesses to query their e-commerce data using natural language. Built with Next.js, TypeScript, and Google Gemini AI.

## ✨ Features

- 🧠 **AI-Powered Queries**: Ask questions in plain English, get SQL results instantly
- 📊 **Smart Visualizations**: Automatic chart selection based on data types
- ⚡ **Real-time Streaming**: Live typing effects and progressive data loading
- 🎨 **Modern UI**: Dark-themed interface with shadcn/ui components
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile
- 🔒 **Type-Safe**: Full TypeScript implementation with robust error handling

## 🚀 Live Demo

Try these example queries:
- "What is my total sales?"
- "Calculate the RoAS" 
- "Which product had the highest CPC?"

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI**: React + Tailwind CSS + shadcn/ui
- **AI**: Google Gemini 1.5 Flash
- **Database**: SQLite with better-sqlite3
- **Charts**: Recharts with custom components

## 📊 Data Sources

The agent analyzes three key datasets:
- **Product Eligibility**: Advertising eligibility and status tracking
- **Ad Sales Metrics**: Campaign performance, spend, and conversion data  
- **Total Sales Metrics**: Overall revenue and unit sales tracking

## 🎯 Key Features

### AI-Powered Natural Language Processing
- Converts business questions to SQL automatically
- Understands e-commerce terminology and metrics
- Handles complex multi-table queries

### Intelligent Visualizations
- **Radial Gauges**: For performance metrics (RoAS, conversion rates)
- **Number Cards**: For currency values and counts
- **Data Tables**: For detailed breakdowns
- **Bar Charts**: For comparative analysis

### Modern User Experience
- Real-time streaming responses
- Chat-based interface with query history
- Suggested questions for quick exploration
- Mobile-responsive design

## 🔧 Architecture

Built on a modern, scalable architecture:
- **Frontend**: React components with TypeScript
- **API Layer**: Next.js API routes for AI communication
- **AI Service**: Google Gemini for text-to-SQL conversion
- **Database**: SQLite for local data storage
- **Visualization**: Recharts with custom metric detection