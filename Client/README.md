# College Event Alert System - Frontend

A modern React frontend application for the College Event Alert System, built with TypeScript, Vite, and Radix UI components.

## 🚀 Features

### Core Features
- **Authentication**: User registration, login, and profile management
- **Event Management**: Browse, search, and register for events
- **Calendar View**: Interactive calendar with event visualization
- **Notifications**: Real-time notification system
- **Responsive Design**: Mobile-first responsive design
- **Modern UI**: Clean, accessible interface with Radix UI components

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **React Router**: Client-side routing with protected routes
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation
- **Axios**: HTTP client with interceptors
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **React Big Calendar**: Calendar component for event visualization

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on port 5000

## 🛠️ Installation

1. **Navigate to the Client directory**
   ```bash
   cd Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the Client directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Input, Card, etc.)
│   └── Layout.tsx      # Main layout component
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── lib/                # Utility functions
│   ├── api.ts         # API configuration
│   └── utils.ts       # Helper functions
├── pages/              # Page components
│   ├── Login.tsx      # Login page
│   ├── Register.tsx   # Registration page
│   ├── Dashboard.tsx  # Dashboard page
│   ├── Events.tsx     # Events listing page
│   ├── Calendar.tsx   # Calendar view page
│   ├── Notifications.tsx # Notifications page
│   └── Profile.tsx    # User profile page
├── types/              # TypeScript type definitions
│   └── index.ts       # Main type definitions
├── App.tsx            # Main App component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🎨 UI Components

### Base Components
- **Button**: Various button styles and sizes
- **Input**: Form input with validation
- **Card**: Content containers
- **Label**: Form labels
- **Badge**: Status indicators

### Layout Components
- **Layout**: Main application layout with sidebar navigation
- **ProtectedRoute**: Route protection wrapper
- **PublicRoute**: Public route wrapper

## 🔐 Authentication

The application uses JWT-based authentication with the following features:

- **Login**: Email and password authentication
- **Registration**: User registration with validation
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Token Management**: Automatic token refresh and storage
- **Profile Management**: User profile editing and preferences

## 📱 Pages

### Authentication Pages
- **Login** (`/login`): User login form
- **Register** (`/register`): User registration form

### Main Application Pages
- **Dashboard** (`/dashboard`): Overview with stats and recent activity
- **Events** (`/events`): Browse and search events
- **Calendar** (`/calendar`): Calendar view of events
- **Notifications** (`/notifications`): Notification management
- **Profile** (`/profile`): User profile and settings

## 🎯 Key Features

### Event Management
- **Event Listing**: Grid view with search and filtering
- **Event Registration**: One-click event registration
- **Event Details**: Comprehensive event information
- **Category Filtering**: Filter events by category
- **Search**: Full-text search across events

### Calendar Integration
- **Month/Week/Day Views**: Multiple calendar views
- **Event Visualization**: Color-coded events by category
- **Interactive Selection**: Click events for details
- **Responsive Design**: Mobile-friendly calendar

### Notifications
- **Real-time Updates**: Live notification updates
- **Priority Levels**: Urgent, high, medium, low priorities
- **Read/Unread Status**: Visual indicators for notification status
- **Bulk Actions**: Mark all as read, delete notifications

### User Profile
- **Personal Information**: Edit personal details
- **Academic Information**: College and department details
- **Preferences**: Notification and account preferences
- **Statistics**: User activity and engagement stats

## 🔧 Configuration

### Environment Variables
- `VITE_API_URL`: Backend API URL (default: http://localhost:5000/api)

### API Integration
The application integrates with the backend API through:
- **Axios**: HTTP client with interceptors
- **Automatic Token Refresh**: Handles token expiration
- **Error Handling**: Centralized error management
- **Request/Response Interceptors**: Automatic token attachment

## 🎨 Styling

### Tailwind CSS
- **Utility-first**: Rapid UI development
- **Custom Design System**: Consistent color palette and spacing
- **Responsive Design**: Mobile-first approach
- **Dark Mode Ready**: CSS variables for theme switching

### Radix UI
- **Accessibility**: WCAG compliant components
- **Unstyled**: Custom styling with Tailwind
- **Composable**: Flexible component composition
- **TypeScript**: Full type safety

## 🚀 Development

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### Code Quality
- **TypeScript**: Strict type checking
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks

## 📦 Dependencies

### Core Dependencies
- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing

### UI Dependencies
- **Radix UI**: Component primitives
- **Tailwind CSS**: Styling framework
- **Lucide React**: Icon library
- **React Big Calendar**: Calendar component

### Form & Validation
- **React Hook Form**: Form management
- **Zod**: Schema validation
- **@hookform/resolvers**: Form validation integration

### HTTP & State
- **Axios**: HTTP client
- **React Context**: State management

## 🔄 State Management

The application uses React Context for state management:

- **AuthContext**: User authentication state
- **Local State**: Component-level state with useState
- **Form State**: React Hook Form for form management

## 🎯 Performance

### Optimization Features
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Dynamic imports for better performance
- **Memoization**: React.memo for component optimization
- **Bundle Analysis**: Vite bundle analyzer

### Best Practices
- **TypeScript**: Compile-time error checking
- **Component Composition**: Reusable component patterns
- **Custom Hooks**: Logic extraction and reuse
- **Error Boundaries**: Graceful error handling

## 🧪 Testing

### Testing Setup
- **Vitest**: Unit testing framework
- **React Testing Library**: Component testing
- **MSW**: API mocking for tests

### Test Coverage
- **Component Tests**: UI component testing
- **Integration Tests**: Feature integration testing
- **E2E Tests**: End-to-end testing with Playwright

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Production Build
The build process creates optimized production files in the `dist` directory.

### Environment Configuration
Set the following environment variables for production:
- `VITE_API_URL`: Production API URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

---

**Note**: This frontend application requires the backend API to be running for full functionality.