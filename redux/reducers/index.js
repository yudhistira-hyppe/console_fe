import { combineReducers } from 'redux';

import Common from './Common';
import Profiles from './Profiles';
import Contents from './Contents';
import userReducers from './userReducers';
import monetizeReducers from './monetizeReducers';
import helpCenterReducers from './helpCenterReducers';
import Campaign from './Campaign';
import { authApi, userApi } from 'api/user';
import {
  dashboardApi,
  engagementApi,
  faqAndInfoApi,
  announcementApi,
  ticketApi,
  getUserHyppe,
  group,
  moduleAPI,
  divisiAPI,
  bantuanPenggunaApi,
  iklanApi,
  transactionAPI,
  kontenApi,
  mediaApi,
  contentApi,
  boostAPI,
  adsApi,
  dashboardMonetizeAPI,
} from 'api/console';
import { utilsApi } from 'api/utils';
import { contentAPI } from 'api/user/content';
import { notificationAPI } from 'api/user/notification';
import { commentAPI } from 'api/user/comment';
import { insightAPI } from 'api/user/insight';
import { accountBalancesAPI } from 'api/user/accountBalances';
import { contentManagementAPI } from 'api/user/content/management';
import { userFriendAPI } from 'api/user/friend';
import { voucherApi, adAPI } from 'api/console/monetize';
import { bankApi, kycApi } from 'api/console/helpCenter';

export default combineReducers({
  common: Common,
  profilesReducer: Profiles,
  contentsReducer: Contents,
  userReducers,
  monetizeReducers,
  helpCenterReducers,
  campaignReducer: Campaign,
  [utilsApi.reducerPath]: utilsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [engagementApi.reducerPath]: engagementApi.reducer,
  [faqAndInfoApi.reducerPath]: faqAndInfoApi.reducer,
  [announcementApi.reducerPath]: announcementApi.reducer,
  [ticketApi.reducerPath]: ticketApi.reducer,
  [contentAPI.reducerPath]: contentAPI.reducer,
  [notificationAPI.reducerPath]: notificationAPI.reducer,
  [commentAPI.reducerPath]: commentAPI.reducer,
  [insightAPI.reducerPath]: insightAPI.reducer,
  [contentManagementAPI.reducerPath]: contentManagementAPI.reducer,
  [accountBalancesAPI.reducerPath]: accountBalancesAPI.reducer,
  [userFriendAPI.reducerPath]: userFriendAPI.reducer,
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
  [mediaApi.reducerPath]: mediaApi.reducer,
  [contentApi.reducerPath]: contentApi.reducer,
  [kycApi.reducerPath]: kycApi.reducer,
  [bankApi.reducerPath]: bankApi.reducer,
  [boostAPI.reducerPath]: boostAPI.reducer,
  [adsApi.reducerPath]: adsApi.reducer,
  [dashboardMonetizeAPI.reducerPath]: dashboardMonetizeAPI.reducer,
});
