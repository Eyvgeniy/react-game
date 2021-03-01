const storage = window.localStorage;

const setToLocalStorage = (state) => {
  const stringifyState = JSON.stringify(state);
  storage.setItem('state', stringifyState);
};

const getStateFromLocalStorage = () => {
  const stringifyState = storage.getItem('state');
  return JSON.parse(stringifyState);
};

export { setToLocalStorage, getStateFromLocalStorage };
