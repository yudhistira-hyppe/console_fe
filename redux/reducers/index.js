import { combineReducers } from 'redux';

import Common from './Common';
import Profiles from './Profiles';
import Contents from './Contents';
import userReducers from './userReducers';
import monetizeReducers from './monetizeReducers';
import helpCenterReducers from './helpCenterReducers';
import Campaign from './Campaign';
import { authApi, insightAPI, userFriendAPI } from 'api/user';
import {
  databaseApi,
  dashboardApi,
  engagementApi,
  ticketApi,
  getUserHyppe,
  group,
  moduleAPI,
  divisiAPI,
  bantuanPenggunaApi,
  iklanApi,
  transactionAPI,
  kontenApi,
  boostAPI,
  adsApi,
  dashboardMonetizeAPI,
  interestApi,
  settingApi,
  masterBankApi,
  adsUtilityApi,
  challengeApi,
  masterBadgeApi,
  challengeUtilityApi,
  voucherApi,
  adAPI,
  jualBeliAPI,
  bankApi,
  kycApi,
  announcementApi,
  communityUtilityApi,
} from 'api/console';
import filterParams from 'redux/slice/filterParams';

export default combineReducers({
  common: Common,
  profilesReducer: Profiles,
  contentsReducer: Contents,
  userReducers,
  monetizeReducers,
  helpCenterReducers,
  campaignReducer: Campaign,
  filterParams: filterParams,
  [authApi.reducerPath]: authApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [engagementApi.reducerPath]: engagementApi.reducer,
  [ticketApi.reducerPath]: ticketApi.reducer,
  [insightAPI.reducerPath]: insightAPI.reducer,
  // [userFriendAPI.reducerPath]: userFriendAPI.reducer,
  [voucherApi.reducerPath]: voucherApi.reducer,
  [getUserHyppe.reducerPath]: getUserHyppe.reducer,
  [group.reducerPath]: group.reducer,
  [moduleAPI.reducerPath]: moduleAPI.reducer,
  [divisiAPI.reducerPath]: divisiAPI.reducer,
  [bantuanPenggunaApi.reducerPath]: bantuanPenggunaApi.reducer,
  [iklanApi.reducerPath]: iklanApi.reducer,
  [kontenApi.reducerPath]: kontenApi.reducer,
  [transactionAPI.reducerPath]: transactionAPI.reducer,
  [adAPI.reducerPath]: adAPI.reducer,
  [databaseApi.reducerPath]: databaseApi.reducer,
  [kycApi.reducerPath]: kycApi.reducer,
  [bankApi.reducerPath]: bankApi.reducer,
  [boostAPI.reducerPath]: boostAPI.reducer,
  [adsApi.reducerPath]: adsApi.reducer,
  [dashboardMonetizeAPI.reducerPath]: dashboardMonetizeAPI.reducer,
  [jualBeliAPI.reducerPath]: jualBeliAPI.reducer,
  [interestApi.reducerPath]: interestApi.reducer,
  [settingApi.reducerPath]: settingApi.reducer,
  [masterBankApi.reducerPath]: masterBankApi.reducer,
  [adsUtilityApi.reducerPath]: adsUtilityApi.reducer,
  [challengeApi.reducerPath]: challengeApi.reducer,
  [masterBadgeApi.reducerPath]: masterBadgeApi.reducer,
  [challengeUtilityApi.reducerPath]: challengeUtilityApi.reducer,
  [announcementApi.reducerPath]: announcementApi.reducer,
  [communityUtilityApi.reducerPath]: communityUtilityApi.reducer,
});
