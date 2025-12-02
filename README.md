## Inventory Management API

REST API for managing product inventory using Express.js and PostgreSQL.

## Project Structure
```
JSApi/
├── src/
│   ├── db/
│   │   └── database.mjs     # Database connection
│   ├── routes/
│   │   └── products.mjs     # Product API routes
│   └── app.mjs              # Main Express server
├── frontend/
│   └── index.html           # Frontend HTML
├── node_modules/            # Dependencies (not in Git)
├── .env                     # Environment variables (not in Git)
├── .env.example             # Environment template
├── .gitignore               # Git ignore rules
├── package.json             # Project configuration
├── package-lock.json        # Dependency lock file
└── README.md                # This file
```

## Prerequisites 

- Node.js
- Docker
- Bruno (for API testing)

## Setup instructions

### 1. Clone the repository
```bash
git clone
cd (dir name)
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create PostgreSQL Container
```bash
docker run --name postgres-dev -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres
```

### 4. Create Database

Access the PostgreSQL container:
```bash
docker exec -it posgres-dev psql -U postgres
```

Create the database:
```sql
CREATE DATABASE inventory_db;
\q
```

Exit the container: 
```bash
exit
```

### 5. Setup Environment Variables

Copy '.env.exmaple' to '.env':
```bash
cp .env.example .env
```

Default values in '.env':
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=inventory_db
DB_PASSWORD=mypassword
DB_PORT=5432
PORT=3000
```

**Note:** If you used different credentials when creating the Docker container, update your `.env` file accordingly.

### 6. Start the server
```bash
npm start
```

Or run directly:
```bash
node src/app.mjs
```

The application will: 
- Connect to PostgreSQL database
- Automatically create the 'products' table if it doesn't exist
- Start the server on 'http://localhost:3000'

You should see:
```
Database connected at: [timestamp]
Products table ready
Server running on http://localhost:3000
Try visiting: http://localhost:3000/api/products
```