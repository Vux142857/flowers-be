
---

# Flowers E-commerce Backend API

This is a RESTful API built with [NestJS](https://nestjs.com/) to support the Flowers E-commerce Platform. It handles core functionalities like product catalog, order management, user authentication, and admin management.

> **Note**: This backend project is for study purposes and is still under development.

## Project Repositories

- **Backend API Repository**: [https://github.com/Vux142857/flowers-be](https://github.com/Vux142857/flowers-be)
- **Frontend Repository**: [https://github.com/Vux142857/flowers](https://github.com/Vux142857/flowers)

## Demo

The backend API is deployed at: [https://flowers-be.onrender.com](https://flowers-be.onrender.com)

You can test it with the frontend demo at: [https://flowers-amber-seven.vercel.app](https://flowers-amber-seven.vercel.app)

## Getting Started

To set up the backend API locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Vux142857/flowers-be
   cd flowers-be
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and configure the following:

   ```env
   # Server and Client URLs
   SERVER=http://localhost:3000
   CLIENT=http://localhost:3001

   # Database Configuration
   DATABASE_HOST=
   DATABASE_PORT=5432
   DATABASE_NAME=
   DATABASE_USERNAME=
   DATABASE_PASSWORD=
   DATABASE_SYNC=true
   DATABASE_AUTOLOAD_ENTITIES=true

   # Test Configuration
   SERVER_TEST=

   # JWT Configuration
   JWT_SECRET=
   JWT_TOKEN_AUDIENCE=
   JWT_TOKEN_ISSUER=
   JWT_ACCESS_TOKEN_TTL=7200
   JWT_REFRESH_TOKEN_TTL=86400

   # Google Auth
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=

   # Zalo Payment Configuration
   ZALO_APP_ID=554
   ZALO_KEY1=8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn
   ZALO_KEY2=uUfsWgfLkRLzq6W2uNXTCxrfxs51auny
   ```

   Fill in the required values such as `DATABASE_HOST`, `DATABASE_NAME`, `DATABASE_USERNAME`, and `DATABASE_PASSWORD`.

4. **Run the database migration** (if necessary):

   ```bash
   npm run migration:run
   # or
   yarn migration:run
   ```

5. **Run the development server**:

   ```bash
   npm run start:dev
   # or
   yarn start:dev
   ```

6. **Access the API documentation**:

   If enabled, the API documentation is accessible at [http://localhost:3000/api](http://localhost:3000/api).

> **Note**: Ensure that your database server is running locally or accessible via network if testing locally.

## Project Structure

- **src/modules/**: Contains modules for each feature, such as `products`, `orders`, `users`, etc.
- **src/controllers/**: Handles routing and HTTP request logic.
- **src/services/**: Contains business logic and interacts with the database.
- **src/entities/**: Defines database models used with TypeORM.

## Key Features

- **Products**: Manage products, categories, and inventory.
- **Orders**: Create and manage orders and order items.
- **Users**: User authentication, registration, and roles (admin, customer).
- **Admin**: Restricted routes for managing products, orders, and analytics.
- **Paymentgate**: Use Zalopay api for payment gate.

## Learn More

To learn more about NestJS and TypeORM, explore these resources:

- [NestJS Documentation](https://docs.nestjs.com) - Official documentation for NestJS.
- [TypeORM Documentation](https://typeorm.io) - Comprehensive guide for using TypeORM.

## Deploying the Project

The project can be deployed to any cloud platform that supports Node.js. For example:

1. **Create a production build**:

   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Run the production server**:

   ```bash
   npm run start:prod
   # or
   yarn start:prod
   ```

3. **Configure environment variables** on your cloud platform.

---