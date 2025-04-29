interface Response<T> {
  message: string;
  status: "error" | "success" | "info";
  data: T;
}

export default Response;
