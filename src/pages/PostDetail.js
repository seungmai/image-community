// import를 한다.
import React from "react";

// components을 import한다.
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

import Permit from "../shared/Permit";

// 리덕스 훅, useSelector는 store에 있는 값을 가져와서 사용할수 있도록 해주는 친구이다.
// action 생성함수를 사용하기 위해 import를 해주었다.
import { useDispatch, useSelector } from "react-redux";

// action 생성함수를 사용하기 위해 import를 해주었고, as하면 그 뒤에 별명을 지어주는 것이다.
import { actionCreators as postActions } from "../redux/modules/post";

// PostDetail의 함수형 컴포넌트를 만들어 준다.
const PostDetail = (props) => {
  // dispatch 불러와서 사용한다.
  const dispatch = useDispatch();
  const id = props.match.params.id;

  console.log(id);

  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((store) => store.post.list);
  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];

  React.useEffect(() => {
    if (post) {
      return;
    }

    dispatch(postActions.getPostFB(id));
  }, []);

  console.log(post);

  return (
    <React.Fragment>
      {post && (
        <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
      )}
      <Permit>
        <CommentWrite post_id={id} />
      </Permit>
      <CommentList post_id={id} />
    </React.Fragment>
  );
};

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default PostDetail;
