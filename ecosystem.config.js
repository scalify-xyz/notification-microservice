module.exports = {
    apps: [
      {
        name: "SCALABLE_E-COMMERCE/NOTIFICATION_MICROSERVICE",
        script: "./index.js",

        env_production: {
          NODE_ENV: "prod",
        },
      },
    ],
  };