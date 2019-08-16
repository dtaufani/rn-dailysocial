import React from "react";
import { ActivityIndicator } from "react-native";
import appearance from "../styles/loader";

export default class Loader extends React.Component {
    render() {
        if (!this.props.loading) {
            return null;
        }

        return (
            <ActivityIndicator
                animating={this.props.loading}
                color={this.props.color}
                size={this.props.size}
                style={appearance}
            />
        );
    }
}
