# 🏋️‍♂️ MERN FitVerse

<div align="center">

<img src="frontend/public/fit-verse-logo-no-bg.png" alt="MERN FitVerse Logo" width="250">

**A Modern Full-Stack Social Fitness Platform with Microservices Architecture**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/xjohnfit/fit-verse)
[![Version](https://img.shields.io/badge/version-2.5.0-blue)](https://github.com/xjohnfit/fit-verse)
[![License](https://img.shields.io/badge/license-ISC-orange)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-enabled-blue)](https://hub.docker.com/r/xjohnfit)
[![Kubernetes](https://img.shields.io/badge/kubernetes-ready-green)](kubernetes/)
[![CI/CD](https://github.com/xjohnfit/fit-verse/actions/workflows/deploy.yml/badge.svg)](https://github.com/xjohnfit/fit-verse/actions/workflows/deploy.yml)

**[Live Demo](https://fitverse.codewithxjohn.com) • [API Documentation](#-api-documentation) • [Report Bug](https://github.com/xjohnfit/fit-verse/issues) • [Request Feature](https://github.com/xjohnfit/fit-verse/issues)**

</div>

---

## 📋 Table of Contents

- [🚀 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🏗️ Architecture](#️-architecture)
- [🛠 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚡ Quick Start](#-quick-start)
- [🐳 Docker Deployment](#-docker-deployment)
- [☸️ Kubernetes Deployment](#️-kubernetes-deployment)
- [🔧 Development Workflow](#-development-workflow)
- [🧪 Testing](#-testing)
- [📊 CI/CD Pipeline](#-cicd-pipeline)
- [🔒 Security](#-security)
- [📡 API Documentation](#-api-documentation)
- [🤝 Contributing](#-contributing)
- [🚀 Roadmap](#-roadmap)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

---

## 🚀 Overview

**MERN FitVerse** is a production-ready, enterprise-grade social fitness platform that combines social networking with comprehensive fitness and nutrition tracking. Built with modern microservices architecture, it enables independent deployment and scaling of frontend and backend services while maintaining seamless integration.

### 🎯 Mission

To create a vibrant, inclusive fitness community where users can share their journey, motivate each other, and achieve their health and wellness goals through social interaction, comprehensive tracking tools, and personalized experiences.

### 🌟 What Makes FitVerse Different

- **🏗️ Microservices Architecture**: Independently deployable frontend and backend services
- **🔐 Enterprise Security**: JWT authentication, bcrypt hashing, HTTP-only cookies, CORS protection
- **👥 Social-First Design**: Built-in follow system, real-time feed, instant notifications
- **🥗 Advanced Nutrition**: Integration with FatSecret API (500,000+ foods), custom meal categories
- **🏋️ Comprehensive Fitness**: Exercise library, workout logging, progress tracking
- **📊 Data-Driven Insights**: Visual analytics with interactive charts and historical data
- **🎨 Modern UX**: React 19, Tailwind CSS 4, Radix UI, dark/light themes
- **📱 Responsive Design**: Mobile-first approach optimized for all devices
- **☁️ Cloud-Native**: Docker, Kubernetes, automated CI/CD with GitHub Actions
- **🔍 Quality Assurance**: Trivy scanning for vulnerabilities, secrets and misconfigurations on every push

---

## ✨ Key Features

### 🔐 Authentication & Security

- **Secure Authentication**: JWT-based auth with bcrypt password hashing (10 salt rounds)
- **Session Management**: HTTP-only cookies prevent XSS attacks
- **User Validation**: Email uniqueness, username availability, password strength requirements
- **Protected Routes**: Client-side guards and server-side middleware
- **Role-Based Access**: Admin middleware for privileged operations

### 👥 Social Features

- **User Profiles**: 
  - Cloudinary-powered profile photos
  - Height, weight preferences (kg/lbs conversion)
  - Fitness goals and bio
  - Follower/following statistics
  
- **Follow System**: 
  - Follow/unfollow functionality
  - Follower and following lists with pagination
  - Real-time follow notifications
  
- **User Discovery**: 
  - Suggested users algorithm
  - Search functionality
  - Profile viewing and statistics

### 🛡️ Safety & Moderation

- **Block System**: 
  - Block/unblock users
  - Blocked users list management
  - Automatic unfollowing on block
  - Prevents interaction with blocked users
  - Blocked users can't see your content
  
- **Report System**: 
  - Report users for inappropriate behavior
  - Report posts/content for violations
  - Multiple report reasons (harassment, spam, inappropriate content)
  - Report status tracking (pending, reviewed, resolved)
  - Admin dashboard for report management
  - Duplicate report prevention

### 📱 Social Feed & Interaction

- **Content Sharing**: 
  - Create posts with text and images (Cloudinary integration)
  - Image optimization and CDN delivery
  - Post editing and deletion
  
- **Engagement**: 
  - Like/unlike posts with instant feedback
  - Comment system with nested replies
  - Real-time like and comment notifications
  
- **Feed Types**: 
  - Personalized feed (followed users + own posts)
  - Global feed (all public posts)
  - User-specific feeds (profile posts)

### 🔔 Real-Time Notifications

- **Notification Types**: 
  - Follow notifications
  - Post likes
  - Comments on posts
  - New message indicators
  
- **Features**: 
  - Real-time Socket.IO integration
  - Bell icon with unread count badge
  - Notification persistence
  - Batch deletion
  - Auto-refresh on new notifications

### 💬 Real-Time Messaging

- **Socket.IO Implementation**: 
  - Instant message delivery
  - Online/offline user status
  - Typing indicators (planned)
  - Message persistence in MongoDB
  
- **Features**: 
  - One-on-one conversations
  - Image sharing support (Cloudinary)
  - Message caching for instant load (mobile)
  - Pagination on scroll (load older messages)
  - User search and discovery
  - Conversation list with last message preview
  
- **Mobile Optimizations**:
  - **AsyncStorage Caching**: Messages cached locally for 24 hours
  - **Instant Display**: Cached messages appear instantly (0ms vs 200-500ms API)
  - **Smart Loading**: Only fetches from API if no cache exists
  - **Scroll-to-Load**: Older messages load on demand when scrolling up
  - **Optimistic Updates**: Sent messages appear immediately
  - **Auto-scroll**: Keyboard-aware scrolling to latest messages
  - **Real-time Sync**: Socket.io updates cache automatically

### 🥗 Nutrition Tracking

#### Food Database Integration
- **FatSecret API**: Access to 500,000+ verified food items
- **Smart Search**: 
  - Real-time autocomplete (300ms debounce)
  - Minimum 2 characters activation
  - Brand and description details
  
- **Detailed Information**: 
  - Complete nutritional breakdown
  - Multiple serving sizes
  - Adjustable quantities
  - Calories, protein, carbs, fats per serving

#### Meal Tracking
- **Standard Categories**: Breakfast, Lunch, Dinner, Snacks
- **Custom Categories**: 
  - Create up to 3 personalized categories
  - Custom names (max 20 characters)
  - Custom colors for organization
  - Drag-and-drop reordering
  - Delete custom categories
  
- **Daily Logging**: 
  - Add/remove entries per category
  - Calorie and macro totals per meal
  - Daily summaries

#### Nutrition Goals & Analytics
- **Goal Setting**: 
  - Customizable daily calorie targets
  - Macro goals (protein, carbs, fats)
  - Weight goals (gain/lose/maintain)
  
- **Visual Analytics**: 
  - Interactive Recharts visualizations
  - Daily progress bars
  - Weekly trend graphs
  - Macro distribution pie charts
  
- **Historical Data**: 
  - Navigate previous dates
  - View weekly/monthly patterns
  - Compare daily intake

### 🏋️ Workout & Exercise Features

#### Exercise Library
- **Comprehensive Database**: 
  - 50+ pre-loaded exercises
  - Exercise descriptions and instructions
  - Category-based organization (Cardio, Strength, Flexibility)
  - Exercise images (Cloudinary integration)
  
- **Exercise Details**: 
  - Muscle groups targeted
  - Difficulty levels
  - Equipment requirements

#### Workout Logging
- **Workout Creation**: 
  - Create custom workouts
  - Add multiple exercises
  - Track sets, reps, weight
  - Add notes and comments
  
- **Workout History**: 
  - View past workouts
  - Track progress over time
  - Filter by date range
  - Exercise-specific history

#### Workout Templates
- **Template Creation**: 
  - Save frequently used workouts as templates
  - Add exercises with default sets/reps/weight
  - Template naming and descriptions
  - Edit and delete templates
  
- **Template Folders**: 
  - Organize templates into custom folders
  - Create, rename, and delete folders
  - Drag-and-drop reordering
  - Move templates between folders
  - Folder-based organization (e.g., "Chest Day", "Leg Day", "Full Body")
  
- **Quick Start**: 
  - Start workouts from templates with one tap
  - Pre-populated exercises and settings
  - Modify template values during workout
  
- **Template Management**:
  - Freestyle workouts (no template)
  - Template browsing and search
  - Template usage tracking
  - Duplicate templates
  - Template Sharing: Share templates with community (planned)

### 🎨 Modern User Experience

- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Dark/Light Themes**: 
  - System preference detection
  - Manual toggle in header
  - Persistent theme selection
  - Smooth transitions
  
- **Modern UI Components**: 
  - Radix UI primitives for accessibility
  - Custom component library
  - Consistent design system
  
- **Animations**: 
  - Motion library integration
  - Page transitions
  - Micro-interactions
  - Loading states with skeletons
  
- **Toast Notifications**: 
  - Sonner toast system
  - Success/error/info variants
  - Auto-dismiss with customizable duration

### 🛡️ Admin Features

- **Admin Dashboard**: Dedicated admin screen with platform overview
- **User Management**: 
  - Admin middleware protection
  - View all users and statistics
  - User role management
  - Account suspension/activation
  
- **Content Moderation**: 
  - Review user reports
  - Manage reported content
  - Report status updates (pending, reviewed, resolved, rejected)
  - Action tracking on reports
  - Delete inappropriate content
  
- **Report Management**:
  - View all reports with filters
  - Report details with context
  - Report history per user
  - Bulk report actions
  
- **Analytics**: User statistics and platform metrics (planned)

### 📱 Mobile Application (iOS/Android)

#### Native Experience
- **React Native + Expo**: Cross-platform native app with platform-specific optimizations
- **Expo Router**: File-based routing with deep linking support
- **Native Performance**: 60fps animations with Reanimated
- **Push Notifications**: 
  - Real-time message and activity alerts
  - Background and foreground notification handling
  - Expo Server SDK integration
  - Push token management
  - Notification tap handling with deep linking
  - Custom notification sounds (planned)
- **Haptic Feedback**: Touch-responsive interactions

#### Mobile-First Features
- **Optimized Chat**:
  - Local message caching (AsyncStorage) for instant load
  - 80% faster initial load with cache hits
  - Smart pagination - load older messages on scroll
  - 70% reduction in API calls
  - Keyboard-aware auto-scrolling
  - Image sharing with compression
  
- **Social Feed**:
  - Infinite scroll with pull-to-refresh
  - Optimized image loading (Expo Image)
  - Like/comment with optimistic updates
  - Profile viewing and following
  
- **Workout Tracking**:
  - Quick workout logging
  - Template-based workouts
  - Exercise history and progress charts
  - Weight unit conversion (kg/lbs)
  
- **Nutrition Tracking**:
  - Food search with autocomplete
  - Barcode scanning (planned)
  - Daily macro tracking
  - Custom meal categories
  
- **Safety & Moderation**:
  - Block/unblock users
  - View blocked users list
  - Report users and content
  - Account deletion option
  
- **Settings & Preferences**:
  - Profile management
  - Password updates
  - Weight unit preferences (kg/lbs)
  - Help and support
  - Privacy and terms access
  
- **Cross-Platform Sync**:
  - Real-time data sync with Socket.io
  - Redux state management
  - RTK Query for API caching
  - Offline-first architecture (planned)

#### Mobile UI/UX
- **NativeWind**: Tailwind CSS for React Native
- **Adaptive Design**: iOS and Android design patterns
- **Dark Mode**: System-aware theme switching
- **Gesture Support**: Swipe actions and pull-to-refresh
- **Bottom Tab Navigation**: Thumb-friendly navigation
- **Safe Area Handling**: Notch and home indicator support

#### Deployment
- **EAS Build**: Cloud-based builds for iOS and Android
- **TestFlight**: iOS beta testing distribution
- **OTA Updates**: Instant updates without app store review
- **Crash Reporting**: Error tracking and monitoring (planned)

---

## 🏗️ Architecture

### Microservices Architecture

FitVerse uses a modern microservices architecture that separates concerns and enables independent deployment:

```
┌───────────────────────────────────────────────────────────────┐
│                       Load Balancer                           │
│                   (NGINX / K8s Ingress)                       │
└────────────────────────┬──────────────────┬───────────────────┘
                         │                  │
           ┌─────────────▼────────────┐  ┌──▼────────────────┐
           │   Frontend Service       │  │  Backend API      │
           │   (React SPA)            │  │  (Express.js)     │
           │   Port: 5173             │  │  Port: 5000       │
           │   Docker: xjohnfit/      │  │  Docker: xjohnfit/│
           │   fitverse-frontend      │  │  fitverse-backend │
           └─────────────┬────────────┘  └──┬────────────────┘
                         │                  │
                         └────────┬─────────┘
                                  │
           ┌──────────────────────▼──────────────────────────┐
           │              External Services                   │
           ├──────────────────────────────────────────────────┤
           │  • MongoDB Atlas (Database)                      │
           │  • Cloudinary (Image Storage)                    │
           │  • FatSecret API (Nutrition Data)                │
           │  • Socket.IO (Real-time Communication)           │
           └──────────────────────────────────────────────────┘
```

### Service Separation Benefits

1. **Independent Deployment**: 
   - Frontend and backend can be deployed separately
   - Zero-downtime deployments
   - Rollback individual services

2. **Scalability**: 
   - Scale frontend and backend independently
   - Horizontal scaling with Kubernetes
   - Efficient resource allocation

3. **Technology Flexibility**: 
   - Update React version without affecting backend
   - Migrate to different frontend framework
   - Replace backend components independently

4. **Development Workflow**: 
   - Separate CI/CD pipelines
   - Independent testing
   - Parallel team development

---

## 🛠 Tech Stack

### Frontend Technologies

```typescript
React 19.1.1          | Modern React with concurrent features
TypeScript 5.9.3      | Static typing for enhanced DX
Vite 7.1.7            | Lightning-fast build tool and HMR
Tailwind CSS 4.1.16   | Utility-first CSS with JIT
```

### Frontend Libraries

```typescript
// State Management
Redux Toolkit 2.10.1  | State management + RTK Query
React Redux 9.2.0     | React bindings for Redux

// Routing
React Router 7.9.5    | Client-side routing

// UI Components
Radix UI              | Accessible component primitives
Lucide React 0.552.0  | Beautiful icon library
Motion 12.23.24       | Animation library
Recharts 2.15.4       | Data visualization

// Real-time
Socket.IO Client 4.x  | WebSocket communication

// Utilities
Sonner 2.0.7          | Toast notifications
Next Themes 0.4.6     | Theme management
```

### Backend Technologies

```typescript
Node.js 20+           | JavaScript runtime
Express 5.1.0         | Web framework
TypeScript 5.9.3      | Static typing
Mongoose 8.19.2       | MongoDB ODM
Socket.IO 4.x         | Real-time engine
```

### Backend Libraries

```typescript
// Authentication
jsonwebtoken 9.0.2    | JWT generation
bcryptjs 3.0.3        | Password hashing
cookie-parser 1.4.7   | Cookie parsing

// File Upload
cloudinary 2.8.0      | Image management

// Push Notifications
expo-server-sdk 4.0.0 | Expo push notifications

// Development
nodemon 3.1.10        | Auto-restart dev server
concurrently 9.2.1    | Run multiple scripts
jest 30.2.0           | Testing framework
```

### External Services

```typescript
MongoDB Atlas         | Cloud database hosting
Cloudinary            | Image CDN and optimization
FatSecret Platform API| Nutrition database (500k+ foods)
```

### DevOps & Infrastructure

```yaml
Docker                | Containerization
Docker Compose        | Local multi-container orchestration
Kubernetes            | Container orchestration
GitHub Actions        | CI/CD: scan, build, push and deploy on every push to main
Trivy Scanner         | Vulnerability, secret and misconfiguration scanning
```

### Mobile Technologies

```typescript
// Core Framework
React Native 0.81.5   | Native mobile framework
React 19.1.0          | Latest React version
Expo SDK ~54.0.29     | Managed React Native workflow
Expo Router ~6.0.19   | File-based navigation

// UI & Styling
NativeWind 4.x        | Tailwind CSS for React Native
Expo Image ~3.0.11    | Optimized image component
Reanimated ~4.1.1     | 60fps native animations
Expo Linear Gradient ~15.0.8 | Native gradients

// State Management
Redux Toolkit 2.11.0  | Same as web for consistency
RTK Query             | API caching with offline support

// Real-time
Socket.IO Client 4.8.1| WebSocket for live updates

// Native Features
Expo Image Picker ~17.0.10 | Camera & gallery access
Expo Notifications ~0.32.15 | Push notifications (background & foreground)
Expo Haptics ~15.0.8  | Touch feedback
Expo Linking ~8.0.10  | Deep linking
Expo Audio ~1.1.0     | Audio playback
Expo Blur ~15.0.8     | Native blur effects

// Storage
AsyncStorage 2.2.0    | Local data persistence (message cache)

// Navigation
React Navigation 7.x  | Native navigation
Bottom Tabs 7.4.0     | Tab navigation

// Build & Deployment
EAS Build             | Cloud-based native builds
EAS Submit            | App store submission
EAS Update            | OTA updates
```

---

## 📁 Project Structure

```
fit-verse/
├── 📂 backend/                              # Express.js API Service
│   ├── 📂 config/
│   │   ├── cloudinary.ts                    # Cloudinary SDK configuration
│   │   ├── dbConnection.ts                  # MongoDB connection
│   │   └── socket.io.ts                     # Socket.IO server setup
│   │
│   ├── 📂 controllers/
│   │   ├── authController.ts                # Authentication logic
│   │   ├── blockController.ts               # Block/unblock user operations
│   │   ├── customCategoryController.ts      # Custom meal categories
│   │   ├── exerciseController.ts            # Exercise library
│   │   ├── fatSecretController.ts           # FatSecret API proxy
│   │   ├── healthController.ts              # Health checks
│   │   ├── messageController.ts             # Real-time messaging
│   │   ├── notificationController.ts        # Notification management
│   │   ├── nutritionController.ts           # Nutrition CRUD
│   │   ├── postController.ts                # Social feed operations
│   │   ├── reportController.ts              # Report user/content system
│   │   ├── userController.ts                # User management
│   │   ├── workoutController.ts             # Workout logging
│   │   ├── workoutTemplateController.ts     # Workout templates
│   │   └── workoutTemplateFolderController.ts # Template folder organization
│   │
│   ├── 📂 middlewares/
│   │   ├── adminMiddleware.ts               # Admin authorization
│   │   ├── authMiddleware.ts                # JWT verification
│   │   └── errorMiddleware.ts               # Error handling
│   │
│   ├── 📂 models/
│   │   ├── customCategoryModel.ts           # Custom category schema
│   │   ├── exerciseModel.ts                 # Exercise schema
│   │   ├── messageModel.ts                  # Message schema
│   │   ├── notificationModel.ts             # Notification schema
│   │   ├── nutritionModel.ts                # Nutrition entry schema
│   │   ├── postModel.ts                     # Post schema
│   │   ├── reportModel.ts                   # Report schema
│   │   ├── userModel.ts                     # User schema (with blockedUsers)
│   │   ├── workoutModel.ts                  # Workout schema
│   │   ├── workoutTemplateFolderModel.ts    # Template folder schema
│   │   └── workoutTemplateModel.ts          # Template schema
│   │
│   ├── 📂 routes/
│   │   ├── authRoutes.ts                    # Auth endpoints
│   │   ├── blockRoutes.ts                   # Block/unblock endpoints
│   │   ├── customCategoryRoutes.ts          # Category endpoints
│   │   ├── exercisesRoutes.ts               # Exercise endpoints
│   │   ├── fatSecretRoutes.ts               # FatSecret proxy
│   │   ├── healthRoutes.ts                  # Health endpoint
│   │   ├── messageRoutes.ts                 # Message endpoints
│   │   ├── notificationRoutes.ts            # Notification endpoints
│   │   ├── NutritionRoutes.ts               # Nutrition endpoints
│   │   ├── postRoutes.ts                    # Post endpoints
│   │   ├── reportRoutes.ts                  # Report endpoints
│   │   ├── userRoutes.ts                    # User endpoints
│   │   ├── workoutRoutes.ts                 # Workout endpoints
│   │   ├── workoutTemplateFolderRoutes.ts   # Template folder endpoints
│   │   └── workoutTemplateRoutes.ts         # Template endpoints
│   │
│   ├── 📂 utils/
│   │   ├── generateToken.ts                 # JWT helper
│   │   ├── pushNotifications.ts             # Expo push notifications
│   │   └── weightConversion.ts              # Unit conversion
│   │
│   ├── 📂 __tests__/
│   │   └── health.test.ts                   # Jest tests
│   │
│   ├── .dockerignore                        # Docker ignore rules
│   ├── .env.development                     # Dev environment vars
│   ├── .env.production                      # Prod environment vars
│   ├── .env.example                         # Environment template
│   ├── apiLandingScreen.ts                  # API landing page
│   ├── Dockerfile                           # Multi-stage build
│   ├── Dockerfile.dev                       # Dev image with hot reload (Compose)
│   ├── index.ts                             # Express server entry
│   ├── jest.config.js                       # Jest configuration
│   ├── package.json                         # Dependencies
│   └── tsconfig.json                        # TypeScript config
│
├── 📂 frontend/                             # React SPA Service
│   ├── 📂 public/
│   │   ├── app-store.png                    # App Store badge
│   │   ├── fit-verse-logo-no-bg.png         # App logo (transparent)
│   │   ├── fit-verse-logo.png               # App logo
│   │   └── google-play.png                  # Google Play badge
│   │
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── 📂 common/
│   │   │   │   ├── NotificationBell.tsx     # Notification icon
│   │   │   │   ├── PrivateRoute.tsx         # Auth guard
│   │   │   │   ├── ScrollToTop.tsx          # Scroll utility
│   │   │   │   └── ThemeToggle.tsx          # Theme switcher
│   │   │   │
│   │   │   ├── 📂 layout/
│   │   │   │   ├── Footer.tsx               # Site footer
│   │   │   │   └── Header.tsx               # Navigation header
│   │   │   │
│   │   │   ├── 📂 modals/
│   │   │   │   └── AlertModal.tsx           # Alert dialogs
│   │   │   │
│   │   │   └── 📂 ui/                       # Radix UI components
│   │   │       ├── accordion.tsx
│   │   │       ├── animated-testimonials.tsx
│   │   │       ├── avatar.tsx
│   │   │       ├── badge.tsx
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── chart.tsx
│   │   │       ├── dialog.tsx
│   │   │       ├── input.tsx
│   │   │       ├── navigation-menu.tsx
│   │   │       ├── sonner.tsx
│   │   │       ├── tabs.tsx
│   │   │       ├── typewriter-effect.tsx
│   │   │       └── wobble-card.tsx
│   │   │
│   │   ├── 📂 hooks/
│   │   │   └── useSocket.ts                 # Socket.IO hook
│   │   │
│   │   ├── 📂 lib/
│   │   │   ├── cacheBuster.ts               # Image cache busting
│   │   │   ├── calculateAge.ts              # Age calculation
│   │   │   ├── formatDate.ts                # Date formatting
│   │   │   ├── getInitials.ts               # Avatar initials
│   │   │   ├── getPasswordStrength.ts       # Password validation
│   │   │   ├── utils.ts                     # Utility functions
│   │   │   └── weightConversion.ts          # Weight conversion
│   │   │
│   │   ├── 📂 screens/
│   │   │   ├── HomeScreen.tsx               # Landing page
│   │   │   ├── LoginScreen.tsx              # Login form
│   │   │   ├── PrivacyPolicy.tsx            # Privacy policy
│   │   │   ├── RegisterScreen.tsx           # Registration form
│   │   │   ├── TermsOfService.tsx           # Terms of service
│   │   │   │
│   │   │   └── 📂 protected/                # Auth-required screens
│   │   │       ├── 📂 admin/
│   │   │       │   └── AdminScreen.tsx
│   │   │       │
│   │   │       ├── 📂 dashboard/
│   │   │       │   ├── DashboardScreen.tsx
│   │   │       │   ├── components/
│   │   │       │   └── types.ts
│   │   │       │
│   │   │       ├── 📂 messages/
│   │   │       │   ├── MessagesScreen.tsx
│   │   │       │   └── components/
│   │   │       │
│   │   │       ├── 📂 nutrition/
│   │   │       │   ├── NutritionScreen.tsx
│   │   │       │   ├── components/
│   │   │       │   ├── constants.ts
│   │   │       │   └── types.ts
│   │   │       │
│   │   │       ├── 📂 profile/
│   │   │       │   └── (profile screens)
│   │   │       │
│   │   │       ├── 📂 settings/
│   │   │       │   └── (settings screens)
│   │   │       │
│   │   │       └── 📂 workout/
│   │   │           ├── WorkoutScreen.tsx
│   │   │           ├── StartWorkoutScreen.tsx
│   │   │           ├── WorkoutDetailScreen.tsx
│   │   │           ├── components/
│   │   │           └── types.ts
│   │   │
│   │   ├── 📂 slices/
│   │   │   ├── apiSlice.ts                  # RTK Query base
│   │   │   ├── authSlice.ts                 # Auth state
│   │   │   ├── customCategoryApiSlice.ts    # Categories API
│   │   │   ├── exerciseApiSlice.ts          # Exercises API
│   │   │   ├── fatSecretApiSlice.ts         # FatSecret API
│   │   │   ├── messageApiSlice.ts           # Messages API
│   │   │   ├── notificationApiSlice.ts      # Notifications API
│   │   │   ├── nutritionApiSlice.ts         # Nutrition API
│   │   │   ├── postsApiSlice.ts             # Posts API
│   │   │   ├── reportsApiSlice.ts           # Reports API
│   │   │   ├── socketSlice.ts               # Socket state
│   │   │   ├── usersApiSlice.ts             # User API
│   │   │   ├── workoutApiSlice.ts           # Workouts API
│   │   │   ├── workoutTemplateApiSlice.ts   # Templates API
│   │   │   └── workoutTemplateFolderApiSlice.ts # Template folders API
│   │   │
│   │   ├── App.tsx                          # Root component
│   │   ├── index.css                        # Global styles
│   │   ├── main.tsx                         # React entry
│   │   └── store.ts                         # Redux store
│   │
│   ├── .env                                 # Dev environment
│   ├── .env.example                         # Environment template
│   ├── .env.production                      # Prod environment
│   ├── components.json                      # Radix UI config
│   ├── Dockerfile                           # Multi-stage build
│   ├── eslint.config.js                     # ESLint config
│   ├── index.html                           # HTML entry
│   ├── package.json                         # Dependencies
│   ├── tsconfig.app.json                    # App TypeScript config
│   ├── tsconfig.json                        # TypeScript config
│   ├── tsconfig.node.json                   # Node TypeScript config
│   └── vite.config.ts                       # Vite config
│
├── 📂 mobile/                               # React Native + Expo App
│   ├── 📂 android/                          # Android native code
│   │   ├── 📂 app/
│   │   │   └── build.gradle                 # App build config
│   │   ├── build.gradle                     # Project build config
│   │   ├── gradle.properties                # Gradle properties
│   │   ├── gradlew                          # Gradle wrapper (Unix)
│   │   ├── gradlew.bat                      # Gradle wrapper (Windows)
│   │   └── settings.gradle                  # Gradle settings
│   │
│   ├── 📂 app/                              # Expo Router screens
│   │   ├── 📂 (tabs)/                       # Tab navigator group
│   │   │   ├── _layout.tsx                  # Tab layout
│   │   │   ├── chat.tsx                     # Messaging (with caching)
│   │   │   ├── dashboard.tsx                # Dashboard tab
│   │   │   ├── nutrition.tsx                # Nutrition tracker tab
│   │   │   ├── profile.tsx                  # User profile tab
│   │   │   ├── settings.tsx                 # Settings tab
│   │   │   └── workout.tsx                  # Workout tracker tab
│   │   │
│   │   ├── 📂 nutrition/
│   │   │   └── addFoodScreen.tsx            # Add food to meal
│   │   │
│   │   ├── 📂 settings/
│   │   │   ├── blockedUsers.tsx             # Blocked users list
│   │   │   ├── deleteAccount.tsx            # Account deletion
│   │   │   └── helpAndSupport.tsx           # Help & support
│   │   │
│   │   ├── 📂 workout/
│   │   │   ├── BrowseExercisesScreen.tsx    # Exercise library
│   │   │   ├── create-template.tsx          # Create workout template
│   │   │   ├── edit-template/               # Edit template screens
│   │   │   ├── startWorkoutScreen.tsx       # Active workout
│   │   │   └── workoutSummary.tsx           # Workout completion
│   │   │
│   │   ├── _layout.tsx                      # Root navigator
│   │   ├── EULA.tsx                         # End user license agreement
│   │   ├── index.tsx                        # Entry/splash screen
│   │   ├── login.tsx                        # Login screen
│   │   ├── privacyPolicy.tsx                # Privacy policy
│   │   ├── register.tsx                     # Register screen
│   │   └── TermsOfService.tsx               # Terms of service
│   │
│   ├── 📂 assets/                           # Static assets
│   │   ├── 📂 fonts/                        # Custom fonts
│   │   └── 📂 images/                       # App images
│   │
│   ├── 📂 components/                       # React components
│   │   ├── 📂 chat/
│   │   │   ├── ChatHeader.tsx               # Chat screen header
│   │   │   ├── ConversationView.tsx         # Conversation UI
│   │   │   ├── EmptyState.tsx               # Empty chat state
│   │   │   ├── MessageBubble.tsx            # Message bubble
│   │   │   ├── MessageInput.tsx             # Message input field
│   │   │   ├── UserListItem.tsx             # User list item
│   │   │   └── UserListView.tsx             # User list
│   │   │
│   │   ├── 📂 dashboard/
│   │   │   ├── DashboardHeader.tsx          # Dashboard header
│   │   │   ├── NutritionOverview.tsx        # Nutrition summary
│   │   │   ├── RecentWorkouts.tsx           # Recent workout list
│   │   │   ├── SocialStats.tsx              # Social statistics
│   │   │   ├── StatsCard.tsx                # Stats card component
│   │   │   ├── SuggestedUsers.tsx           # User suggestions
│   │   │   ├── WorkoutDetailModal.tsx       # Workout detail modal
│   │   │   └── WorkoutStats.tsx             # Workout statistics
│   │   │
│   │   ├── 📂 layout/
│   │   │   └── SafeScreen.tsx               # Safe area wrapper
│   │   │
│   │   ├── 📂 nutrition/
│   │   │   ├── AddCustomCategoryButton.tsx  # Add category button
│   │   │   ├── AddCustomCategoryModal.tsx   # Category creation modal
│   │   │   ├── AddFoodButton.tsx            # Add food button
│   │   │   ├── CustomCategoryCard.tsx       # Custom category card
│   │   │   ├── DateNavigator.tsx            # Date picker navigation
│   │   │   ├── EmptySearchState.tsx         # Empty search state
│   │   │   ├── FoodDetailsCard.tsx          # Food details display
│   │   │   ├── FoodItem.tsx                 # Food item component
│   │   │   ├── FoodSuggestionsList.tsx      # Food autocomplete
│   │   │   ├── LoadingState.tsx             # Loading indicator
│   │   │   ├── MealCategoryCard.tsx         # Meal category card
│   │   │   ├── MealsSectionHeader.tsx       # Section header
│   │   │   ├── NutritionGoalsCard.tsx       # Daily goals card
│   │   │   ├── NutritionHeader.tsx          # Nutrition screen header
│   │   │   ├── SearchHeader.tsx             # Search bar
│   │   │   └── ServingSizeInput.tsx         # Serving size input
│   │   │
│   │   ├── 📂 onboarding/
│   │   │   └── FeatureCard.tsx              # Onboarding feature card
│   │   │
│   │   ├── 📂 profile/
│   │   │   ├── CreatePostModal.tsx          # Post creation modal
│   │   │   ├── FollowersModal.tsx           # Followers/following list
│   │   │   ├── index.ts                     # Profile exports
│   │   │   ├── NotificationBell.tsx         # Notification icon
│   │   │   ├── OptionMenuModal.tsx          # Profile option menu
│   │   │   ├── PostCard.tsx                 # Post card component
│   │   │   └── ProfileHeader.tsx            # Profile header
│   │   │
│   │   ├── 📂 settings/
│   │   │   ├── HelpAndSupport.tsx           # Help section
│   │   │   ├── SettingsPreferencesTab.tsx   # Preferences tab
│   │   │   ├── SettingsProfileTab.tsx       # Profile settings tab
│   │   │   └── UpdatePasswordModal.tsx      # Password update modal
│   │   │
│   │   └── 📂 workout/
│   │       ├── ActiveWorkoutBanner.tsx      # Active workout banner
│   │       ├── constants.ts                 # Workout constants
│   │       ├── CreateFolderDialog.tsx       # Create folder dialog
│   │       ├── EditFolderDialog.tsx         # Edit folder dialog
│   │       ├── ExerciseInfoModal.tsx        # Exercise info modal
│   │       ├── FolderCard.tsx               # Template folder card
│   │       ├── FreestyleWorkoutCard.tsx     # Freestyle workout card
│   │       ├── index.ts                     # Workout exports
│   │       ├── TemplateCard.tsx             # Template card
│   │       └── WorkoutHeader.tsx            # Workout screen header
│   │
│   ├── 📂 hooks/
│   │   ├── useColorScheme.ts                # Theme hook
│   │   └── useSocket.ts                     # Socket.IO integration
│   │
│   ├── 📂 lib/
│   │   ├── messageCache.ts                  # AsyncStorage message cache
│   │   ├── utils.ts                         # Helper functions
│   │   └── weightConversion.ts              # Weight utilities
│   │
│   ├── 📂 slices/                           # Redux slices
│   │   ├── apiSlice.ts                      # RTK Query base
│   │   ├── authSlice.ts                     # Auth state
│   │   ├── blockApiSlice.ts                 # Block/unblock API
│   │   ├── customCategoryApiSlice.ts        # Categories API
│   │   ├── exerciseApiSlice.ts              # Exercises API
│   │   ├── fatSecretApiSlice.ts             # FatSecret API
│   │   ├── messageApiSlice.ts               # Messages with cache
│   │   ├── notificationApiSlice.ts          # Notifications API
│   │   ├── nutritionApiSlice.ts             # Nutrition API
│   │   ├── postsApiSlice.ts                 # Social feed API
│   │   ├── reportsApiSlice.ts               # Reports API
│   │   ├── socketSlice.ts                   # Socket state
│   │   ├── usersApiSlice.ts                 # User API
│   │   ├── workoutApiSlice.ts               # Workout API
│   │   ├── workoutTemplateApiSlice.ts       # Templates API
│   │   └── workoutTemplateFolderApiSlice.ts # Template folders API
│   │
│   ├── 📂 styles/
│   │   └── (style definitions)              # Custom styles
│   │
│   ├── 📂 types/
│   │   └── types.ts                         # TypeScript definitions
│   │
│   ├── .env.development                     # Dev environment
│   ├── .env.production                      # Prod environment
│   ├── .gitignore                           # Git ignore rules
│   ├── app.json                             # Expo configuration
│   ├── babel.config.js                      # Babel configuration
│   ├── eas.json                             # EAS Build config
│   ├── eslint.config.js                     # ESLint config
│   ├── expo-env.d.ts                        # Expo TypeScript defs
│   ├── metro.config.js                      # Metro bundler config
│   ├── package.json                         # Dependencies
│   ├── store.ts                             # Redux store
│   └── tsconfig.json                        # TypeScript config
│
├── 📂 design/                               # Brand, UI and marketing files (not loaded by the apps)
│   ├── README.md                            # What goes where, naming rules, Figma links
│   ├── brand/                               # Logo and app icon sources
│   ├── ui/                                  # Screen designs and mockups (mobile/, web/)
│   └── marketing/                           # social/<yyyy-mm>-<campaign>/ (images + their prompts.md), web/, app-store/
│
├── 📂 .github/workflows/                    # GitHub Actions
│   └── deploy.yml                           # CI/CD pipeline (scan, build, deploy)
│
├── 📂 kubernetes/                           # Manifests applied by CI
│   ├── backend-deployment.yml               # API deployment (2 replicas, port 5000)
│   ├── backend-service.yml                  # API service
│   ├── cluster-issuer-prod.yml              # Let's Encrypt issuer
│   ├── cluster-issuer-staging.yml           # Let's Encrypt staging issuer
│   ├── frontend-deployment.yml              # Web deployment (nginx, port 8080)
│   ├── frontend-service.yml                 # Web service
│   └── ingress.yml                          # Traefik ingress + TLS
│
├── .gitattributes                           # Line-ending rules (LF)
├── .gitignore                               # Git ignore rules
├── CLAUDE.md                                # Guidance for Claude Code
├── CONTRIBUTING.md                          # Contribution guidelines
├── docker-compose.yml                       # Local MongoDB + backend for development
└── README.md                                # This file
```

---

## ⚡ Quick Start

### Prerequisites

- **Node.js** 20.x or higher
- **npm** or **yarn**
- **Docker Desktop** (runs the local MongoDB from `docker-compose.yml`)
- **Git**

### 1️⃣ Clone Repository

```bash
git clone https://github.com/xjohnfit/fit-verse.git
cd fit-verse
```

### 2️⃣ Backend Setup

```bash
cd backend

# Install dependencies (for your editor, and for running tests outside Docker)
npm install

# Create environment file
cp .env.example .env.development

# Edit .env.development with your configuration
nano .env.development
```

**Required Environment Variables:**
```env
# Database: the local MongoDB from docker-compose.yml.
# Inside Docker, docker-compose.yml replaces this with mongodb://mongodb:27017/fit-verse.
# This value is only used when you run the backend outside Docker. Use 127.0.0.1, not
# localhost: Node may resolve localhost to IPv6, which Docker isn't listening on.
# Production uses MongoDB Atlas; its connection string comes from GitHub secrets, not this file.
MONGO_URI=mongodb://127.0.0.1:27017/fit-verse

# JWT (login tokens last 30 days)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# Application
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Cloudinary (for images)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# FatSecret (for nutrition)
FATSECRET_CONSUMER_KEY=your-consumer-key
FATSECRET_CONSUMER_SECRET=your-consumer-secret
```

**Get API Keys:**
- **Cloudinary**: [Sign up at cloudinary.com](https://cloudinary.com/users/register/free)
- **FatSecret**: [Register at platform.fatsecret.com](https://platform.fatsecret.com/api/Default.aspx?screen=rapih)

```bash
# Start MongoDB and the backend together (from the project root)
cd ..
docker compose up -d --build
# Backend runs on http://localhost:5000 and restarts when you save a file
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Required Environment Variables:**
```env
VITE_MODE=development
VITE_BACKEND_URL=http://localhost:5000
```

```bash
# Start frontend development server
npm run dev
# Frontend runs on http://localhost:5173
```

### 4️⃣ Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

### 5️⃣ Create Your First Account

1. Navigate to http://localhost:5173
2. Click "Sign Up"
3. Fill in your details
4. Login and explore!

---

## 📱 Mobile App Setup

### Prerequisites

- **Node.js** 20.x or higher
- **The local backend** running in Docker (`docker compose up -d` from the project root)
- **iOS Simulator** (Mac only), **Android Emulator**, or a phone with the FitVerse development build (see step 3)
- **EAS CLI** (for building native apps)

### 1️⃣ Install Dependencies

```bash
cd mobile
npm install

# Install EAS CLI globally (optional, for builds)
npm install -g eas-cli
```

### 2️⃣ Which Backend the App Uses

`lib/apiConfig.ts` picks it automatically, so there's nothing to switch before a release:

- **`npx expo start` (development):** your local backend on port 5000. Start it with `docker compose up -d` from the project root. The iOS Simulator reaches it at `localhost` and the Android emulator at `10.0.2.2`.
- **EAS builds (TestFlight / App Store):** always the live API at `https://api.fitverse.codewithxjohn.com`. The `production` profile in `eas.json` also pins it.
- **Override:** create `mobile/.env.local` (git ignores it) containing `EXPO_PUBLIC_API_URL=...` to point a development run somewhere else. For example, use the live API to test with your real account, or `http://<your Mac's LAN IP>:5000` on a physical phone. Restart `npx expo start` after changing it.

### 3️⃣ Start Development Server

On a phone, the app runs in a **development build**: FitVerse's own version of Expo Go, built with the project's exact Expo SDK and native modules. The App Store's Expo Go only runs the newest Expo SDK, so it can't open this project.

```bash
npx expo start

# iOS Simulator: press 's' to switch to Expo Go, then 'i'
# Android emulator: press 'a'
# Phone: scan the QR code with the Camera app, or open the FitVerse
# development build and enter http://<your Mac's LAN IP>:8081
```

**One-time setup for a physical iPhone.** You only need to rebuild after adding a package with native code or upgrading Expo.

```bash
npx eas-cli device:create                                # register the iPhone (open the link it shows on the phone)
npx eas-cli build --profile development --platform ios   # build, then install it from the QR code it prints
```

Then turn on **Settings → Privacy & Security → Developer Mode** on the iPhone, and allow **Local Network** access when the app asks. The development build and the TestFlight app share the same app ID, so installing one replaces the other.

### 4️⃣ Building for Production

```bash
# Login to Expo
eas login

# Configure EAS Build (first time only)
eas build:configure

# Build for iOS (requires Apple Developer account)
eas build --platform ios --profile production

# Build for Android
eas build --platform android --profile production

# Submit to TestFlight (iOS)
npm run testflight
# or
eas submit --platform ios --latest

# Submit to Google Play (Android)
eas submit --platform android --latest
```

### 5️⃣ Mobile Features

- **Message Caching**: 80% faster chat loading with AsyncStorage
- **Real-time Updates**: Socket.IO integration for instant messaging
- **Push Notifications**: Background and foreground notifications
- **Offline Support**: Cached messages available offline
- **Native Gestures**: Pull-to-refresh, swipe actions
- **Haptic Feedback**: Touch-responsive interactions

---

## 🐳 Docker Deployment

### Backend Service

```bash
cd backend

# Build image
docker build -t xjohnfit/fitverse-backend:latest .

# Run container
docker run -d \
  --name fitverse-backend \
  -p 5000:5000 \
  --env-file .env.production \
  xjohnfit/fitverse-backend:latest

# View logs
docker logs -f fitverse-backend
```

### Frontend Service

```bash
cd frontend

# Build image
docker build -t xjohnfit/fitverse-frontend:latest .

# Run container
docker run -d \
  --name fitverse-frontend \
  -p 8080:8080 \
  --env-file .env.production \
  xjohnfit/fitverse-frontend:latest

# View logs
docker logs -f fitverse-frontend
```

### Docker Compose (Local Development)

`docker-compose.yml` at the project root runs the local development stack:

- **mongodb**: MongoDB 8. It only accepts connections from your own machine (`127.0.0.1:27017`), keeps its data in a Docker volume, and starts empty.
- **backend**: the API, built from `backend/Dockerfile.dev` and served at `http://localhost:5000`. Your `backend/` folder is mounted into the container, so saving a file restarts the server. It reads `backend/.env.development`, except `MONGO_URI`, which points at the `mongodb` service.

The frontend still runs on your machine with `npm run dev`, and production uses MongoDB Atlas.

```bash
# Build the backend image (first time) and start both services in the background
docker compose up -d --build

# Check status: mongodb should say (healthy)
docker compose ps

# Follow the backend logs
docker compose logs -f backend

# Stop everything (keeps the data)
docker compose stop

# After adding or removing a backend dependency
docker compose up -d --build --renew-anon-volumes

# Run only the database, if you'd rather start the backend with npm run dev
docker compose up -d mongodb

# Delete the containers and all local data
docker compose down -v
```

---

## ☸️ Kubernetes Deployment

Deployment is automatic. Every push to `main` runs the [GitHub Actions pipeline](#-cicd-pipeline), which applies the manifests in [`kubernetes/`](kubernetes/). The steps below are the manual equivalent.

### Prerequisites

- A Kubernetes cluster with the Traefik ingress controller and cert-manager
- kubectl configured for that cluster
- Images pushed to Docker Hub (`xjohnfit/fitverse-backend`, `xjohnfit/fitverse-frontend`)

### Manual Deployment

```bash
# Create the secret the backend reads its environment from
kubectl create secret generic fitverse-secrets \
  --from-literal=MONGO_URI="your-mongodb-uri" \
  --from-literal=JWT_SECRET="your-jwt-secret" \
  --from-literal=CLOUDINARY_CLOUD_NAME="your-cloud-name" \
  --from-literal=CLOUDINARY_API_KEY="your-api-key" \
  --from-literal=CLOUDINARY_API_SECRET="your-api-secret" \
  --from-literal=FATSECRET_CONSUMER_KEY="your-consumer-key" \
  --from-literal=FATSECRET_CONSUMER_SECRET="your-consumer-secret"

# Apply the certificate issuers, deployments, services and ingress
kubectl apply -f kubernetes/

# Verify
kubectl get pods -l app=fitverse-backend
kubectl get pods -l app=fitverse-frontend
kubectl get ingress fitverse-ingress
```

The frontend needs no runtime config, because production builds call `https://api.fitverse.codewithxjohn.com` directly.

### Ingress Configuration

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: fitverse-ingress
spec:
  rules:
  - host: fitverse.codewithxjohn.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: fitverse-frontend
            port:
              number: 80
  - host: api.fitverse.codewithxjohn.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: fitverse-backend
            port:
              number: 5000
```

---

## 🔧 Development Workflow

### Backend Development

```bash
cd backend

# Development mode (auto-reload)
npm run dev

# Run tests
npm run test

# Run linter
npm run lint

# Build for production
npm run build

# Start production build
npm run start
```

### Frontend Development

```bash
cd frontend

# Development mode (HMR)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Full Stack Development

From project root:

```bash
# Start both services concurrently
npm run dev

# Build both services
npm run build:full
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm run test

# Run with coverage
npm run test -- --coverage

# Watch mode
npm run test:watch

# Specific test file
npm run test health.test.ts
```

### Frontend Tests (Planned)

```bash
cd frontend

# Run component tests
npm run test

# Run E2E tests
npm run test:e2e
```

---

## 📊 CI/CD Pipeline

The web app and API are deployed by GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). The mobile app is built and released separately with EAS (see [Mobile App Setup](#-mobile-app-setup)).

### When It Runs

- **Push to `main`**: the full pipeline (scan, build and deploy). It's skipped when a push only changes `kubernetes/**`, `README.md` or `.gitignore`.
- **Pull request to `main`**: the security scan only.

### Jobs

```text
1. trivy-scan       Scan the repo for vulnerable dependencies, committed secrets and
                    misconfigurations (results are reported; the job never fails the build)
2. build-and-push   Build the backend and frontend Docker images and push them to
                    Docker Hub as xjohnfit/fitverse-backend and xjohnfit/fitverse-frontend
                    (tags: main-<short sha> and latest)
3. deploy           Recreate the fitverse-secrets Kubernetes secret from GitHub secrets,
                    kubectl apply the manifests in kubernetes/, point both deployments at
                    the main-<short sha> images, and wait for the rollout to finish
```

The TypeScript compile inside each Docker build is the pipeline's only code check. It doesn't run lint or tests yet.

### Required GitHub Secrets

| Secret | Used for |
| --- | --- |
| `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN` | Pushing images to Docker Hub |
| `KUBECONFIG` | Base64-encoded kubeconfig for the cluster |
| `MONGO_URI`, `JWT_SECRET` | Backend database and auth |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Image uploads |
| `FATSECRET_CONSUMER_KEY`, `FATSECRET_CONSUMER_SECRET` | Nutrition search |

### Running the Pipeline

```bash
# Deploy by pushing to main
git push origin main

# Watch a run
gh run watch

# Re-run a failed run
gh run rerun <run-id>
```

---

## 🔒 Security

### Authentication

- **JWT Tokens**: 7-day expiration, configurable
- **HTTP-Only Cookies**: XSS protection
- **bcrypt Hashing**: 10 salt rounds
- **Password Requirements**: Minimum 8 characters, mixed case, numbers

### Authorization

- **Protected Routes**: JWT verification middleware
- **Admin Middleware**: Role-based access control
- **CORS Configuration**: Whitelisted origins

### Security Scanning

- **Trivy**: Scans the repository for vulnerable dependencies, committed secrets and misconfigurations on every push and pull request (reported, not blocking)
- **npm audit**: Run manually in each app folder

### Best Practices

- Never commit `.env` files
- Use Kubernetes secrets in production
- Rotate JWT secrets regularly
- Enable HTTPS in production
- Implement rate limiting (planned)

---

## 📡 API Documentation

### Base URLs

```
Development: http://localhost:5000/api
Production: https://api.fitverse.codewithxjohn.com/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "dob": "1990-01-15",
  "gender": "male"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### Logout User
```http
POST /api/auth/logout
Authorization: Cookie (jwt)
```

### User Endpoints

#### Get User Profile
```http
GET /api/users/profile
Authorization: Cookie (jwt)
```

#### Update User Profile
```http
PUT /api/users/profile
Authorization: Cookie (jwt)
Content-Type: application/json

{
  "name": "John Doe",
  "bio": "Fitness enthusiast"
}
```

#### Follow User
```http
POST /api/users/follow/:userId
Authorization: Cookie (jwt)
```

### Block & Report Endpoints

#### Block User
```http
POST /api/users/block/:userId
Authorization: Cookie (jwt)
```

#### Unblock User
```http
POST /api/users/unblock/:userId
Authorization: Cookie (jwt)
```

#### Get Blocked Users
```http
GET /api/users/blocked
Authorization: Cookie (jwt)
```

#### Report User/Content
```http
POST /api/reports
Authorization: Cookie (jwt)
Content-Type: application/json

{
  "reportedUserId": "user_id",
  "reportedPostId": "post_id",  // optional
  "reason": "harassment",
  "description": "Detailed description of the issue"
}
```

### Workout Template Folder Endpoints

#### Get Template Folders
```http
GET /api/workout-template-folders
Authorization: Cookie (jwt)
```

#### Create Template Folder
```http
POST /api/workout-template-folders
Authorization: Cookie (jwt)
Content-Type: application/json

{
  "name": "Chest Day",
  "order": 1
}
```

#### Update Template Folder
```http
PUT /api/workout-template-folders/:folderId
Authorization: Cookie (jwt)
Content-Type: application/json

{
  "name": "Upper Body",
  "order": 2
}
```

#### Delete Template Folder
```http
DELETE /api/workout-template-folders/:folderId
Authorization: Cookie (jwt)
```

For complete API documentation, see [Backend README](backend/README.md#-api-documentation).

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Quick Start

```bash
# Fork repository
# Clone your fork
git clone https://github.com/YOUR_USERNAME/fit-verse.git

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git commit -m "feat: add amazing feature"

# Push to your fork
git push origin feature/amazing-feature

# Open Pull Request
```

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: update dependencies
```

---

## 🚀 Roadmap

### ✅ Phase 1: Social Foundation (Completed)
- [x] JWT authentication
- [x] User profiles with photos
- [x] Follow/unfollow system
- [x] Social feed with posts
- [x] Like and comment system
- [x] Real-time notifications
- [x] Dark/light themes
- [x] Block/unblock users
- [x] Report system for users and content

### ✅ Phase 2: Nutrition Tracking (Completed)
- [x] FatSecret API integration
- [x] Food search and autocomplete
- [x] Daily meal tracking
- [x] Custom meal categories
- [x] Macro tracking and goals
- [x] Visual analytics with charts
- [x] Historical data navigation

### ✅ Phase 3: Real-Time Features (Completed)
- [x] Socket.IO implementation
- [x] Real-time messaging
- [x] Online/offline status
- [x] Message persistence
- [x] Conversation history

### ✅ Phase 4: Fitness Tracking (Completed)
- [x] Exercise library (50+ exercises)
- [x] Workout logging
- [x] Workout templates
- [x] Template folder organization
- [x] Freestyle workouts
- [x] Set/rep/weight tracking
- [x] Workout history
- [ ] Advanced progress tracking (charts & analytics)
- [ ] Personal records
- [ ] Workout analytics dashboard

### 📋 Phase 5: Advanced Features (Planned)
- [ ] AI meal suggestions
- [ ] Barcode scanner
- [ ] Recipe database
- [ ] Water tracking
- [ ] Sleep tracking
- [ ] Fitness device integration

### ✅ Phase 6: Mobile & Scale (Completed)
- [x] React Native mobile apps (iOS & Android)
- [x] Push notifications (background & foreground)
- [x] Message caching with AsyncStorage
- [x] Real-time sync with Socket.IO
- [x] Expo managed workflow
- [x] TestFlight distribution
- [x] EAS Build & OTA updates
- [x] Native gestures and haptics
- [x] Cross-platform state management

### 🚀 Phase 7: Enhanced Mobile Features (Future)
- [ ] Full offline support with sync queue
- [ ] Message read receipts
- [ ] Voice messages
- [ ] Video messages
- [ ] Group chat functionality
- [ ] Message search and filtering
- [ ] Multi-language support (i18n)
- [ ] Accessibility improvements (screen readers)

### 💎 Phase 8: Premium & Enterprise (Future)
- [ ] Premium subscription features
- [ ] Advanced analytics dashboard
- [ ] AI-powered workout recommendations
- [ ] AI nutritionist chat assistant
- [ ] Corporate wellness programs
- [ ] Team challenges and leaderboards
- [ ] Integration with wearables (Apple Watch, Fitbit)
- [ ] White-label solutions

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/xjohnfit/fit-verse/issues)
- **Discussions**: [GitHub Discussions](https://github.com/xjohnfit/fit-verse/discussions)
- **Email**: [xjohnfitcodes@gmail.com](mailto:xjohnfitcodes@gmail.com)
- **Portfolio**: [codewithxjohn.com](https://codewithxjohn.com)

---

## 📄 License

This project is licensed under the **ISC License**.

```text
ISC License

Copyright (c) 2025 John Winchester

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

---

## 🙏 Acknowledgments

Special thanks to:

- **MongoDB** for the powerful database platform
- **Cloudinary** for image management services
- **FatSecret** for the comprehensive nutrition API
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for the utility-first CSS framework
- **The Open Source Community** for continuous inspiration

---

<div align="center">

**Built with ❤️ by [John Winchester](https://github.com/xjohnfit)**

⭐ **Star this repository if you found it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/xjohnfit/fit-verse?style=social)](https://github.com/xjohnfit/fit-verse/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/xjohnfit/fit-verse?style=social)](https://github.com/xjohnfit/fit-verse/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/xjohnfit/fit-verse?style=social)](https://github.com/xjohnfit/fit-verse/watchers)

**[⬆ Back to Top](#-mern-fitverse)**

</div>