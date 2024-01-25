# Customer API
This project is a serverless application designed to manage customer data.

## Endpoints:

### List Customers

This endpoint enables clients to retrieve a list of customers.

- **Method:** GET
- **Endpoint:** `/api/customers`
- **Query Parameters:**
  - `name`: string (optional)
  - `email`: string (optional)
  - `telephone`: string (optional)
- **Headers:**
  - `x-api-key`: YOUR_API_KEY

### List Nearby Customers

This endpoint allows clients to retrieve a list of customers near specified x, y geopoints.

- **Method:** GET
- **Endpoint:** `/api/customers/nearby`
- **Headers:**
  - `x-api-key`: YOUR_API_KEY

### Create a Customer

This endpoint enables clients to create a new customer.

- **Method:** POST
- **Endpoint:** `/api/customers`
- **Body:**
  - `name`: string (required)
  - `email`: string (required)
  - `telephone`: string (required)
  - `coordinate_y`: number (required)
  - `coordinate_x`: number (required)
- **Headers:**
  - `x-api-key`: YOUR_API_KEY

### How to Run Local

1. **Install Dependencies:**
   - Run `npm install` to install project dependencies.

2. **Run Docker Compose:**
   - Execute `docker compose up db -d` to start the Postgres database.

2. **Set Environment Variables:**
   - Ensure that your `env.yml` file is properly configured.

4. **Run Locally:**
   - Execute `sls offline` to run the project locally.

5. **Access Endpoints:**
   - Use the provided endpoints (e.g., `/api/customers`) with the appropriate HTTP methods.

Note: Make sure you have Serverless Framework installed (`npm install -g serverless`) and configured with your cloud provider credentials.


### Project structure

```
.
├── README.md
├── database
│   └── migrations
│       └── create_customers_table.sql
├── docker-compose.yml
├── env.yml
├── functions
│   └── api
│       ├── create-customer
│       │   ├── index.js
│       │   └── params-validator.js
│       ├── list-customers
│       │   └── index.js
│       └── nearby-customers
│           └── index.js
├── infra
│   ├── api-gateway
│   │   ├── auth-response.yml
│   │   └── cors.yml
│   └── lambda
│       ├── create-customer.yml
│       ├── list-customers.yml
│       └── nearby-customers.yml
├── lib
│   ├── calculate-distance.js
│   ├── database-client.js
│   └── responses.js
├── package-lock.json
├── package.json
├── repositories
│   └── customers-repository.js
├── scripts
│   └── start-local.sh
└── serverless.yml
```
