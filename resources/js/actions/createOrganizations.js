import Api from "../utils/api";

export const organizationSave = postData => dispatch => {
    Api.organizationSave(postData)
        .then(result => {
            console.log(result.data);
            dispatch({ type: 'HIDE_LOADING', is_loading: false, loading_message: '' });
            dispatch({ type: 'SET_NOTIFY', message:  "Organization Succcessfully saved.", color: "success"});
            dispatch({ type: 'CLOSE_CUSTOMER_FORM' });
            dispatch({ type: 'NEW_CUSTOMER_SAVE' });
            dispatch({
              type: NEW_CUSTOMER,
              payload: result.data.organization
            })
        })
        .catch(error => {
            dispatch({ type: 'SET_NOTIFY', message:  "something went wrong!", color: "error"});
            dispatch({ type: 'HIDE_LOADING', is_loading: false, loading_message: '' });
        });
};
