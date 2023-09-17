import { Action, createActions, handleActions } from "redux-actions";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { AuthState, LoginReqType } from "../../types";
import UserService from "../../services/UserService";
import TokenService from "../../services/TokenService";

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

const prefix = "my-books/auth";

export const { pending, success, fail } = createActions(
  "PENDING",
  "SUCCESS",
  "FAIL",
  { prefix }
);

const reducer = handleActions<AuthState, string>(
  {
    PENDING: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      token: action.payload,
      loading: false,
      error: null,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix }
);

export default reducer;

// saga

export const { login, LOGOUT } = createActions("LOGIN", "LOGOUT", { prefix });

function* loginSaga(action: Action<LoginReqType>) {
  try {
    yield put(pending());
    const token: string = yield call(UserService.login, action.payload);
    // localstorage
    TokenService.set(token);
    yield put(success(token));
    // push
    yield put(push("/"));
  } catch (error) {
    yield put(fail(new Error(error?.response?.data?.error || "UNKNOWN_ERROR")));
  }
}

function push(arg0: string): any {
  throw new Error("Function not implemented.");
}
function* logoutSaga() {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    yield call(UserService.logout, token);
    TokenService.set(token);
  } catch (error) {
    // console.log(error);
  } finally {
    TokenService.remove();
    yield put(success(null));
  }
}
