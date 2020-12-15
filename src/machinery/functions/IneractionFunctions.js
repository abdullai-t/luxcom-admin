import Axios from "axios";
import {
  LOGIN_URL,
  GET_USER_PROFILE_URL,
  SAVE_ROOM_TO_BACKEND_URL,
  SAVE_SERVICE_TO_BACKEND_URL,
  DELETE_SERVICE_FROM_BACKEND_URL,
  SAVE_ROOM_EDIT_TO_BACKEND_URL,
  SAVE_SERVICE_EDIT_TO_BACKEND_URL,
  DELETE_ROOM_FROM_BACKEND_URL,
  CHANGE_PASSWORD_URL,
  DELETE_RESERVATION_URL,
  REGISTER_URL,
} from "../Konstants";

export const LoginUser = (cred) => {
  let user = Axios.post(LOGIN_URL, cred)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

  return user;
};

export const CreateStaff = (data) => {
  let user = Axios.post(REGISTER_URL, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

  return user;
};

export const getUserProfileData = (token) => {
  let data = Axios.get(GET_USER_PROFILE_URL, {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  return data;
};
export const updateUserProfile = (token,data) => {
  let response = Axios.patch(GET_USER_PROFILE_URL, data,{
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  return response;
};

export const saveRoomToBackend = (token, data) => {
  let response = Axios.post(SAVE_ROOM_TO_BACKEND_URL, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  return response;
};

export const saveServiceToBackend = (token, data) => {
  let response = Axios.post(SAVE_SERVICE_TO_BACKEND_URL, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  return response;
};

export const deleteServiceFromBackend = (token, name) => {
  let response = Axios.delete(`${DELETE_SERVICE_FROM_BACKEND_URL + name}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  return response;
};

export const saveServiceEditToBackend = (token, data, id) => {
  let response = Axios.patch(
    `${SAVE_SERVICE_EDIT_TO_BACKEND_URL + id}/`,
    data,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  return response;
};

export const deleteRoomFromBackend = (token, name) => {
  let response = Axios.delete(`${DELETE_ROOM_FROM_BACKEND_URL + name}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err.data));
  return response;
};
export const saveRoomEditToBackend = (token, data, id) => {
  let response = Axios.patch(`${SAVE_ROOM_EDIT_TO_BACKEND_URL + id}/`, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  return response;
};

export const changePassword = (token, data,) => {
  let response = Axios.post(CHANGE_PASSWORD_URL, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  return response;
};

export const deleteReservation = (token, id) => {
  let response = Axios.delete(`${DELETE_RESERVATION_URL+id}/`,  {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  return response;
};
