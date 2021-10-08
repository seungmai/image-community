// import를 한다.
import React from "react";

// elements를 사용하기 위해 가져온다.
import { Grid, Image, Text } from "../elements";

// 리덕스 훅, useSelector는 store에 있는 값을 가져와서 사용할수 있도록 해주는 친구이다.
// action 생성함수를 사용하기 위해 import를 해주었다.
import { useDispatch, useSelector } from "react-redux";

// action 생성함수를 사용하기 위해 import를 해주었고, as하면 그 뒤에 별명을 지어주는 것이다.
import { actionCreators as commentActions } from "../redux/modules/comment";

// CommentList의 함수형 컴포넌트를 만들어준다.
const CommentList = (props) => {
  // dispatch 불러와서 사용한다.
  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.comment.list);

  const { post_id } = props;

  React.useEffect(() => {
    if (!comment_list[post_id]) {
      dispatch(commentActions.getCommentFB(post_id));
    }
  }, []);

  if (!comment_list[post_id] || !post_id) {
    return null;
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        {comment_list[post_id].map((c) => {
          return <CommentItem key={c.id} {...c} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

// props가 없어서 오류가 난다던가 아니면 화면이 없어서 깨져버리는 일이 없다.
// 첫째, defaultProps를 설정한다.
CommentList.defaultProps = {
  post_id: null,
};

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default CommentList;

// 하나의 컴포넌트안에 두개의 컴포넌트가 존재할수 있다.(export는 안해줘도 된다.)
const CommentItem = (props) => {
  // 둘째, defaultProps에서 설정해준 값을 가져온다
  const { user_profile, user_name, user_id, post_id, contents, insert_dt } =
    props;

  return (
    <Grid is_flex>
      <Grid is_flex width="auto">
        <Image shape="circle" />
        <Text blod>{user_name}</Text>
      </Grid>
      <Grid is_flex margin="0px 4px">
        <Text margin="0px">{contents}</Text>
        <Text margin="0px">{insert_dt}</Text>
      </Grid>
    </Grid>
  );
};

// props가 없어서 오류가 난다던가 아니면 화면이 없어서 깨져버리는 일이 없다.
// 첫째, defaultProps를 설정한다.
CommentItem.defaultProps = {
  user_profile: "",
  user_name: "SeungMin",
  user_id: "",
  post_id: 1,
  contents: "귀여운 강아지네요!",
  insert_dt: "2021-01-01 19:00:00",
};
