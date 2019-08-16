import api from "../api/list";
import constants from "../constants/list";

const list = {
    error(result) {
        return {
            error: result,
            type: constants.error
        };
    },

    get() {
        return {
            type: constants.get
        };
    },

    set(page, result) {
        return {
            page: page,
            items: result.news.posts,
            total: result.news.pages,
            type: constants.set
        };
    }
};

export default {
    get(page, limit) {
        return dispatch => {
            dispatch(list.get());

            return api
                .get(page, limit)

                .then(response => response.json())

                .then(data => dispatch(list.set(page, data)))

                .catch(data => dispatch(list.error(data)));
        };
    }
};
