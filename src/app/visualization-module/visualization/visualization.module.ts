import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromModules from './modules';
import { DataFilterModule } from '../dimension-filters/data-filter/data-filter.module';
import { OrgUnitFilterModule } from '../dimension-filters/org-unit-filter/org-unit-filter.module';
import { PeriodFilterModule } from '../dimension-filters/period-filter/period-filter.module';
import { LayoutModule } from '../dimension-filters/layout/layout.module';
@NgModule({
  imports: [
    CommonModule,
    DataFilterModule,
    OrgUnitFilterModule,
    PeriodFilterModule,
    LayoutModule,
    ...fromModules.modules
  ],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers]
})
export class VisualizationModule { }
