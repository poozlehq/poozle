
import {Prisma} from '@prisma/client'




export class UpdateIntegrationAccountDto {
  integrationConfiguration?: Prisma.InputJsonValue;
authType?: string;
integrationAccountName?: string;
deleted?: Date;
}
