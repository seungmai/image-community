// import를 한다.
import React from "react";
import _ from "lodash";

// Search의 함수형 컴포넌트를 만들어준다.
const Search = () => {
  const [text, setText] = React.useState("");

  // debounce는 일정시간동안 기달렸다가 실행한다.
  const debounce = _.debounce((e) => {
    console.log("debounce :::", e.target.value);
  }, 1000);

  // throttle는 기달렸다가 어떤것을 실행할꺼니라고 생각하면된다.
  const throttle = _.throttle((e) => {
    console.log("throttle :::", e.target.value);
  }, 1000);

  // useCallback은 함수를 저장해 둔다는 소리이다. 초기화하지마라!
  const keyPress = React.useCallback(debounce, [text]);

  const onChange = (e) => {
    setText(e.target.value);
    keyPress(e);
  };

  return (
    <div>
      <input type="text" onChange={onChange} value={text} />
    </div>
  );
};

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default Search;
