import { Provider } from "react-redux";

export const withRedux = (Component) => (store) => {
  return (
    <Provider store={store}>
      <Component></Component>
    </Provider>
  );
};
