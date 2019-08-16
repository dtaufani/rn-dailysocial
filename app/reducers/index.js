import { combineReducers } from "redux";
import navigation from "./navigation";
import list from "./list";

const reducer = combineReducers({
    navigation,
    list
});

export default reducer;
