
/*
* File: Reducer.js
* The redux store that maintains the application wide state.
*/
import {
    USER_LOGIN,
    AUTH_OBJ,
    SHOW_LOADER,
    OPERATOR_CREATE,
    OPERATOR_LIST,
    OPERATOR_DELETE,
    OPERATOR_CURRENT_PAGE
} from '../actions/ActionTypes';
import _ from 'lodash';

const initialState = {
    is_sidemenu: true,
    menu_name: 'Operators',
    router_menu_name: 'dashboard',
    user_login: false,
    OperatorData: [
        {
            operator_id: '1',
            operator: 'Operator 1',
            prefix: '111',
            price: '1',
            last_modified_date_time: '2019-01-01 10:00:00'
        },
        {
            operator_id: '2',
            operator: 'Operator 2',
            prefix: '222',
            price: '1.5',
            last_modified_date_time: '2019-01-02 10:00:00'
        }
    ],
    authObj: null,
    show_loader: false,
    currentPage: 0
}

//Bassed on the action types which is there in each case of the switch statement, the state is udated.
//All the operations from the Actions.js is handled here.
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_OBJ:
            state = {
                ...state,
                authObj: action.payload
            }
            return state;

        case SHOW_LOADER:
            state = {
                ...state,
                show_loader: action.payload
            }
            return state;

        case USER_LOGIN:
            state = {
                ...state,
                user_login: action.payload
            }
            return state;

        case OPERATOR_CURRENT_PAGE:
            state = {
                ...state,
                currentPage: action.payload ? action.payload : 0
            }
            return state;

        case OPERATOR_LIST:
            state = {
                ...state
            }
            return state;

        case OPERATOR_CREATE:
            if (!_.isNull(action.payload)) {
                const newOperator = { ...action.payload, operator_id: state.OperatorData.length + 1 };
                state = {
                    ...state,
                    OperatorData: [...state.OperatorData, newOperator],
                    currentPage: 0
                }
            }

            return state;

        case OPERATOR_DELETE:
            const OperatorObj = action.payload;
            // Get the index of the object
            const brindx = _.findIndex(state.OperatorData, (o) => { return o.operator_id === OperatorObj.operator_id; });

            if (brindx !== -1 && !_.isNull(OperatorObj)) {
                state = {
                    ...state,
                    OperatorData: [...state.OperatorData.slice(0, brindx), ...state.OperatorData.slice(brindx + 1)]
                }
            }

            return state;

        default:
            return state;
    }
}

export default reducer;