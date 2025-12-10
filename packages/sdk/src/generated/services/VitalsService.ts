/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class VitalsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public postApiVitals({
        requestBody,
    }: {
        requestBody: {
            type: string;
            value: number;
            unit: string;
            timestamp: string;
        },
    }): CancelablePromise<{
        data: {
            _id?: string;
            type: string;
            value: number;
            unit: string;
            timestamp: string;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/vitals/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public getApiVitals(): CancelablePromise<{
        data: Array<{
            _id?: string;
            type: string;
            value: number;
            unit: string;
            timestamp: string;
        }>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/vitals/',
        });
    }
}
