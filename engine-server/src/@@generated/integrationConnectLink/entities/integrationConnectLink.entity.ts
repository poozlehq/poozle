
import {IntegrationType} from '@prisma/client'
import {IntegrationAccount} from '../../integrationAccount/entities/integrationAccount.entity'


export class IntegrationConnectLink {
  integrationConnectionLinkId: string ;
expiresIn: number ;
category: IntegrationType[] ;
createdAt: Date ;
updatedAt: Date ;
IntegrationAccount?: IntegrationAccount[] ;
}
