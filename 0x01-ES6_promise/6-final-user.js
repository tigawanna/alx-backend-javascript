import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  const s = signUpUser(firstName, lastName);
  const u = uploadPhoto(fileName);

  return Promise.allSettled([s, u]).then((vals) => {
    const Arr = [];
    vals.forEach((val) => {
      if (val.status === 'fulfilled') {
        Arr.push({ status: val.status, value: val.value });
      } else {
        Arr.push({
          status: val.status,
          value: `Error: ${val.reason.message}`,
        });
      }
    });
    return Arr;
  });
}
