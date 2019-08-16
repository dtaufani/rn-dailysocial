import React from "react";
import { NavigationActions } from "react-navigation";
import { BackHandler } from "react-native";
import { connect } from "react-redux";
import AppNavigator from "../navigations/router";

export default connect(state => ({
    navigation: state.navigation
}))(
    class Main extends React.Component {
        constructor(props) {
            super(props);

            this.back = this.back.bind(this);
        }

        componentDidMount() {
            BackHandler.addEventListener("hardwareBackPress", this.back);
        }

        componentWillUnmount() {
            BackHandler.removeEventListener("hardwareBackPress", this.back);
        }

        close = navigation => {
            if (navigation.index > 0) return false;

            if (navigation.routes) {
                return navigation.routes.every(this.close);
            }

            return true;
        };

        back() {
            const { dispatch, navigation } = this.props;
            if (this.close(navigation)) {
                return false;
            }

            dispatch(NavigationActions.back());
            return true;
        }

        render() {
            return <AppNavigator />;
        }
    }
);
