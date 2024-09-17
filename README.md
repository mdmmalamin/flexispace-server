<div align="center">
  <h1>FlexiSpace – A Comprehensive Meeting Room Booking System for Co-working Spaces</h1>
</div>

---

# Flexispace | SERVER

## Introduction

FlexiSpace – Simplifying Meeting Room Bookings for Co-working Spaces. Seamlessly manage and book rooms with ease, ensuring flexible and efficient workspace solutions for teams and professionals.

## Project Description

**Project Overview:** FlexiSpace is a modern and intuitive platform designed to streamline the process of booking meeting rooms within co-working spaces. It offers a seamless experience for both co-working space administrators and users, allowing efficient management and scheduling of available meeting rooms. The system addresses the challenges of manual bookings, double reservations, and inefficient room utilization by offering a centralized, real-time solution.

**Purpose:** The primary purpose of FlexiSpace is to create a hassle-free environment for professionals and co-working spaces by providing a platform that simplifies the meeting room booking process. It enables users to quickly find, book, and manage meeting rooms based on their needs, while giving administrators full control over room availability, pricing, and scheduling.

## Features

- **Real-Time Room Availability:** Instantly view available meeting rooms with real-time updates on room status and slot availability.

- **Room Details and Amenities:** Display detailed information about each room, including capacity, floor number, and available amenities (e.g., projectors, whiteboards).

- **Slot-Based Booking:** Book rooms by specific time slots, allowing users to reserve spaces for their exact needs without unnecessary overhead.

- **Recurring and Flexible Bookings:** Support for recurring room reservations and flexible booking modifications, including cancellations and reschedules.

- **Admin Dashboard:** Comprehensive admin interface for managing room details, booking policies, and availability settings.

- **User Authentication and Profiles:** Users can sign up, log in, and manage their booking history and preferences through personalized profiles.

- **Pricing Management:** Configure custom room pricing per slot, allowing flexible rate adjustments based on room type, time, or demand.

- **Booking Confirmation:** Status indicators such as "confirmed," "unconfirmed," and "canceled" for easy tracking of each booking's current state.

- **Security and Privacy Controls:** Implements robust security for user data and booking information, adhering to best practices for privacy protection.

## Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Zod
- JWT

## Installation Guideline

**Prerequisites**
Before setting up the project, ensure you have the following installed on your machine:

- Node.js (v14 or higher)
- MongoDB (locally or a cloud instance like MongoDB Atlas)
- Git (for cloning the repository)
- npm or yarn (for managing dependencies)

**Step 1: Clone the Repository**
Clone the FlexiSpace project repository from GitHub to your local machine:

```base
git clone https://github.com/yourusername/flexispace.git
```

Navigate into the project directory:

```base
cd flexispace
```

**Step 2: Install Dependencies**
Use npm or yarn to install all the necessary dependencies for the project.

With npm:

```base
npm install
```

Or with yarn:

```base
yarn install
```

**Step 3: Configure Environment Variables**

Create a .env file in the root directory of your project to store environment variables.

```base
touch .env
```

Add the following variables in your .env file (replace the placeholders with your actual configurations) or check .env.example file:

```base
NODE_ENV=development

# MongoDB URI (local or MongoDB Atlas)
DATABASE_URL=mongodb://localhost:27017/flexispace

# Port on which the app will run
PORT=5000

# Bcrypt salt rounds (example: 1)
BCRYPT_SALT_ROUNDS=

# JWT secret for user authentication
JWT_SECRET=your_jwt_secret

# JWT expires in for user authentication token expires time
JWT_ACCESS_EXPIRES_IN=your_jwt_expires_in
```

**Step 4: Start the Development Server**
Once everything is set up, start the development server using npm or yarn:

With npm:

```base
npm run start:dev
```

With yarn:

```base
yarn start:dev
```

The app will now be running at http://localhost:5000 (or the port specified in your .env file).

**Step 5: Access the Application**
Open your browser and navigate to http://localhost:5000 to view the frontend.
You can use Postman or another API client to test the backend endpoints (e.g., room booking, user management).

### Prerequisites

- bcrypt
- cookie-parser
- cors
- dotenv
- express
- http-status
- jsonwebtoken
- mongoose
- zod

or run:

```base
npm i
```
