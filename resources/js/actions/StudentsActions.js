import { FETCH_CUSTOMERS, NEW_CUSTOMER, NEW_CUSTOMER_SAVE, NEW_CUSTOMER_SAVE_CLEAR, NEW_CUSTOMER_SAVE_CLOSE ,CLOSE_CUSTOMER_FORM} from './types';
import Api from "../utils/api";

export const openFormAdd = () => dispatch => {
    //dispatch({ type: 'NEW_CUSTOMER_SAVE_CLOSE' });
    dispatch({ type: 'OPEN_STUDENT_FORM' });
  };



export const studentSave = postData => dispatch => {
    Api.studentSave(postData)
        .then(result => {
            dispatch({ type: 'HIDE_LOADING', is_loading: false, loading_message: '' });
            dispatch({ type: 'SET_NOTIFY', message:  "Student succcessfully saved.", color: "success"});
           dispatch({ type: 'CLOSE_CUSTOMER_FORM' });
            dispatch({ type: 'NEW_STUDENT_SAVE' });
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


