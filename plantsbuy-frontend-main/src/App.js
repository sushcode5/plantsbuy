import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import StoreScreen from "./screens/StoreScreen";
import RefundPolicyScreen from "./screens/RefundPolicyScreen";
import PrivacyPolicyScreen from "./screens/PrivacyPolicyScreen";
import ShippingPolicyScreen from "./screens/ShippingPolicyScreen";
import TermsScreen from "./screens/TermsScreen";
import PrivateRoute from "./components/PrivateRoute";
import Navigation from "./components/Navigation";
import FooterContainer from "./components/FooterContainer";
import ContactScreen from "./screens/ContactScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  return (
    <>
      <HashRouter>
        <Navigation />
        <Switch>
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/payment" component={PaymentMethodScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/orderhistory" component={OrderHistoryScreen} />
          <PrivateRoute path="/profile" component={ProfileScreen} />
          <Route path="/store" component={StoreScreen} exact />
          <Route path="/contact" component={ContactScreen} />
          <Route path="/privacypolicy" component={PrivacyPolicyScreen} />
          <Route path="/refundpolicy" component={RefundPolicyScreen} />
          <Route path="/shippingpolicy" component={ShippingPolicyScreen} />
          <Route path="/termsofservices" component={TermsScreen} />
          <Route path="/" component={HomeScreen} exact />
        </Switch>
      </HashRouter>
    </>
  );
}
export default App;
