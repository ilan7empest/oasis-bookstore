export const authHeader = () => {
  return {
    // Authorization: `JWT ${user.token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
};
