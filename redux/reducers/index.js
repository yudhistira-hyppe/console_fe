import { combineReducers } from 'redux';

import Common from './Common';
import Profiles from './Profiles';
import Contents from './Contents';
import userReducers from './userReducers';
import monetizeReducers from './monetizeReducers';
import helpCenterReducers from './helpCenterReducers';
import Campaign from './Campaign';
import { authApi, userApi } from 'api/user';
import { dashboardApi, engagementApi, faqAndInfoApi, announcementApi, ticketApi, getUserHyppe } from 'api/console';
import { contentAPI } from 'api/user/content';
import { notificationAPI } from 'api/user/notification';
import { commentAPI } from 'api/user/comment';
import { insightAPI } from 'api/user/insight';
import { accountBalancesAPI } from 'api/user/accountBalances';
import { contentManagementAPI } from 'api/user/content/management';
import { userFriendAPI } from 'api/user/friend';

export default combineReducers({
  common: Common,
  profilesReducer: Profiles,
  contentsReducer: Contents,
  userReducers,
  monetizeReducers,
  helpCenterReducers,
  campaignReducer: Campaign,
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
  [getUserHyppe.reducerPath]: getUserHyppe.reducer,
});
