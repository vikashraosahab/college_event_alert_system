# College Event Alert System

A comprehensive full-stack application for managing college events, notifications, and user interactions. Built with Node.js, Express.js, MongoDB, React, and TypeScript.

## 🎯 Project Overview

The College Event Alert System is designed to help colleges and universities manage events, notify students about upcoming activities, and facilitate event registration. The system supports multiple user roles and provides a modern, responsive interface for both web and mobile devices.

## 🏗️ Architecture

### Backend (Server)
- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **API**: RESTful API with comprehensive endpoints
- **Security**: Rate limiting, CORS, input validation
- **Documentation**: Comprehensive API documentation

### Frontend (Client)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Radix UI with Tailwind CSS
- **Routing**: React Router with protected routes
- **State Management**: React Context API
- **Forms**: React Hook Form with Zod validation

## 🚀 Features

### Core Features
- **User Management**: Registration, authentication, profile management
- **Event Management**: Create, update, delete, and manage events
- **Event Registration**: Users can register for events with capacity management
- **Calendar Integration**: Interactive calendar view of events
- **Notification System**: Real-time notifications for events and updates
- **Multi-role Support**: Student, Event Organizer, Faculty, and Admin roles
- **College Management**: Multi-college support with department management
- **Search & Filtering**: Advanced search and filtering capabilities
- **Analytics**: User and event statistics

### Technical Features
- **Responsive Design**: Mobile-first responsive design
- **Type Safety**: Full TypeScript implementation
- **Accessibility**: WCAG compliant components
- **Performance**: Optimized bundle size and loading
- **Security**: Comprehensive security measures
- **Scalability**: Designed for horizontal scaling

## 📁 Project Structure

```
college_event_alert/
├── Server/                 # Backend API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Custom middlewares
│   │   ├── utils/          # Utility functions
│   │   └── db/            # Database configuration
│   ├── package.json
│   └── README.md
├── Client/                 # Frontend Application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── lib/           # Utility functions
│   │   └── types/         # TypeScript types
│   ├── package.json
│   └── README.md
└── README.md              # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to Server directory**
   ```bash
   cd Server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/college_event_alert
   JWT_SECRET=your-super-secret-jwt-key
   CLIENT_URL=http://localhost:5173
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to Client directory**
   ```bash
   cd Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 🎯 Usage

### Getting Started

1. **Start both servers** (Backend and Frontend)
2. **Open the application** in your browser at `http://localhost:5173`
3. **Register a new account** or use existing credentials
4. **Explore the features**:
   - Browse events on the Events page
   - View events in calendar format
   - Check notifications
   - Update your profile

### User Roles

- **Student**: Can register for events, view notifications, manage profile
- **Event Organizer**: Can create and manage events, send notifications
- **Faculty**: Can view all users and events, moderate content
- **Admin**: Full system access, manage colleges and users

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Key Endpoints

#### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile

#### Events
- `GET /events` - Get all events (with pagination and filtering)
- `POST /events` - Create new event (Event Organizer/Admin)
- `GET /events/:id` - Get event by ID
- `POST /events/:id/register` - Register for event
- `DELETE /events/:id/register` - Unregister from event

#### Notifications
- `GET /notifications` - Get user notifications
- `PUT /notifications/:id/read` - Mark notification as read
- `POST /notifications/send` - Send notification (Event Organizer/Admin)

#### Users
- `GET /users` - Get all users (Faculty/Admin)
- `GET /users/stats` - Get user statistics
- `PUT /users/:id` - Update user (Admin)

#### Colleges
- `GET /colleges` - Get all colleges
- `POST /colleges` - Create college (Admin)
- `GET /colleges/:id` - Get college by ID

## 🎨 UI Components
### Registration Page
<img width="1920" height="1080" alt="registerAuth" src="https://github.com/user-attachments/assets/2b69a7ca-e4bc-4877-bd0c-ead7abddc459" />
### Login Page
<img width="1920" height="1080" alt="login" src="https://github.com/user-attachments/assets/473b8e7d-42cb-4ccd-8ad1-6b1bdc999117" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-09 23-31-47" src="https://github.com/user-attachments/assets/ea77c955-c5fb-4440-8364-9c3b1aa1ef12" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-09 23-31-55" src="https://github.com/user-attachments/assets/fbd1b81b-1cac-4744-909a-8193ae43a33b" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-09 23-32-02" src="https://github.com/user-attachments/assets/a45bfce7-c5c4-4659-a872-69723aa46308" />




### Design System
- **Colors**: Consistent color palette with CSS variables
- **Typography**: Scalable typography system
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI components

### Key Components
- **Button**: Various styles and sizes
- **Input**: Form inputs with validation
- **Card**: Content containers
- **Calendar**: Interactive calendar component
- **Navigation**: Responsive navigation system

## 🔐 Security Features

### Backend Security
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Comprehensive request validation
- **Rate Limiting**: Prevent abuse and DDoS attacks
- **CORS Protection**: Configured cross-origin requests
- **Security Headers**: Helmet.js for security headers

### Frontend Security
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Token Management**: Secure token storage and refresh
- **Input Sanitization**: XSS protection
- **HTTPS Ready**: Production-ready security configuration

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build the application: `npm run build`
3. Start the production server: `npm start`
4. Use a process manager like PM2 for production

### Frontend Deployment
1. Set production environment variables
2. Build the application: `npm run build`
3. Deploy the `dist` folder to your hosting service
4. Configure your web server (Nginx, Apache, etc.)

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://your-mongodb-connection-string
JWT_SECRET=your-production-jwt-secret
CLIENT_URL=https://your-frontend-domain.com
```

#### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.com/api
```

## 🧪 Testing

### Backend Testing
- **Unit Tests**: Individual function testing
- **Integration Tests**: API endpoint testing
- **Database Tests**: MongoDB integration testing

### Frontend Testing
- **Component Tests**: React component testing
- **Integration Tests**: Feature integration testing
- **E2E Tests**: End-to-end testing

## 📊 Performance

### Backend Performance
- **Database Indexing**: Optimized MongoDB queries
- **Caching**: Redis integration for caching
- **Compression**: Response compression
- **Rate Limiting**: API rate limiting

### Frontend Performance
- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Dynamic imports
- **Bundle Optimization**: Vite optimization
- **Image Optimization**: Optimized asset loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add new feature'`
6. Push to the branch: `git push origin feature/new-feature`
7. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
  - User authentication and management
  - Event creation and management
  - Notification system
  - Calendar integration
  - College management
  - Role-based access control

## 🎯 Future Enhancements

- **Mobile App**: React Native mobile application
- **Real-time Updates**: WebSocket integration
- **Advanced Analytics**: Detailed reporting and analytics
- **Email Integration**: Email notification system
- **File Uploads**: Event image and document uploads
- **Social Features**: User interactions and social features

---

**Note**: This is a full-stack application. Make sure both the backend and frontend are running for complete functionality.
