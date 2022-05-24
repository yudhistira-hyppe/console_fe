import { combineReducers } from 'redux'

import Common from './Common'
import Profiles from './Profiles'
import Contents from './Contents'
import userReducers from './userReducers'
import monetizeReducers from './monetizeReducers'
import helpCenterReducers from './helpCenterReducers'
import Campaign from './Campaign'

export default combineReducers({
  common: Common,
  profilesReducer: Profiles,
  contentsReducer: Contents,
  userReducers,
  monetizeReducers,
  helpCenterReducers,
  campaignReducer: Campaign
});
