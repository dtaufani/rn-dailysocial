import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import Main from "./app/screens/main";
import store from "./app/configuration/store";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
}

AppRegistry.registerComponent("DailySocial", () => App);
