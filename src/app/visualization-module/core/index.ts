import { CoreModule } from './core.module';
import * as fromModules from './modules';

export const modules: any[] = [CoreModule, ...fromModules.modules];

export * from './core.module';
export * from './services';
export * from './modules';
export * from './utils';
export * from './models';
