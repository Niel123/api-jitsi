export function setLoading(loading) {
    return {
        type: SET_LOADING,
        loading: loading
    }
}

export function hideLoading() {
    return {
        type: HIDE_LOADING
    }
}
