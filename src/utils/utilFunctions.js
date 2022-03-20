// Fenerate a user function

export const generateUser = async () => {
  const getUser = () => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://randomuser.me/api');
      xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
          resolve(xhr.response);
        } else if (xhr.status >= 400) {
          console.log('Error found');
        }
      };
      xhr.send();
    });
  };

  const result = JSON.parse(await getUser());

  return result;
};
