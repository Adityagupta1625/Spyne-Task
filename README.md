# Spyne Task


## Technologies Used

- **Node.js**: A JavaScript runtime for building scalable network applications.
- **TypeScript**: A superset of JavaScript that adds static types to the language.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for storing and retrieving data.
- **Yarn**: A fast, reliable, and secure package manager for Node.js.

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use a cloud-based MongoDB service)

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Adityagupta1625/Spyne-Task.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd your-project
    ```

3. **Navigate to the all the services perform all below action for all:**
   ```bash
     cd service-name
   ```

4. **Install dependencies using Yarn:**

    ```bash
    yarn
    ```

5. **Create a `.env` file:**

    Create a `.env` file in the root of your project and add the following:

    ```env
    PORT=8000
    MONGO_URI=mongodb://localhost:27017/your-database
    SECRET_KEY=your-secret-key
    REDIS_URL= your-redis-url
    ```

    - Replace `your-database` with your MongoDB database name.
    - Set up your MongoDB URI. If you are using a cloud-based service, replace the `localhost:27017` part with your MongoDB connection string.


6. **Run the application in development:**

    ```bash
    yarn dev
    ```

    The application will be running at `http://localhost:{port-defined}`.

## MongoDB Setup

1. **Install MongoDB:**

    Download and install MongoDB from [here](https://www.mongodb.com/try/download/community) if you haven't already.

2. **Start MongoDB:**

    Follow the instructions for your operating system to start the MongoDB server.

3. **Create a Database:**

    Use the MongoDB shell or a GUI tool to create a new database. Example using the MongoDB shell:

    ```bash
    mongo
    use your-database
    ```

    Replace `your-database` with your desired database name.

## Scripts

- `yarn start`: Start the application.
- `yarn lint`:  Automatically fix linting issues.
- `yarn dev`: Start the application in development mode
- `yarn format`: Runs prettier for the code formatting
- `yarn test`: Run all test cases

## API Documentation

Visit `https://lively-station-797452.postman.co/workspace/Team-Workspace~1324dde8-d303-4523-8356-8c02d57e6d5b/collection/16718559-a4e7d629-04fd-4917-8d4b-3ad42495f0a6?action=share&creator=16718559` for API documentation (powered by PostMan).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
