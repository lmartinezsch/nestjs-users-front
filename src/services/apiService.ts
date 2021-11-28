import axios, { AxiosInstance, CancelToken, ResponseType } from "axios";
import { requestEnd, requestStart } from "../actions/api";
import history from "./history";

export interface APIOptions {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: any;
  params?: any;
  cancelToken?: any;
  responseType?: ResponseType;
  onDownloadProgress?: (_progressEvent: any) => void;
}

class API {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
    });
    // JWT Authorization
    this.client.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem("jwt");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        const impersonate = localStorage.getItem("impersonate");
        if (impersonate) config.headers["X-Impersonate-User"] = impersonate;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  get(url: string, config?: any) {
    return this.client.get(url, config);
  }

  post(url: string, data?: any, config?: any) {
    return this.client.post(url, data, config);
  }

  put(url: string, data?: any, config?: any) {
    return this.client.put(url, data, config);
  }

  delete(url: string, config?: any) {
    return this.client.delete(url, config);
  }

  send(options: APIOptions) {
    return this.client.request(options);
  }
}

const client = new API();

export default client;

export interface RequestOptions {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: any;
  cancelToken?: CancelToken;
  responseType?: ResponseType;
  onDownloadProgress?: (_progressEvent: any) => void;
}

export const getCancelToken = () => {
  const cancel = axios.CancelToken.source();
  return cancel;
};

export async function sendRequest(
  dispatch: any,
  requestOptions: RequestOptions
) {
  const { url, method, data, cancelToken, responseType, onDownloadProgress } =
    requestOptions;
  const options: APIOptions = {
    url,
    method,
  };
  if (data) {
    const dataKey = ["GET", "DELETE"].includes(method) ? "params" : "data";
    options[dataKey] = data;
  }

  if (cancelToken) {
    options.cancelToken = cancelToken;
  }

  if (responseType) {
    options.responseType = responseType;
  }

  if (onDownloadProgress) {
    options.onDownloadProgress = onDownloadProgress;
  }

  dispatch(requestStart());
  let unauthorized = false;
  let responseError: any = undefined;

  const response = client
    .send(options)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        const { data, statusText, status, message } = error.response;

        if (status === 403 || status === 401) {
          unauthorized = true;
        }

        if (data) {
          responseError = data;
        } else if (statusText) {
          responseError = {
            success: false,
            message: statusText,
          };
        } else {
          responseError = {
            success: false,
            message: message,
          };
        }
      } else {
        responseError = {
          success: false,
          message: error,
        };
      }
      return responseError;
    })
    .finally(() => {
      dispatch(requestEnd());
      if (unauthorized) {
        history.push("/logout", { unauthorized: true });
      }
    });

  return response;
}
