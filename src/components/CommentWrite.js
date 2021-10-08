// CommentWrite.js
import React from "react";

// elements를 사용하기 위해 가져온다.
import { Grid, Input, Button } from "../elements";

// 리덕스 훅, useSelector는 store에 있는 값을 가져와서 사용할수 있도록 해주는 친구이다.
// action 생성함수를 사용하기 위해 import를 해주었다.
import { useDispatch } from "react-redux";

// action 생성함수를 사용하기 위해 import를 해주었고, as하면 그 뒤에 별명을 지어주는 것이다.
import { actionCreators as commentActions } from "../redux/modules/comment";

// CommentWrite의 함수형 컴포넌트를 만들어준다.
const CommentWrite = (props) => {
  // dispatch 불러와서 사용한다.
  const dispatch = useDispatch();

  const onChange = (e) => {
    setCommentText(e.target.value);
  };

  const write = () => {
    if (comment_text === "") {
      window.alert("댓글을 입력해주세요!");
      return;
    }
    // 입력된 텍스트는 지우기!
    setCommentText("");

    // 파이어스토어에 추가합니다.
    dispatch(commentActions.addCommentFB(post_id, comment_text));
  };

  const { post_id } = props;

  const [comment_text, setCommentText] = React.useState("");

  return (
    <React.Fragment>
      <Grid padding="16px" is_flex>
        <Input
          placeholder="댓글 내용을 입력해주세요 :)"
          _onChange={onChange}
          value={comment_text}
          onSubmit={write}
          is_submit
        />
        <Button width="50px" margin="0px 2px 0px 2px" _onClick={write}>
          작성
        </Button>
      </Grid>
    </React.Fragment>
  );
};

// props가 없어서 오류가 난다던가 아니면 화면이 없어서 깨져버리는 일이 없다.
// 첫째, defaultProps를 설정한다.
CommentWrite.defaultProps = {
  post_id: "",
};

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default CommentWrite;
