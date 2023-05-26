import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import ErrorBoundary from './components/containers/ErrorBoundary';
import TheLayout from './components/containers/TheLayout';
import store from './store';

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <HashRouter>
          <TheLayout />
        </HashRouter>
      </Provider>
    </ErrorBoundary>
  );
};
/*final*/

export default App;
