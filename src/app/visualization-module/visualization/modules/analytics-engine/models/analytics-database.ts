export interface AnalyticsDatabase {
  dateCreated: string;
  data: {
    aggregate: {
      [id: string]: number
    }
  };
}
