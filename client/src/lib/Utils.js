export const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type, };
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};

export function setCookie(cName, cValue, expireDate) {
  const d = new Date();

  d.setTime(d.getTime() + expireDate * 24 * 60 * 60 * 1000);

  const expires = `expires=${d.toUTCString()}`;

  document.cookie = `${cName}=${cValue};${expires};path=/`;
}

export function getCookie(cName) {
  const name = `${cName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
