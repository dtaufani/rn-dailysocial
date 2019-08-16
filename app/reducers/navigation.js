import { NavigationActions } from "react-navigation";
import AppNavigator from "../navigations/router";

const initialAction = { type: NavigationActions.Init };
const initialState = AppNavigator.router.getStateForAction(initialAction);

function hasProp(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

function getCurrentRouteName(nav) {
    if (!hasProp(nav, "index") || !hasProp(nav, "routes")) return nav.routeName;
    return getCurrentRouteName(nav.routes[nav.index]);
}

function getActionRouteName(action) {
    const hasNestedAction = Boolean(
        hasProp(action, "action") &&
            hasProp(action, "type") &&
            typeof action.action !== "undefined"
    );

    const nestedActionWillNavigate = Boolean(
        hasNestedAction && action.action.type === NavigationActions.NAVIGATE
    );

    if (hasNestedAction && nestedActionWillNavigate) {
        return getActionRouteName(action.action);
    }

    return action.routeName;
}

const reducer = (state = initialState, action) => {
    const { type } = action;

    if (type === NavigationActions.NAVIGATE) {
        if (getActionRouteName(action) === getCurrentRouteName(state)) {
            return state;
        }
    }

    return AppNavigator.router.getStateForAction(action, state) || state;
};

export default reducer;
