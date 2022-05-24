import {DECREASE_CAMPAIGN_STEPS, INCREASE_CAMPAIGN_STEPS} from "../reducers/Campaign";

export const decreaseSteps = () => {
    return (dispatch) => {
        dispatch({type: DECREASE_CAMPAIGN_STEPS});
    };
};

export const increaseSteps = ()=>{
    return (dispatch) => {
        dispatch({type: INCREASE_CAMPAIGN_STEPS});
    };
};
