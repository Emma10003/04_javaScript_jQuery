$(function () {
    $("#addBtn").click(addData);
    $("#searchBtn").click(searchData);
    $("#showAllBtn").click(showAllData);
    $("#clearAllBtn").click(clearAllData);
});

/* 1️⃣ 데이터 추가하기 */
function addData(e) {
    e.preventDefault();
    const name = $("#name").val().trim();
    const age = $("#age").val().trim();
    const email = $("#email").val().trim();

    // 기존에 저장된 데이터가 존재하는지 확인, 없으면 빈배열 데이터 가져오기
    /* Q & A
        Q.
            .getItem("userList") 에서 "userList"는 왜 문자열로 입력?
            userList라는 문자열로 키가 입력되어 있나
        A. 맞음. 왜냐하면 밑에서 localStorage.setItem() 할 때
            key로 "userList"를 넣어줬기 때문
     */
    let userList = JSON.parse(localStorage.getItem("userList") || "[]");
    // userList: localStorage에 유저정보들을 보유하고, 추후 새로운 데이터를 저장할 변수이름
    const newUser = {
        name: name,
        age: age,
        email: email,
        createAt: new Date().toLocaleString("ko-KR"),
        /* 
            Date.now()
                현재 시간을 저장
                가입한 날짜는 소비자가 선택할 권한이 없으므로
                HTML에 존재하지 X
            - ms초로 변환이 됨
            - 저장한 날짜를 쓸 때는
                new Date().toLocaleString("ko-KR"); 로 주로 사용
                : 한국 현재시간을 기준으로 문자열로 저장.
        */
    };
    // newUser 변수이름은 소비자가 작성한 데이터를 가지고 있는 변수이름

    // 기존 userList에 새로운 유저를 추가한 상태
    // -> 이건 localStorage에서가 아니라, javaScript 내에서만 추가하도록 되어있는 상태
    userList.push(newUser);

    // javaScript 내에 데이터가 추가된 리스트를 localStorage에 저장
    localStorage.setItem("userList", JSON.stringify(userList));
    /* .stringify()
        localStorage에 저장할 때 배열->문자열로 변환해서 저장
        why?  ~> 사람들의 개별 컴퓨터에 데이터를 저장하거나, 특정 작업을 진행하는 것을
                브라우저가 할 수 없도록 방지하지만,
                즐겨찾기와 같이 글자 데이터를 최소한 저장할 수 있도록
                문자열은 허용했기 때문에 문자열만 가능!
                따라서 JSON.stringify()를 이용해 배열을 문자열로 변환
    */

    // 그냥 내가 추가한 코드 -------------
    $("#name").val(""); // 입력창 초기화
    $("#age").val("");
    $("#email").val("");
    $("#name").focus(); // 커서 포커스 name input에 맞추기
    // ----------------------------------
    alert("로컬스토리지에 저장되었습니다.");
}

/* 2️⃣ 데이터 검색하기 */
function searchData(e) {
    e.preventDefault();
}

/* 3️⃣ 현재 저장된 모든 데이터 */
function showAllData(e) {
    e.preventDefault();

    // localStorage에서 저장된 유저 목록 가져오기
    let userList = JSON.parse(localStorage.getItem("userList") || "[]");
    console.log("유저 목록: ", userList);

    let html = `<h3>저장된 사용자 목록(총 ${userList.length}명)</h3>`;

    // for문을 사용하되, userList 값을 모두 [i]로 가져올 것!
    for (let i = 0; i < userList.length; i++) {
        html += `
        ${i + 1} ---------------------------------<br>
        ${userList[i].name}님<br>
        ${userList[i].age}세<br>
        ${userList[i].email}<br>
        가입일자 : ${userList[i].createAt}<br>
        ----------------------------------------<br>
        `;
        /*
            리스트로 저장되어 있는 하나의 변수(userList) 안에서
            n번째 사용자의 name, age, email을 가져오기 위해서
            i로 인덱싱 후 키 값으로 호출하는 것.
            -> userList[i].name
            
            앞으로는 이런 식으로 계속 쓸 예정!!
        */
    }
    $("#allData").html(html);
}

function clearAllData(e) {
    e.preventDefault();

    // 정말로 사용자를 삭제하시겠습니까 물어본 후
    // userList를 []로 만들기
    if (confirm("정말로 사용자를 삭제하시겠습니까?")) {
        localStorage.clear();
        alert("모든 데이터가 삭제되었습니다.");
        // showAllData();
        /*
        localStorage.removeItem("userList"); -> localStorage 내에서 특정 키만 삭제
        localStorage.clear();                -> localStorage 내부에 존재하는 모~~~든 데이터 삭제
        */
    }
}
