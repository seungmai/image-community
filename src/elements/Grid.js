// import를 한다.
import React from "react";
import styled from "styled-components";

// Grid의 함수형 컴포넌트를 만들어준다.
const Grid = (props) => {
  // 둘째, defaultProps에서 설정해준 값을 가져온다.
  const { is_flex, width, margin, padding, bg, children, center, _onClick } =
    props;

  // 넷째, children은 스타일을 담당하는 친구가 아니기 때문에 styles안에서 관리한다.
  const styles = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
  };

  return (
    <React.Fragment>
      {/* GridBox 밖에서도 우리가 만들어 준 styles을 사용할 수 있도록 스프레드 문법을 사용하여 합쳐준다.*/}
      <GridBox {...styles} onClick={_onClick}>
        {/* GridBox안에는 child값을 넘겨받아야 한다(즉, 우리가 설정해 준 자식객체들을 넣어 준다). */}
        {children}
      </GridBox>
    </React.Fragment>
  );
};

// 그리드로 어떤 것이 들어오는 확인할 것이다(빈화면을 보통 그리드라고 한다).
// defaultProps를 넣어줬기때문에 props의 초기값이라고 생각하면된다(에러방지 or 확인용)
// props가 없어서 오류가 난다던가 아니면 화면이 없어서 깨져버리는 일이 없다.
// 첫째, defaultProps를 설정한다.
Grid.defaultProps = {
  children: null,
  // 첫째, is_flex에 값이 있으면 그 값을 사용한다. padding에 값이 있으면 그 값을 사용한다(false로 한 모든 Props 포함).
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: true,
  center: false,
  _onClick: () => {},
};

// 셋째, styled-components를 사용한다.
const GridBox = styled.div`
  box-sizing: border-box;
  // props에서 넘어오는 width값을 가져온다.
  width: ${(props) => props.width};
  height: 100%;
  // 예) padding이 있으면 값을 주고 없으면 값을 주지않는다(margin, bg 등등).
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ""}
      ${(props) => (props.center ? `text-align: center;` : "")}
`;

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default Grid;
