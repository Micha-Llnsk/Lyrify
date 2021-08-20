import useSessionStorage from "./useSessionStorage";

export default function useToken() {
  const [token, setToken] = useSessionStorage("token", null);

  function clearToken() {
    setToken(null);
  }
  return [token, setToken, clearToken];
}
