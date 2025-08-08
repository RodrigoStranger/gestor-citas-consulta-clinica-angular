export interface FieldError {
  field: string;
  code: string;
  message: string;
}

export default interface ModelError {
  message: string;
  status: number;
  errorCode: string | null;
  errors?: FieldError[];
}
