
import {Prisma} from '@prisma/client'




export class CreateIntegrationAccountDto {
  integrationConfiguration?: Prisma.InputJsonValue;
authType: string;
integrationAccountName: string;
deleted?: Date;
}
