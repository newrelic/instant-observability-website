exports.onClientEntry = () => {
  const pageBodyClass = document.body.classList;
  if (pageBodyClass.contains('dark-mode')) {
    pageBodyClass.replace('dark-mode', 'light-mode');
  }
};
