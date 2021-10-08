// import를 한다.
import React from "react";
import styled from "styled-components";

// Button의 함수형 컴포넌트를 만든다.
const Button = (props) => {
  // 둘째, defaultProps에서 설정해준 값을 가져온다.
  const { text, _onClick, is_float, children, margin, width, padding } = props;

  // is_float가 true일때만 가져온다.
  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
      </React.Fragment>
    );
  }

  // 넷째, children은 스타일을 담당하는 친구가 아니기 때문에 styles안에서 관리한다.
  const styles = {
    margin: margin,
    width: width,
    padding: padding,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};

// props가 없어서 오류가 난다던가 아니면 화면이 없어서 깨져버리는 일이 없다.
// 첫째, defaultProps를 설정한다.
Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  // is_float가 true이면 fixed를 준다(로그인했을시에만 +버튼 보이게).
  is_float: false,
  margin: false,
  width: "100%",
  padding: "12px 0",
};

// 셋째, styled-components를 사용한다.
const ElButton = styled.button`
  width: ${(props) => props.width};
  background-color: pink;
  color: #ffffff;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;

// +버튼
const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: green;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
`;

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default Button;
