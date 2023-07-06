import { IntegrationType } from 'lib/integration_type';

export class UpdateIntegrationDefinitionDto {
  name?: string;
  key?: string;
  icon?: string;
  sourceUrl?: string;
  integrationType?: IntegrationType;
  deleted?: Date;
}
