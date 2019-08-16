export default {
    capitalise(phrase) {
        return phrase.replace(/\w\S*/g, word => {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        });
    }
};
