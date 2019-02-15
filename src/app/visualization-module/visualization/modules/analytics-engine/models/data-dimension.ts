export interface Dimension {
  dimension: string;
  layoutPosition?: string;
  value: string;
}

export interface DimensionConfig {
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

export interface DataDimension {
  dimensions: Dimension[];
  analyticsType: string;
  config?: DimensionConfig;
}
