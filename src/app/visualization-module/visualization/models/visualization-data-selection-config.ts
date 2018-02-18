export interface VisualizationDataSelectionConfig {
  aggregationType?: string;
  displayNameProperty?: string;
  program?: {
    id: string;
    name: string;
  };
  programStage?: {
    id: string;
    name: string;
  };
}
