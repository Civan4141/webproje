# Tattoo Studio Web Application

A full-stack web application for a tattoo studio built with Next.js, featuring appointment booking, gallery management, and an admin dashboard.

## Features

- Modern, responsive design using Tailwind CSS
- Appointment booking system
- Gallery management for tattoos and piercings
- Secure admin dashboard
- Image upload functionality
- SQLite database with Prisma ORM

## Prerequisites

- Node.js 18+ and npm

## Setup

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd tattoo-studio
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a .env file in the root directory with the following content:
\`\`\`
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
\`\`\`

4. Set up the database:
\`\`\`bash
npx prisma migrate dev
\`\`\`

5. Create the initial admin user:
\`\`\`bash
node scripts/create-admin.js
\`\`\`

## Running the Application

1. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Admin Access

- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Default admin credentials:
  - Email: admin@example.com
  - Password: admin123

**Important:** Change the admin password after first login in production.

## Project Structure

- \`/app\` - Next.js app router pages and API routes
- \`/components\` - React components
- \`/lib\` - Utility functions and configurations
- \`/prisma\` - Database schema and migrations
- \`/public\` - Static files and uploaded images
- \`/scripts\` - Utility scripts

## Features

### Public Pages
- Homepage with studio information and featured works
- Gallery of tattoos and piercings
- Appointment booking form

### Admin Dashboard
- Secure login system
- Appointment management (view, approve, reject)
- Gallery management (upload, delete images)
- Category management for gallery items

## Security

- JWT-based authentication for admin access
- Secure password hashing
- Protected API routes
- File upload validation

## License

MIT 