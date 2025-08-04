$(function () {
    showUsers();
});

function showUsers() {
    // 기존 회원목록 가져오기 (없으면 빈 배열 형태) -> 가져온 값을 userList 변수이름에 담아두기
    let userList = JSON.parse(localStorage.getItem("userList") || "[]");

    // 사용자 총 회원수 표시 : userList.length
    // 사용자가 없으면 userList.length === 0 no-users 보이게 함

    // 존재한다면 map 사용해서 HTML 로 소비자가 유저 리스트 목록을 확인할 수 있도록 설정
    const userHTML = userList.map(
        (u) =>
            `
        <div class="user-item">
            <div class="user-id">아이디: ${u.username}</div>
            <div class="user-pw">아이디: ${u.password}</div>
        </div>
        `
    );

    // userHTML에 안에 넣은 내용 user-list 에 출력하기.
    $("#user-list").html(userHTML);
}
