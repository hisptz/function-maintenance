export interface VisualizationLayout {
  rows: Array<{
    name: string;
    value: string;
  }>;
  columns: Array<{
    name: string;
    value: string;
  }>;
  filters: Array<{
    name: string;
    value: string;
  }>;
  excluded: Array<{
    name: string;
    value: string;
  }>;
}
