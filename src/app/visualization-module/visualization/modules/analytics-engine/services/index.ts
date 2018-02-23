import { AnalyticsService } from './analytics.service';
import { AnalyticsDbService } from './analytics-db.service';
import { AnalyticsHttpClientService } from './analytics-http-client.service';
import { ManifestService } from './manifest.service';
import {FunctionService} from './function.service'

export const services: any[] = [
  ManifestService,
  AnalyticsHttpClientService,
  AnalyticsDbService,
  AnalyticsService,
  FunctionService
];

export * from './analytics.service';
export * from './analytics-db.service';
export * from './analytics-http-client.service';
export * from './manifest.service';
export * from './function.service';
