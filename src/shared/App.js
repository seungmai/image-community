// import를 한다.
import React from "react";

// 사용할 페이지를 import 해준다.
import Header from "../components/Header";
import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Singup from "../pages/Signup";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";
import Search from "./Search";
import Notification from "../pages/Notification";

// 라우트를 해준다.
// BrowserRouter는 ConnectedRouter를 사용하기 전에 설정해 준 것이다.
import { BrowserRouter, Route } from "react-router-dom";

// 스토어를 주입하고 App.js에서도 새로만든 history를 사용해야하기 때문에 ConnectedRouter를 import를 해주었다.
import { ConnectedRouter } from "connected-react-router";
// history를 import를 해준다.
import { history } from "../redux/configureStore";

// 공통
import { Button, Grid } from "../elements";
import Permit from "./Permit";

// action 생성함수를 사용하기 위해 import를 해주었다.
import { useDispatch } from "react-redux";
// action 생성함수를 사용하기 위해 import를 해주었고, as하면 그 뒤에 별명을 지어주는 것이다.
import { actionCreators as userActions } from "../redux/modules/user";
// 파이어베이스의 apiKey를 사용한다.
import { apiKey } from "./firebase";

function App() {
  // dispatch 불러와서 사용한다.
  const dispatch = useDispatch();

  // Header에도 있는데 이런건 중간단위에서 하는게 아니라 시작점에서 하는 것이다.
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  React.useEffect(() => {
    if (is_session) {
      // loginCheckFB를 실행한다.
      dispatch(userActions.loginCheckFB());
    }
    // []는 한번만 실행되며, componentDidMount역할을 수행한다.
  }, []);

  return (
    <React.Fragment>
      <Grid>
        {/* 헤더 */}
        <Header></Header>
        {/* ConnectedRouter를 사용해 history를 바로 넘겨준다. */}
        <ConnectedRouter history={history}>
          {/* 첫째, 포스트리스트 페이지 */}
          <Route path="/" exact component={PostList}></Route>
          {/* 둘째, 로그인 페이지 */}
          <Route path="/login" exact component={Login}></Route>
          {/* 셋째, 회원가입 페이지 */}
          <Route path="/signup" exact component={Singup}></Route>
          {/* 넷째, 게시글 작성페이지 */}
          <Route path="/write" exact component={PostWrite}></Route>
          <Route path="/write/:id" exact component={PostWrite}></Route>
          {/* 다섯째, 게시글 작성페이지 */}
          <Route path="/post/:id" exact component={PostDetail}></Route>
          <Route path="/search" exact component={Search}></Route>
          <Route path="/noti" exact component={Notification}></Route>
        </ConnectedRouter>
      </Grid>
      {/* 로그인을 했을 때만 보인다. */}
      <Permit>
        <Button
          is_float
          text="+"
          _onClick={() => {
            history.push("/write");
          }}
        >
          +
        </Button>
      </Permit>
    </React.Fragment>
  );
}

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default App;
