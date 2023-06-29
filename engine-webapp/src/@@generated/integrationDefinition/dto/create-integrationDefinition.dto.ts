const enum IntegrationType {
  HRIS = 'HRIS',
  MESSAGING = 'MESSAGING',
  CALENDAR = 'CALENDAR',
  TICKETING = 'TICKETING',
  EMAIL = 'EMAIL',
}

export class CreateIntegrationDefinitionDto {
  name: string;
  key: string;
  icon?: string;
  sourceUrl: string;
  integrationType: IntegrationType;
  deleted?: Date;
}
