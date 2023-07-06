import { IntegrationType } from 'lib/integration_type';

export class CreateIntegrationDefinitionDto {
  name: string;
  key: string;
  icon?: string;
  sourceUrl: string;
  integrationType: IntegrationType;
  deleted?: Date;
}
