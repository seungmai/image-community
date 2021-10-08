// import를 한다.
import React from "react";

// elements를 사용하기 위해 가져온다.
import { Grid, Text, Button } from "../elements";

// 쿠키를 사용하기위해 가져온다.
import { getCookie, deleteCookie } from "../shared/Cookie";

// 리덕스 훅, useSelector는 store에 있는 값을 가져와서 사용할수 있도록 해주는 친구이다.
// action 생성함수를 사용하기 위해 import를 해주었다.
import { useSelector, useDispatch } from "react-redux";

// action 생성함수를 사용하기 위해 import를 해주었고, as하면 그 뒤에 별명을 지어주는 것이다.
import { actionCreators as userActions } from "../redux/modules/user";
// history를 사용하기 위해 history를 가져온다.
import { history } from "../redux/configureStore";
// apiKey를 사용하기위해 파이어베이스에서 가져온다.
import { apiKey } from "../shared/firebase";

// NotiBadge(알림)을 import해온다.
import NotiBadge from "./NotiBadge";

// Header의 함수형컴포넌트를 만들어준다.
const Header = (props) => {
  // dispatch 불러와서 사용한다.
  const dispatch = useDispatch();

  // useSelector를 이용해서 state > user > is_login을 가져온다.
  const is_login = useSelector((state) => state.user.is_login);

  // 세션체크를 하기위해 가져온다(세션 키를 사용하기 위해 가져온다(우리의 apiKey)).
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

  // 세션키의 value가 있으면 로그인을 하고, 없으면 로그인을 안한다.
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  console.log(is_session);

  // 쿠키를 확인해서 true인지 false인지 판단해주는 함수를 만들어준다(쿠키가 있는지 없는지 확인).
  // React.useEffect(() => {
  // ("user_id")은 쿠키이름이다.
  // let cookie = getCookie("user_id");
  // console.log(cookie);

  // 만약에 쿠키가 있다면 true가되고 쿠키가 없다면 false가 된다.
  // if (cookie) {
  //   setIsLogin(true);
  // } else {
  //   setIsLogin(false);
  // }
  // });

  // 만약 is_login이 true일때만 리턴해준다.
  if (is_login && is_session) {
    // 로그인을 한 상태의 Header를 만들어 준다.
    return (
      <React.Fragment>
        <Grid is_flex padding="16px">
          <Grid>
            <Text margin="0px" size="24px" bold>
              ImageGram
            </Text>
          </Grid>

          <Grid is_flex>
            <Grid>
              <NotiBadge
                _onClick={() => {
                  history.push("/noti");
                }}
              />
            </Grid>
            <Button text="내정보"></Button>
            <Button
              margin="0 2px"
              text="로그아웃"
              _onClick={() => {
                // logoutFB함수를 호출한다.
                dispatch(userActions.logoutFB());
              }}
            ></Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid is_flex padding="16px">
        <Grid>
          <Text margin="0px" size="24px" bold>
            ImageGram
          </Text>
        </Grid>

        <Grid is_flex>
          <Button
            text="로그인"
            margin="0px 2px"
            _onClick={() => {
              history.push("/login");
            }}
          ></Button>
          <Button
            text="회원가입"
            _onClick={() => {
              history.push("/signup");
            }}
          ></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

// props가 없어서 오류가 난다던가 아니면 화면이 없어서 깨져버리는 일이 없다.
// 첫째, defaultProps를 설정한다.
Header.defaultProps = {};

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default Header;
