/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// async function fetchAddress() {
//   // 1) We get the user's geolocation position
//   const positionObj = await getPosition();
//   const position = {
//     latitude: positionObj.coords.latitude,
//     longitude: positionObj.coords.longitude,
//   };

//   // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
//   const addressObj = await getAddress(position);
//   const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

//   // 3) Then we return an object with the data that we are interested in
//   return { position, address };
// }

export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
  return { position, address };
});

const initialState = {
  name: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createuser(state, { payload }) {
      state.name = payload;
    },
    clearstatus(state) {
      state.status = "idle";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddress.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(fetchAddress.fulfilled, (state, { payload }) => {
      state.position = payload.position;
      state.address = payload.address;
      state.status = "idle";
    });
    builder.addCase(fetchAddress.rejected, (state, { payload, error }) => {
      state.status = "error";
      state.error =
        "There was a problem getting your address. Make sure to fill this field!";
    });
  },
});

export const { createuser, clearstatus } = userSlice.actions;

export default userSlice.reducer;

export const getuserlocation = (state) => state.user.address;
