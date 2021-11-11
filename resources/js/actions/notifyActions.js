export function setNotify(notify) {
    return {
        type: SET_NOTIFY,
        message: notify
    }
}

export function hideNotify() {
    return {
        type: HIDE_NOTIFY
    }
}
