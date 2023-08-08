export function useAuth() {
  const token = sessionStorage.getItem('token');

  return token ? true : false;
}
