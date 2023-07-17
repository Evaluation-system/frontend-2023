import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { useAppDispatch } from "./store/hooks/hooks";
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper";
// import { AuthService } from "./services/auth.service";
import { login, logout } from "./store/user/userSlice";
import { useEffect } from "react";
import { useGetMeQuery } from "api/auth.api";

function App() {
  const dispatch = useAppDispatch();

  // const checkAuth = async () => {
  const checkAuth = async () => {
    const {
      isLoading: isLoadingGetMe,
      data: dataGetMe,
      error: errorGetMe,
    } = useGetMeQuery(undefined);

    // const token = getTokenFromLocalStorage();

    // if (token) {
    // const response = await AuthService.getMe();
    const response = await dataGetMe;

    if (response) {
      dispatch(login(response));
    } else {
      dispatch(logout());
    }
    // }

    if (errorGetMe) console.log(errorGetMe);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
