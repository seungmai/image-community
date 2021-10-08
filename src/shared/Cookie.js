// 둘째, 키값 기준으로 쿠키에 저장된 값을 가져오는 함수(쿠키값 얻기)
// name으로 value를 갖고 올 것이다.
const getCookie = (name) => {
  // 쿠키 값을 가져옵니다.
  let value = "; " + document.cookie;
  // 키 값을 기준으로 파싱합니다.
  let parts = value.split(`; ${name}=`);
  // value를 return!
  // pop은 배열의 마지막요소를 빼오는 것이다.
  // shift는 배열의 첫번째 요소를 빼오는 것이다.
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

// 첫째, 쿠키에 저장하는 함수(쿠키저장)
// exp = 5라는 뜻은 기본값을 미리 넣어주는 것이다.
const setCookie = (name, value, exp = 5) => {
  // 날짜 객체를 만든다.
  let date = new Date();
  // 날짜를 만들어줍니다.
  // setTime을 사용해 일시를 설정해준다.
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  // ``백틱 안에 name, value, exp를 넣어주고 toUTCString사용해 문자로 넘겨줄 것이다.
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
};

// 셋째, 쿠키를 삭제하는 함수(쿠키삭제)
const deleteCookie = (name) => {
  // 만료일을 예전으로 설정해 쿠키를 지웁니다.
  let date = new Date("2020-01-01").toUTCString();
  console.log(date);
  document.cookie = name + "=; expires=" + date;
};

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export { getCookie, setCookie, deleteCookie };
