import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { useAppDispatch } from "./store/hooks/hooks";
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper";
import { AuthService } from "./services/auth.service";
import { login, logout } from "./store/user/userSlice";
import { useEffect } from "react";
import { useGetMeQuery } from "api/auth.api";

function App() {
  const dispatch = useAppDispatch();

  const {
    isLoading: isLoadingGetMe,
    data: dataGetMe,
    isError: errorGetMe,
    isSuccess: isSuccessGetMe,
  } = useGetMeQuery(undefined);

  // const [getMertk] = useGetMeQuery(undefined);

  // const checkAuth = async () => {
  const checkAuth = async () => {
    // const {
    //   isLoading: isLoadingGetMe,
    //   data: dataGetMe,
    //   isError: errorGetMe,
    //   isSuccess: isSuccessGetMe,
    // } = await useGetMeQuery(undefined);

    // const token = getTokenFromLocalStorage();

    // if (token) {
    // const response = await AuthService.getMe();

    const tmp_response = await AuthService.getMe();

    console.log("app tmp_response");
    console.log(tmp_response);

    // let response = null;
    // setTimeout(() => {
    //   response = dataGetMe;
    // }, 1000);

    const response = dataGetMe;

    console.log("app response");
    console.log(response);

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
  }, [dataGetMe]);

  return <RouterProvider router={router} />;
}

export default App;
