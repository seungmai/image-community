// import를 한다.
import React from "react";

// elements를 사용하기 위해 가져온다.
import { Grid, Text, Input, Button } from "../elements";

// 이메일형식 불러온다.
import { emailCheck } from "../shared/common";

// action 생성함수를 사용하기 위해 import를 해주었다.
import { useDispatch } from "react-redux";
// action 생성함수를 사용하기 위해 import를 해주었고, as하면 그 뒤에 별명을 지어주는 것이다.
import { actionCreators as userActions } from "../redux/modules/user";

// Signup의 함수형 컴포넌트를 만들어 준다.
const Signup = (props) => {
  // dispatch 불러와서 사용한다.
  const dispatch = useDispatch();

  // state를 만들어 준다.
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");
  const [user_name, setUserName] = React.useState("");

  // signupFB를 dispatch를 이용해 불러온다.
  const signup = () => {
    // 아이디가 공백이면 리턴! or 비밀번호가 공백이면 리턴! or 유저네임이 공백이면 리턴!
    if (id === "" || pwd === "" || user_name === "") {
      window.alert("아이디, 패스워드, 닉네임을 모두 입력해주세요!");
      return;
    }

    // 이메일형식이 맞지않으면 false 맞으면 true를 띄어준다.
    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }

    // 비밀번호와 비밀번호확인이 다르면 리턴! 실행안한다.
    if (pwd !== pwd_check) {
      window.alert("패스워드와 패스워드 확인이 일치하지 않습니다!");
      return;
    }
    dispatch(userActions.signupFB(id, pwd, user_name));
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          회원가입
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={(e) => {
              // setId라는 state를 추가한다.
              setId(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            _onChange={(e) => {
              // setUserName라는 state를 추가한다.
              setUserName(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            _onChange={(e) => {
              // setPwd라는 state를 추가한다.
              setPwd(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
            _onChange={(e) => {
              // setPwdCheck라는 state를 추가한다.
              setPwdCheck(e.target.value);
            }}
          />
        </Grid>

        {/* _onClick할 signup이라는 함수를 만들어 준다. */}
        <Button text="회원가입하기" _onClick={signup}></Button>
      </Grid>
    </React.Fragment>
  );
};

// props가 없어서 오류가 난다던가 아니면 화면이 없어서 깨져버리는 일이 없다.
// 첫째, defaultProps를 설정한다.
Signup.defaultProps = {};

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default Signup;
