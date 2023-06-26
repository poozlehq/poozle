export class CreateIntegrationAccountDto {
  integrationConfiguration?: Record<string, any>;
  authType: string;
  integrationAccountName: string;
  deleted?: Date;
}
