import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { ControllerBody, ControllerResponse, ExtensionBody, SpecConfig } from './api.types';


@Injectable()
export class ControllerApi {
    httpService: HttpService;

    constructor(httpService: HttpService) { this.httpService = httpService; }

    async post(controllerBody: ControllerBody, controllerPath: string): Promise<ControllerResponse> {

        const repsonse = await lastValueFrom(this.httpService.post(`${process.env.CONTROLLER_URL}/${controllerPath}`, controllerBody))
        return repsonse.data
    }

}

@Injectable()
export class ExtensionApi {
    httpService: HttpService;

    constructor(httpService: HttpService) { this.httpService = httpService; }

    async getSpec(extensionBody: ExtensionBody): Promise<SpecConfig>{
        const repsonse = await lastValueFrom(this.httpService.post(`http://${process.env.EXTENSION_BASE_URL}/graphql`, extensionBody))
        return repsonse.data.data.getSpec
    }
}