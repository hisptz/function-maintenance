import { ChartModule } from './chart/chart.module';
import { TableModule } from './table/table.module';
import { AnalyticsEngineModule } from './analytics-engine/analytics-engine.module';

export const modules: any = [ChartModule, TableModule, AnalyticsEngineModule];

export * from './chart/chart.module';
export * from './table/table.module';
export * from './analytics-engine/analytics-engine.module';
