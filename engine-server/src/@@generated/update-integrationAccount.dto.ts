export class UpdateIntegrationAccountDto {
  integrationConfiguration?: Record<string, any>;
  authType?: string;
  integrationAccountName?: string;
  deleted?: Date;
}
