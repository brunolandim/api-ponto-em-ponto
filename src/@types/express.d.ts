declare namespace Express {
  export interface Request {
    user: {
      id: string;
      role: string;
      company: {
        id: any;
        name: string;
      }
    };
  }
}
