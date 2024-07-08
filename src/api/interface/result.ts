export interface Response {
  code: number;
  message: string;
  result: any;
  timestamp: string;
  [p: string]: any;
}
