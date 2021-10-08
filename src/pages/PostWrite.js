// import를 한다.
import React from "react";

// elements를 사용하기 위해 가져온다.
import { Grid, Text, Button, Image, Input } from "../elements";

// 공통
import Upload from "../shared/Upload";

// 리덕스 훅, useSelector는 store에 있는 값을 가져와서 사용할수 있도록 해주는 친구이다.
// action 생성함수를 사용하기 위해 import를 해주었다.
import { useSelector, useDispatch } from "react-redux";
// action 생성함수를 사용하기 위해 import를 해주었고, as하면 그 뒤에 별명을 지어주는 것이다.
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

// PostWrite의 함수형 컴포넌트를 만들어 준다.
const PostWrite = (props) => {
  // dispatch 불러와서 사용한다.
  const dispatch = useDispatch();
  // useSelector를 이용해서 state > user > is_login을 가져온다.
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;

  const { history } = props;

  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

  const [contents, setContents] = React.useState(_post ? _post.contents : "");

  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      history.goBack();

      return;
    }
    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, []);

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addPost = () => {
    dispatch(postActions.addPostFB(contents));
  };

  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, { contents: contents }));
  };

  // 로그인 페이지로 이동
  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗! 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          _onClick={() => {
            history.replace("/");
          }}
        >
          로그인하러 가기
        </Button>
      </Grid>
    );
  }
  return (
    <React.Fragment>
      {/* 게시글 작성 */}
      <Grid padding="16px">
        <Text margin="0px 0px 10px" size="36px" bold>
          {is_edit ? "게시글 수정" : "게시글 작성"}
        </Text>

        {/* 파일선택 업로드 */}
        <Upload />
      </Grid>

      {/* 미리보기 */}
      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="24px" bold>
            미리보기
          </Text>
        </Grid>
        <Grid padding="0 16px">
          <Image
            shape="rectangle"
            src={preview ? preview : "http://via.placeholder.com/400x300"}
          />
        </Grid>
      </Grid>

      {/* 게시글 작성 */}
      <Grid padding="16px">
        <Input
          value={contents}
          _onChange={changeContents}
          label="게시글 내용"
          placeholder="게시글 작성"
          multiLine
        />
      </Grid>

      {/* 게시글 작성 버튼 */}
      <Grid padding="16px">
        {is_edit ? (
          <Button text="게시글 수정" _onClick={editPost}></Button>
        ) : (
          <Button text="게시글 작성" _onClick={addPost}></Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default PostWrite;
