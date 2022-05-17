exports.onClientEntry = () => {
  if (localStorage && 'setItem' in localStorage) {
    localStorage.setItem('darkMode', 'false');
  }
  const pageBodyClass = document.body.classList;
  if (pageBodyClass.contains('dark-mode')) {
    pageBodyClass.replace('dark-mode', 'light-mode');
  }
};
