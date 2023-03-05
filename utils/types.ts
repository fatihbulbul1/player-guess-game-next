export interface ResponseFuncs {
  GET?: Function;
  POST?: Function;
  PUT?: Function;
  DELETE?: Function;
}

// Interface to define our Todo model on the frontend
export interface User {
  _id?: number;
  name: string;
  password: string;
  points: number;
}
