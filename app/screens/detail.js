import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import moment from "moment";
import AutoHeightWebView from "react-native-autoheight-webview";
import Loader from "../components/loader";
import Error from "../components/error";
import styles from "../styles/detail";
import strings from "../utilities/string";

export default class Detail extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: strings.capitalise(navigation.state.params.news.type)
        };
    };

    constructor(props) {
        super(props);

        this.error = this.error.bind(this);
        this.loading = this.loading.bind(this);
    }

    error() {
        return (
            <Error
                error={true}
                press={this.refresh}
                text="Error occurred while loading the article"
            />
        );
    }

    loading() {
        return <Loader loading={true} size="large" color="#0d57a7" />;
    }

    render() {
        const { news } = this.props.navigation.state.params;

        return (
            <View style={styles.body}>
                <ScrollView>
                    <View style={styles.header}>
                        <Text style={styles.title}>{news.title}</Text>
                        <Text style={styles.date}>
                            {moment(news.date, "YYYY-MM-DD HH:mm:ss").format(
                                "ll"
                            )}
                        </Text>
                    </View>
                    <Image source={{ uri: news.image }} style={styles.image} />
                    <AutoHeightWebView
                        startInLoadingState
                        source={{ html: news.content }}
                        renderError={this.error}
                        renderLoading={this.loading}
                    />
                </ScrollView>
            </View>
        );
    }
}
