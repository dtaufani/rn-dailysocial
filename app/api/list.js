const api = {
    domain: "https://bridge.dailysocial.id",
    path: "/bridge/recent",
    params: {
        page: "page=",
        limit: "limit="
    },
    headers: {
        Accept: "application/json"
    }
};

export default {
    get: async function(page, limit) {
        const url =
            api.domain +
            api.path +
            "?" +
            api.params.page +
            page +
            "&" +
            api.params.limit +
            limit;

        return fetch(url, {
            ...api.headers,
            method: "GET"
        });
    }
};
