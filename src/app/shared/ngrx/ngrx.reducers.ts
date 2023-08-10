import { createReducer, on } from '@ngrx/store';
import { setUserDetails, resetUserDetails } from './ngrx.actions';
import { userDetailsState } from './ngrx.states';
import { loginResponseData } from 'src/app/config/config.types';
import { localStorageSync } from 'ngrx-store-localstorage';

const _userDetailsReducer = createReducer(
  userDetailsState,

  on(setUserDetails, (state, action) => {
    // Update the state properties with values from the action's payload
    return {
      ...state,
      userId: action.userId,
      name: action.name,
      email: action.email,
      accessToken: action.accessToken,
    };
  }),

  // Handle resetUserDetails if needed
  on(resetUserDetails, (state) => {
    // Reset the userDetails properties to empty strings
    return {
      ...state,
      userId: '',
      name: '',
      email: '',
      accessToken: '',
    };
  })
);

// Create a meta-reducer that persists the state in local storage
export function localStorageSyncReducer(
  reducer: any
): (state: any, action: any) => any {
  return localStorageSync({
    keys: ['userDetailsState'], // Specify the state slice key to persist
    rehydrate: true,
  })(reducer);
}

// Wrap your reducer with the local storage meta-reducer
export function userDetailsReducer(
  state: loginResponseData | undefined,
  action: any
): loginResponseData {
  return localStorageSyncReducer(_userDetailsReducer)(state, action);
}
