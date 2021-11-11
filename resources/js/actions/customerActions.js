import Api from "../utils/api";
import { FETCH_CUSTOMERS, NEW_CUSTOMER, NEW_CUSTOMER_SAVE, NEW_CUSTOMER_SAVE_CLEAR, NEW_CUSTOMER_SAVE_CLOSE } from './types';


export const openFormAdd = () => dispatch => {
  //dispatch({ type: 'NEW_CUSTOMER_SAVE_CLOSE' });
  dispatch({ type: 'OPEN_CUSTOMER_FORM' });
};


export const fetchCustomers = () => dispatch => {
  Api.fetchCustomer().then((result) => {
    dispatch({
      type: FETCH_CUSTOMERS,
      payload: result.data
    })
  }).catch((error) => {
    console.log(error);
  });
};

export const createCustomer = postData => dispatch => {
  Api.CustomerSave(postData).then((result) => {;
    dispatch({ type: 'HIDE_LOADING', is_loading: false, loading_message: '' });
    dispatch({ type: 'SET_NOTIFY', message:  "Customer Succcessfully saved.", color: "success"});
    dispatch({ type: 'CLOSE_CUSTOMER_FORM' });
    dispatch({ type: 'NEW_CUSTOMER_SAVE' });
    dispatch({
      type: NEW_CUSTOMER,
      payload: result.data.customer
    })
  }).catch((error) => {
    console.log(error);
    dispatch({ type: 'SET_NOTIFY', message:  "something went wrong!", color: "error"});
    dispatch({ type: 'HIDE_LOADING', is_loading: false, loading_message: '' });
  });
};

export const newCustomerSave = () => dispatch => {
  dispatch({ type: 'NEW_CUSTOMER_SAVE' });
};

export const new_customer_item_add = () => dispatch => {
  dispatch({ type: 'NEW_CUSTOMER_SAVE_CLEAR' });
 
};

export const newCustomerSaveClose = () => dispatch => {    console.log('newCustomerSaveClose -->');
  dispatch({ type: 'NEW_CUSTOMER_SAVE_CLOSE' });
};







