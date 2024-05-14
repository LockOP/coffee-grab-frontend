import { LOG_IN, LOG_OUT, UPDATE_USER } from "../constants";

export function log_in_redux(requiredParameters: any) {
  return {
    type: LOG_IN,
    data: requiredParameters,
  };
}

export function log_out_redux() {
  return {
    type: LOG_OUT,
    data: null,
  };
}

export function update_user_redux(requiredParameters: any) {
  return {
    type: UPDATE_USER,
    data: requiredParameters,
  };
}
