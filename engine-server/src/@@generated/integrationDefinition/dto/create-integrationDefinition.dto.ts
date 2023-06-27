
import {IntegrationType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class CreateIntegrationDefinitionDto {
  name: string;
key: string;
icon?: string;
sourceUrl: string;
@ApiProperty({ enum: IntegrationType})
integrationType: IntegrationType;
deleted?: Date;
}
