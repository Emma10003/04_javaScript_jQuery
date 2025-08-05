$(function () {
    $("#saveData").click(saveDataFn);
    $("#getBtn").click(getDataFn);
});

/*
크롬이나 엣지 등 브라우저에서 F12 클릭
F12 -> Application(애플리케이션) -> Local Storage(로컬 스토리지) 내부 확인
해당하는 URL 주소를 클릭하여 내부에 저장된 키와 값 확인
키와 값은 무조건 문자열로 저장되어 있음
큰따옴표("")가 없다고 해서 문자열이 아닌 게 아니라, 생략된 상태!!
*/
/*
localStorage가 실제로 저장된 위치?
-> 인터넷 창에서 크롬일경우 chrome://version 입력
     -> 프로필 경로: 크롬에서 데이터가 저장되는 위치
// 프로필 경로	C:\Users\tj\AppData\Local\Google\Chrome\User Data\Default
- 프로필 경로 따라서 폴더 내부를 들어가면 Local Storage 폴더 존재
- 폴더 내부에 db나 ldb로 저장된 내부에 컴퓨터가 읽을 수 있는 글씨로 존재
(프로필 경로는 주기적으로 변경됨)
데이터 지우기를 하면 여기 있는 데이터가 지워지는 것.
*/
/*
localStorage 내부에서는 문자열만 저장 가능 = 인터넷 주소 즐겨찾기,
간단한 읽는 정도의 데이터를 저장하므로
소비자가 인터넷을 사용함에 있어 불편을 느끼지 않을 최소한의 저장 자료형을 사용!
-> 악성코드 방지 => 문자열만 가능하고, 배열 또한 문자열로 저장
*/
// -------------------------------------------------------------------------------------
/* 1️⃣ 데이터 저장하기 */
function saveDataFn(e) {
    // button type=submit 이거나 a 태그로 클릭할 경우 제출방지 사용.
    // a 태그 내부 속성 기본값 href 로 들어가는 것을 방지
    // (ex : 마이페이지, 임직원페이지 접근 가능한 유저인가? -> 확인 후 접근하도록!)
    e.preventDefault(); // 제출 방지  type="button"일 경우 사용 안 해도 O

    // 소비자가 작성한 키와 값으로 저장할 예정
    const inputKey = $("#key").val(); // 기본 javascript에서는 value 로 사용
    const inputValue = $("#value").val(); // 기본 javascript에서는 value 로 사용

    // 실제 localStorage에 저장!
    localStorage.setItem(inputKey, inputValue); // 기본적으로 문자열
    /*
        .setItem() : 기능 내부에는 키와 값을 저장한다 -> 크롬에서 기본적으로 제공하는 저장위치에
                     소비자가 작성한 데이터의 키와 값을 저장해놓는 경로까지 작성되어 있음.
    */
}

/* 2️⃣ 데이터 가져오기 */
function getDataFn(e) {
    e.preventDefault();
    const inputKey = $("#getKey").val();

    // 저장된 데이터를 가져올 때는
    // 가져오는 키의 명칭만 작성.
    // 가져온 데이터를 소비자의 눈으로 확인할 수 있도록
    // JavaScript 변수이름에 담아서 html에 넘겨줄 것
    const getValue = localStorage.getItem(inputKey);
    /*
        .getItem() : 기능 내부에 키를 활용해서 값을 가져온다.
                     값을 가져오는 위치는 크롬에서 기본적으로 저장하는 위치.
    */

    // 가져온 결과 표시하기
    $("#getResult").html(
        `
        <strong>가져오기 성공!</strong><br>
        저장된 키의 명칭 : ${inputKey}<br>
        저장된 키 내부에 존재하는 값 : ${getValue}
        `
    );
}

/* 3️⃣ 데이터 가져오기 */
