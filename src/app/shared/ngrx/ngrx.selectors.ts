import { createSelector,createFeatureSelector } from "@ngrx/store";
import { loginResponseData } from "src/app/config/config.types";

export const selectUserDetailsState = createFeatureSelector<loginResponseData>('something')
export const selectUserDetails = createSelector(selectUserDetailsState,(state)=>state)