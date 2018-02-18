import { VisualizationLayerConfig } from './visualization-layer-config';
import { VisualizationLayout } from './visualization-layout';
import { VisualizationDataSelection } from '../models';

export interface VisualizationLayer {
  id: string;
  data: any;
  dataSelection?: VisualizationDataSelection;
  layerType?: string;
  config?: VisualizationLayerConfig;
  layout?: VisualizationLayout;
}
