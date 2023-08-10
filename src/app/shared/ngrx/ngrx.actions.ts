import { createAction, props } from "@ngrx/store";

export const setUserDetails = createAction(
  'setUserDetails',
  props<{ userId: string; name: string; email: string; accessToken: string }>()
);
export const resetUserDetails = createAction('resetUserDetails')