import { useCallback } from "react";
import Signin from "../components/Signin";
import { LoginReqType } from "../types";
import { useDispatch } from "react-redux";
import { login as LoginSagaStart } from "../redux/modules/auth";

export default function SigninContainer() {
  const dispatch = useDispatch();
  const login = useCallback(
    (reqData: LoginReqType) => {
      dispatch(LoginSagaStart(reqData));
    },
    [dispatch]
  );

  return <Signin login={login} />;
}
