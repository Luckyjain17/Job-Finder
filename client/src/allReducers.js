import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import  ApiReducers  from './Redux/reducers/ApiReducers'
// import thunk from "redux-thunk"
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const routeReducer = combineReducers({
    ApiReducers,
})

const store = createStore(routeReducer, composedEnhancer)

export default store
