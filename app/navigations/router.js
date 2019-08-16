import { createStackNavigator } from "react-navigation";
import List from "../screens/list";
import Detail from "../screens/detail";

const Root = createStackNavigator({
    list: {
        screen: List
    },
    detail: {
        screen: Detail
    }
});

export default Root;
