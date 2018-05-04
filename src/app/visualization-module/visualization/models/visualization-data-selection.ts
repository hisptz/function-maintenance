import { VisualizationSelectionDimension } from './visualization-selection-dimension';
import { VisualizationDataSelectionConfig } from './visualization-data-selection-config';

export interface VisualizationDataSelection {
  selectionDimensions: VisualizationSelectionDimension[];
  analyticsType: string;
  config?: VisualizationDataSelectionConfig;
}
