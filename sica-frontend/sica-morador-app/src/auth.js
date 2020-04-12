export const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  const expirationDate = new Date(
    localStorage.getItem('expirationDate')
  );
  if (expirationDate <= new Date()) {
    localStorage.clear();
    return false;
  }  
  if(token !== null){
    return true;
  }  
  return false;
};