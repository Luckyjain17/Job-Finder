const initialState = {userData:null}
const ApiReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            console.log("action----------", action);
            return {userData:action.payload};
            case 'UPDATE_USER_DATA':
                return {userData:action.payload};
        default:
            return state;
    }
}

export default ApiReducers;
