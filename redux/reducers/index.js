import { combineReducers } from 'redux';

import Common from './Common';
import Profiles from './Profiles';
import Contents from './Contents';
import userReducers from './userReducers';
import monetizeReducers from './monetizeReducers';
import helpCenterReducers from './helpCenterReducers';
import Campaign from './Campaign';
import { authApi, userApi } from 'api/user';
import { dashboardApi, engagementApi } from 'api/console';

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
});
