import applicantReducer from "./modules/applicants/Reducer";
import authReducer from "./modules/auth/Reducer";
import { combineReducers } from "redux";
import contactReducer from "./modules/contact/Reducer";
import notificationsReducer from "./modules/notifications/Reducer";
import ordersReducer from "./modules/orders/Reducer";
import packagesReducer from "./modules/packages/Reducer";
import paymentReducer from "./modules/payment/Reducer";
import userReducer from "./modules/user/Reducer";
import vacationsReducer from "./modules/vacations/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  contact: contactReducer,
  applicant: applicantReducer,
  packages: packagesReducer,
  user: userReducer,
  orders: ordersReducer,
  notifications: notificationsReducer,
  vacations: vacationsReducer,
  payment: paymentReducer,
});

export default rootReducer;
