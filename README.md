# Unmeshed - Express JS Application

Welcome to the our example repository that shows how you can use our Javascript / Typescript SDK alongside your express
app! This README will guide you on how to set up Unmeshed credentials, run workers, and get started with the Unmeshed
platform.

## About Unmeshed

Unmeshed is a ⚡ fast, low latency orchestration platform, that can be used to build 🛠️, run 🏃, and scale 📈 API and
microservices orchestration, scheduled jobs ⏰, and more with ease. Learn more on
our [🌍 main website](https://unmeshed.io) or explore
the [📖 documentation overview](https://unmeshed.io/docs/concepts/overview).

---

## Installing the Unmeshed SDK

To use Unmeshed in your project, install the SDK using your preferred package manager:

### Using npm:
```bash
npm install @unmeshed/sdk
```

### Using Yarn:
```bash
yarn add @unmeshed/sdk
```

## Setting Up Unmeshed Credentials

To use the Unmeshed SDK in your Node.js app, you need to initialize the `UnmeshedClient` with your credentials. Replace
the placeholder values below with your actual credentials:

```javascript
const {UnmeshedClient} = require("@unmeshed/sdk");

const unmeshedClient = new UnmeshedClient({
    baseUrl: 'http://localhost', // Replace with your Unmeshed API endpoint 🌐
    port: 8080, // Replace with your Unmeshed API port 🚪
    authToken: 'your-auth-token', // Replace with your API 🔒 auth token
    clientId: 'your-client-id' // Replace with your API 🆔 client ID
});
```

> **Note:** Do not expose these credentials in a browser 🌐. For browser implementations, leverage webhooks and user
> tokens 🔑 directly.

You can get started with Unmeshed by visiting our [📘 Get Started Guide](https://unmeshed.io/docs/concepts/overview).

---

## Running a Worker

A worker in Unmeshed processes 🌀 tasks asynchronously based on workflows. Below is an example of defining and starting a
worker:

### Step 1: Define a Worker Function

A worker function processes incoming tasks and returns an output:

```javascript
let workerFunction = (input) => {
    return new Promise((resolve) => {
        const output = {
            ...input || {},
            "ranAt": new Date() // Add the current timestamp to the output 🕒
        };
        resolve(output);
    });
};
```

### Step 2: Register the Worker

Define the worker configuration and register it with the `UnmeshedClient`:

```javascript
const worker = {
    worker: workerFunction,
    namespace: 'default', // Namespace for the worker 🗂️
    name: 'test-node-worker', // Unique name for the worker 🏷️
    maxInProgress: 500 // Maximum number of in-progress tasks ⏳
};

unmeshedClient.startPolling([worker]);
```

> The `startPolling` method starts the worker to listen 👂 for tasks continuously.

### Step 3: Start Your Application

Run your Node.js app, and the worker will start polling for tasks automatically 🤖.

---

## Additional Resources

- **[📖 Workers Documentation](https://unmeshed.io/docs/concepts/workers):** Learn more about workers and how to use them
  effectively.
- **Use Case Highlights:**
    - [🌐 API Orchestration](https://unmeshed.io/docs/use-cases/api-orchestration)
    - [🧩 Microservices Orchestration](https://unmeshed.io/docs/use-cases/microservices-orchestration)
    - [⏰ Scheduled Jobs](https://unmeshed.io/docs/use-cases/scheduled-jobs)

---

## Running the Example Application

1. 📂 Clone this repository.
2. 📥 Install dependencies:
   ```bash
   npm install
   ```
3. 🔑 Set up your Unmeshed credentials in the example code.
4. ▶️ Start the application:
   ```bash
   npm start
   ```
5. 🔎 Explore the example routes:
    - `/processes`
    - `/steps`

---

For more details, visit our [📖 documentation](https://unmeshed.io/docs/concepts/overview). If you encounter issues, feel
free to reach out or open an issue in this repository!

