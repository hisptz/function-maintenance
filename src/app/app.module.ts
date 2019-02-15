import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxDhis2MenuModule } from '@hisptz/ngx-dhis2-menu';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers, effects } from './store';
=======
import { HttpModule } from '@angular/http';
import { AceEditorModule } from 'ng2-ace-editor';
import { PrettyJsonModule } from 'angular2-prettyjson';

import { AppComponent } from './app.component';
import { HttpClientService } from './services/http-client.service';
import { SelectModule } from 'ng2-select';
import { RunnerComponent } from './components/runner/runner.component';
import { VisualizerComponent } from './components/visualizer/visualizer.component';
import { RulesComponent } from './components/rules/rules.component';
import { MessageComponent } from './components/message/message.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { OrgUnitFilterComponent } from './components/org-unit-filter/org-unit-filter.component';
import { FilterLevelPipe } from './services/filter-level.pipe';
import { SelectorComponent } from './components/selector/selector.component';
import { PeriodFilterComponent } from './components/period-filter/period-filter.component';
import { FilterService } from './services/filter.service';
import { DndModule, DragDropService, DragDropConfig } from 'ng2-dnd';
import { DataFilterComponent } from './components/data-filter/data-filter.component';
import { FilterByNamePipe } from './services/filter-by-name.pipe';
import { DataFilterService } from './services/data-filter.service';
/*import {Store} from "./dashboard-card/providers/store";*/
import { TreeModule } from 'angular-tree-component';
import { FunctionService } from './services/function.service';
import { DataService } from './services/data.service';
import { LocalStorageService } from './services/local-storage.service';
>>>>>>> 1.x.x
import { AppRoutingModule } from './app-routing.module';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { RouteSerializer, CoreModule } from './core';
import { HttpClient } from '@angular/common/http';

<<<<<<< HEAD
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './shared/shared.module';
import { components } from './components';
import { containers } from './containers';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ToasterModule } from 'angular2-toaster';
import { PaginationModule, BsDropdownModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, ...containers, ...components],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    CoreModule,
=======
import { MomentModule } from 'angular2-moment';
import { ToasterModule } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './services/user.service';
import { HasAccessPipe } from './pipes/has-access.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { HasFunctionAccessPipe } from './pipes/has-function-access.pipe';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ContextMenuModule } from 'ngx-contextmenu/lib/ngx-contextmenu';
import { DataTableModule } from 'angular2-datatable';
import { DataFilterPipe } from './pipes/data-filter.pipe';
import { TourNgBootstrapModule, TourService } from 'ngx-tour-ng-bootstrap';
import { MenuModule } from './modules/menu/menu.module';
import { MultiselectComponent } from './components/org-unit-filter/multiselect/multiselect.component';
import { OrgUnitService } from './services/org-unit.service';
import { RuleSelectorComponent } from './components/rule-selector/rule-selector.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DefaultRulePipe } from './pipes/default-rule.pipe';
import { LayoutModule } from './components/layout/layout.module';
import { EditorComponent } from './components/editor/editor.component';
import { VisualizationModule } from './visualization-module/visualization/visualization.module';
import { ChartModule } from './visualization-module/visualization/modules/chart/chart.module';
import { TableModule } from './visualization-module/visualization/modules/table/table.module';
import {DataTableModule as  DataTableNew} from 'angular-4-data-table';
import { PaginatePipe } from './pipes/paginate.pipe';
import {NgxPaginationModule} from "./modules/pagination/ngx-pagination.module";

@NgModule({
  declarations: [
    AppComponent,
    RunnerComponent,
    VisualizerComponent,
    RulesComponent,
    MessageComponent,
    OrgUnitFilterComponent,
    FilterLevelPipe,
    SelectorComponent,
    PeriodFilterComponent,
    DataFilterComponent,
    FilterByNamePipe,
    ListComponent,
    FunctionComponent,
    DashboardComponent,
    MultiselectComponent,
    HasAccessPipe,
    SearchPipe,
    HasFunctionAccessPipe,
    DataFilterPipe,
    RuleSelectorComponent,
    DefaultRulePipe,
    EditorComponent,
    //PaginatePipe
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    NgxPaginationModule,
    BsDropdownModule.forRoot(),
    DataTableModule,
    DataTableNew,
    MenuModule,
    FormsModule,
    HttpModule,
    AceEditorModule,
    PrettyJsonModule,
    TreeModule,
    VisualizationModule,
    ChartModule,
    TableModule,
    SelectModule,
>>>>>>> 1.x.x
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
<<<<<<< HEAD
    CollapseModule.forRoot(),
    ToasterModule.forRoot(),
    PaginationModule.forRoot(),
    SharedModule,
    FormsModule,
    FilterPipeModule,
    OrderModule,
    NgxJsonViewerModule,

    /**
     * Translation module
     */
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
=======
    TourNgBootstrapModule.forRoot(),
    DndModule,
    AppRoutingModule,
    ToasterModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ContextMenuModule.forRoot({
      useBootstrap4: true,
      autoFocus: true,
>>>>>>> 1.x.x
    }),
    AppRoutingModule,
    /**
     * @ngrx/router-store keeps router state up-to-date in the store
     */
    StoreRouterConnectingModule,
    /**
     * Menu  module
     */
    NgxDhis2MenuModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(effects)
  ],
<<<<<<< HEAD
  providers: [{ provide: RouterStateSerializer, useClass: RouteSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule {}
=======
  providers: [
    HttpClientService, FilterService,
    OrgUnitService, UserService, DragDropService, DragDropConfig, DataFilterService,
    FunctionService, DataService, LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
>>>>>>> 1.x.x
