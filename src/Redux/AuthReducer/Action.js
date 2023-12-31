import {
  LOGIN_FAILURE,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  PROFILE_FAILURE,
  PROFILE_LOADING,
  PROFILE_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from './ActionType';
import axios from 'axios';

export const register = (payload) => (dispatch) => {
  console.log('test signUpHandler');
  dispatch({ type: REGISTER_LOADING });
  console.log(payload);
  return axios
    .post(`http://localhost:3000/api/auth/register`, payload)
    .then((r) => {
      dispatch({ type: REGISTER_SUCCESS, payload: r.data });
      return REGISTER_SUCCESS;
    })
    .catch((e) => {
      dispatch({ type: REGISTER_FAILURE, payload: e });
      return REGISTER_FAILURE;
    });
};

export const login = (payload) => (dispatch) => {
  dispatch({ type: LOGIN_LOADING });

  return axios
    .post(`http://localhost:3000/api/auth/login`, payload)
    .then((r) => {
      dispatch({ type: LOGIN_SUCCESS, payload: r.data.token });
      return LOGIN_SUCCESS;
    })
    .catch((e) => {
      dispatch({ type: LOGIN_FAILURE, payload: e });
      return LOGIN_FAILURE;
    });
};

export const logout = () => (dispatch) => {
  return dispatch({ type: LOGOUT_SUCCESS });
};

export const profile = (username, token) => (dispatch) => {
  dispatch({ type: PROFILE_LOADING });

  return axios
    .get(`http://localhost:3000/api/auth/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((r) => {
      console.log(r.data);
      dispatch({ type: PROFILE_SUCCESS, payload: r.data });
      return LOGIN_SUCCESS;
    })
    .catch((e) => {
      dispatch({ type: PROFILE_FAILURE, payload: e });
      return LOGIN_FAILURE;
    });
};
