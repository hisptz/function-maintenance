import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// models
import { VisualizationConfig } from '../../models';

// actions
import {
  VisualizationConfigurationAction,
  VisualizationConfigurationActionTypes
} from '../actions';

export interface VisualizationConfigurationState
  extends EntityState<VisualizationConfig> {}

export const visualizationConfigurationAdapter: EntityAdapter<
  VisualizationConfig
> = createEntityAdapter<VisualizationConfig>();

const initialState: VisualizationConfigurationState = visualizationConfigurationAdapter.getInitialState(
  {}
);

export function visualizationConfigurationReducer(
  state: VisualizationConfigurationState = initialState,
  action: VisualizationConfigurationAction
): VisualizationConfigurationState {
  switch (action.type) {
    case VisualizationConfigurationActionTypes.ADD_VISUALIZATION_CONFIGURATION:
      return visualizationConfigurationAdapter.addOne(
        action.visualizationConfiguration,
        state
      );
    case VisualizationConfigurationActionTypes.UPDATE_VISUALIZATION_CONFIGURATION:
      return visualizationConfigurationAdapter.updateOne(
        { id: action.id, changes: action.changes },
        state
      );
    case VisualizationConfigurationActionTypes.RemoveVisualizationConfiguration: {
      return visualizationConfigurationAdapter.removeOne(action.id, state);
    }
  }
  return state;
}
