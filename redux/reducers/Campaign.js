export const DECREASE_CAMPAIGN_STEPS = 'DECREASE_STEPS';
export const INCREASE_CAMPAIGN_STEPS = 'INCREASE_STEPS';

export const ENUM_STEPS = {
    SET: 0,
    CREATE: 1,
    PAYMENT: 2
}

const INIT_STATE = {
    campaign: 0
};

const Campaign = (state = INIT_STATE, action) => {
    switch (action.type) {
        case DECREASE_CAMPAIGN_STEPS: {
            console.log('increase', action);
            return {
                ...state,
                campaign: state.campaign - 1,
            };
        }
        case INCREASE_CAMPAIGN_STEPS: {
            console.log('increase', action);
            return {
                ...state,
                campaign: state.campaign + 1,
            };
        }
        default:
            return state;
    }
};
export default Campaign;
