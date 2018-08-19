import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { SelectionFilterConfig } from '../../shared/modules/ngx-dhis2-data-selection-filter/models/selected-filter-config.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { Observable } from 'rxjs';
import { User, SystemInfo } from '../../core';
import {
  getCurrentUser,
  getSystemInfo,
  getCurrentVisualization,
  getCurrentVisualizationDataSelections
} from '../../store/selectors';
import { CurrentVisualizationState } from '../../store/reducers/current-visualization.reducer';
import { VisualizationDataSelection } from '../../shared/modules/ngx-dhis2-visualization/models';
import { take } from 'rxjs/operators';
import {
  AddOrUpdateCurrentVisualizationAction,
  UpdateCurrentVisualizationWithDataSelectionsAction
} from '../../store/actions/current-visualization.actions';
import {
  getAllFunctionRules,
  getFunctionRuleEntities
} from '../../shared/modules/ngx-dhis2-data-selection-filter/modules/data-filter/store/reducers/function-rule.reducer';

import * as fromModels from '../../shared/modules/ngx-dhis2-data-selection-filter/modules/data-filter/store/models';
import { getFunctions } from '../../shared/modules/ngx-dhis2-data-selection-filter/modules/data-filter/store/selectors';
import { UpdateFunctionRule } from '../../shared/modules/ngx-dhis2-data-selection-filter/modules/data-filter/store/actions/function-rule.actions';
import { UpdateFunction } from '../../shared/modules/ngx-dhis2-data-selection-filter/modules/data-filter/store/actions/function.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectionFilterConfig: SelectionFilterConfig;
  currentUser$: Observable<User>;
  systemInfo$: Observable<SystemInfo>;
  currentVisualization$: Observable<CurrentVisualizationState>;
  currentVisualizationDataSelections$: Observable<VisualizationDataSelection[]>;
  functionList$: Observable<fromModels.FunctionObject[]>;
  constructor(private store: Store<AppState>) {
    this.currentUser$ = store.select(getCurrentUser);
    this.systemInfo$ = store.select(getSystemInfo);
    this.currentVisualization$ = store.select(getCurrentVisualization);
    this.currentVisualizationDataSelections$ = store.select(
      getCurrentVisualizationDataSelections
    );

    this.functionList$ = store.select(getFunctions);

    this.selectionFilterConfig = {
      showLayout: false
    };
  }

  ngOnInit() {}

  onFilterUpdateAction(dataSelections: VisualizationDataSelection[]) {
    this.store.dispatch(
      new UpdateCurrentVisualizationWithDataSelectionsAction(dataSelections)
    );

    const dxObject = _.find(dataSelections, ['dimension', 'dx']);
    const functionRuleList = _.filter(
      dxObject ? dxObject.items : [],
      item => item.type === 'FUNCTION_RULE'
    );
    _.each(functionRuleList, (functionRule: any) => {
      this.store.dispatch(
        new UpdateFunctionRule(functionRule.id, { selected: true })
      );

      if (functionRule.functionObject) {
        this.store.dispatch(
          new UpdateFunction(functionRule.functionObject.id, { selected: true })
        );
      }
    });
  }

  onAddFavoriteAction(favoriteDetails: any) {}

  onCreateFavoriteAction() {}
}
