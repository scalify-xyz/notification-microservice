
# boilerplate-microservice

A boilerplate for creating microservices using **TypeScript**, **Node.js**. Includes **Docker Compose** configuration for easy database setup.


## Installation

1. Clone the repository:

```bash
git clone https://github.com/username/boilerplate-microservice.git
cd boilerplate-microservice
```

1. Setup Husky:

```bash
npm run prepare
```


2. Install dependencies:

```bash
npm install
```

3. Set up the database with Docker Compose:

```bash
docker-compose up --build
```

## Run the Service

Start the microservice:

```bash
npm run dev
```

The service will be available at `http://localhost:3000`.

## Docker Commands

- To stop and remove the containers:

```bash
docker-compose down
```

## Contributing

1. Fork the repository.
2. Create a branch for your feature (`git checkout -b feature/feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push the branch (`git push origin feature/feature-name`).
5. Create a Pull Request.

## License

Licensed under the [MIT License](LICENSE).