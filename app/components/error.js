import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/error";

export default class Error extends React.PureComponent {
    render() {
        if (!this.props.error) {
            return null;
        }

        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={styles.view}
                    onPress={this.props.press}
                >
                    <Text style={styles.text}>{this.props.text}</Text>
                    <Text style={styles.refresh}>Tap to refresh</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
