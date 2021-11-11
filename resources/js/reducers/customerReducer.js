import { FETCH_CUSTOMERS, NEW_CUSTOMER, OPEN_CUSTOMER_FORM, CLOSE_CUSTOMER_FORM, NEW_CUSTOMER_SAVE, NEW_CUSTOMER_SAVE_CLOSE , NEW_CUSTOMER_SAVE_CLEAR  } from '../actions/types';

const initialState = {
  customerForm: false,
  newCustomerSave: false,
  items: [],
  item: {},
};

export default function (state = initialState, action) {
  const { newCustomerSave } = action;
  switch (action.type) {
    case FETCH_CUSTOMERS:
      return {
        ...state,
        items: action.payload
      };
      case OPEN_CUSTOMER_FORM:
      return {
        ...state,
        customerForm: true
      };
      case CLOSE_CUSTOMER_FORM:
        return {
          ...state,
          customerForm: false
        };
    case NEW_CUSTOMER:
      return {
        ...state,
        item: action.payload
      };
      case CLOSE_CUSTOMER_FORM:
      return {
        ...state,
        item: action.payload
      };
      case NEW_CUSTOMER_SAVE_CLOSE:
      return {
        ...state,
        newCustomerSave: true
      };
      case NEW_CUSTOMER_SAVE:
      return {
        ...state,
        newCustomerSave: true
      };
      case NEW_CUSTOMER_SAVE_CLEAR:
      return {
        ...state,
        item: {}
      };
    default:
      return state;
  }
}
