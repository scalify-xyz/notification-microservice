import AWSSecretsManager from "@shared/utils/aws-secrets-manager";


async function start(): Promise<void> {
  await AWSSecretsManager.create({
    region: "sa-east-1",
    secretsMap: {
      // "SMTP_PROVIDER_HOST": "smtp_provider_host/production/scalableecommerce",
      // "SMTP_PROVIDER_PORT": "smtp_provider_port/production/scalableecommerce",
      // "SMTP_PROVIDER_USER": "smtp_provider_user/production/scalableecommerce",
      // "SMTP_PROVIDER_PASSWORD": "smtp_provider_password/production/scalableecommerce",
      "RABBITMQ_URL": "rabbitmq/production/scalableecommerce",
      "JWT_SECRET": "jwt/production/scalableecommerce", 
    },
  });
}

start();
