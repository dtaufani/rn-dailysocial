import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import Error from "../components/error";
import styles from "../styles/list";
import actions from "../actions/list";

export default connect(state => ({
    list: state.list
}))(
    class List extends React.Component {
        static navigationOptions = {
            title: "DailySocial"
        };

        constructor(props) {
            super(props);

            this.state = {
                page: 1,
                limit: 5
            };

            this.refresh = this.refresh.bind(this);
            this.row = this.row.bind(this);
            this.separator = this.separator.bind(this);
            this.more = this.more.bind(this);
        }

        componentDidMount() {
            this.load();
        }

        load() {
            this.props.dispatch(actions.get(this.state.page, this.state.limit));
        }

        refresh() {
            this.setState({ page: 1 }, () => {
                this.load();
            });
        }

        row({ index, item }) {
            return (
                <TouchableOpacity
                    key={"news" + "-" + index}
                    style={styles.item}
                    onPress={() =>
                        this.props.navigation.navigate("detail", {
                            news: item
                        })
                    }
                >
                    <View>
                        <View style={styles.placeholder} />
                        <Image
                            source={{
                                uri: item.thumbnail_images.thumbnail.url
                            }}
                            style={styles.image}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.date}>
                            {moment(item.date, "YYYY-MM-DD HH:mm:ss").format(
                                "ll"
                            )}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }

        more() {
            if (this.props.list.loading) {
                return;
            }

            if (this.state.page >= this.props.list.total) {
                return;
            }

            this.setState({ page: this.state.page + 1 }, () => {
                this.load();
            });
        }

        separator(section, row, highlighted) {
            return <View key={section + "-" + row} style={styles.border} />;
        }

        render() {
            if (this.props.list.error) {
                console.log(this.props.list.error);

                return (
                    <Error
                        error={this.props.list.error}
                        press={this.refresh}
                        text="Terjadi kesalahan, silahkan coba lagi"
                    />
                );
            }

            return (
                <View style={styles.body}>
                    <FlatList
                        data={this.props.list.items}
                        keyExtractor={item => item.type + item.id}
                        refreshing={this.props.list.loading}
                        onRefresh={this.refresh}
                        renderItem={this.row}
                        onEndReached={this.more}
                        onEndReachedThreshold={0.1}
                        ItemSeparatorComponent={this.separator}
                    />
                </View>
            );
        }
    }
);
