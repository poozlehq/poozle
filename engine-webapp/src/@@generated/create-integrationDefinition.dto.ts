const enum IntegrationType {
  MESSAGING = 'MESSAGING',
  HRIS = 'HRIS',
  CALENDAR = 'CALENDAR',
  TICKETING = 'TICKETING',
}

export class CreateIntegrationDefinitionDto {
  name: string;
  key: string;
  icon?: string;
  sourceUrl: string;
  integrationType: IntegrationType;
  deleted?: Date;
}
