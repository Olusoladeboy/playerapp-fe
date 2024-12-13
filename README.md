# PlayerApp FE 

This guide provides step-by-step instructions to set up and run the React application locally or in a production environment.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

## Clone the Repository

```bash
git clone https://github.com/Olusoladeboy/playerapp-fe.git
cd playerapp-fe
```

## Install Dependencies

Install the necessary dependencies by running:

```bash
npm install
```

## Configuration

1. Create a `.env` file in the root directory (if not already present).
2. Add the following environment variables:

   ```env
    VITE_BACKEND_API="values"
   ```

   Update these values based on the environment variables provided.

## Run the Application

### Development Mode

To start the application in development mode (with hot-reloading):

```bash
npm run dev
```

### Production Mode

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the application:

   ```bash
   npm start
   ```

### Running with Docker

1. Build the Docker image:

   ```bash
   docker build -t playerapp-fe .
   ```

2. Run the container:

   ```bash
   docker run -p 3100:3100 playerapp-fe
   ```

