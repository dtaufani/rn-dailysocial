import constants from "../constants/list";

export default function(
    state = {
        error: null,
        items: [],
        total: 0,
        loading: false
    },
    action = {}
) {
    switch (action.type) {
        case constants.error:
            return Object.assign({}, state, {
                error: action.error,
                loading: false
            });

        case constants.get:
            return Object.assign({}, state, {
                error: null,
                loading: true
            });

        case constants.set:
            return Object.assign({}, state, {
                error: null,
                items:
                    action.page > 1
                        ? [...state.items, ...action.items]
                        : action.items,
                total: action.total,
                loading: false
            });

        default:
            return state;
    }
}
