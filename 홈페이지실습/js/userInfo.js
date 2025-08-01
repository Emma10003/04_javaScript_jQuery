$(function () {
    getUsers();
});

function getUsers() {
    // https://jsonplaceholder.typicode.com/users
    // https://jsonplaceholder.typicode.com/users/${userId}

    $.get("https://jsonplaceholder.typicode.com/users").done(function (data) {
        // 모든 사용자를 map 을 활용하여 리스트 목록 형태로 표시
        /*
            <onclick>
            onclick= HTML 요소에서 클릭 이벤트를 직접 연결하는 속성
            클릭했을 때 실행할 JavaScript 코드를 작성
            getUserDetail() : 실행할 함수의 이름 = 사용자 상세정보를 가져오는 함수
            getUserDetail() -> data에서 가져온 유저 목록들을 순회하여
                               user 1명 당 보유하고 있는 id를 이용해서
                               주소값으로 사용
                               .map() 으로 유저 정보를 하나씩 보여줄 때
                               유저 데이터에는 id, name, username, email, address 등의 데이터 보유
                    관리자가 보길 원하는 회원 유저의 이름을 클릭했을 때 (getUserDetail() 기능 작동)
                    해당하는 유저의 id 값을 getUserDetail() 내부 매개변수 값으로 전달하고,
                    해당하는 유저의 정보를 확인할 수 있도록 설정
            
            const userList = data.map()
                :   userList 라는 변수이름 대신 직접적으로 $("#usersList").html() 내부 안에 
                    data.map() 형태를 사용할 수 있지만,
                    코드의 가독성을 위하여 변수 이름에 담아서 보여질 결과를 분리하여 사용하기도 함.
        
            getUserDetail(${user.id}) 에서 ${user.id}를 쓴 이유는
                해당 api 사이트에서 주소 뒤에 각 유저에게 주어진 id 숫자를 입력하면
                해당 유저의 정보가 담긴 주소로 이동하기 때문
                (getUserDetail() 함수 내부를 보면 api 주소에 ${userId}로 포맷팅 되어 있음!)
                    (여기서 ${userId}는 함수 파라미터)
        
        */
        const userList = data
            .map(
                (user) =>
                    `
                <p class="user-detail" onclick="getUserDetail(${user.id})">
                    ${user.name} 님 - ${user.id}
                </p>
                `
            )
            .join(""); // map 뒤에 자동으로 붙는 콤마(,)와 같은 특수문자 제거

        // 리스트를 usersList 영역에 출력
        $("#usersList").html(
            `
                <div class="success">
                <h3>전체 사용자 목록</h3>
                ${userList}
                </div>
                `
        );
    });
}

// 8.1 실습코드 3
function getUserDetail(userId) {
    $("#userResult").html(
        '<div class="loading">사용자 상세 정보를 가져오는 중...</div>'
    );

    $.get(`https://jsonplaceholder.typicode.com/users/${userId}`).done(
        function (data) {
            $("#userResult").html(`
                    <div class="success">
                        <div class="user-card">
                            <h3>👤 ${data.name} (ID: ${data.id})</h3>
                            <p><strong>사용자명:</strong> ${data.username}</p>
                            <p><strong>이메일:</strong> ${data.email}</p>
                            <p><strong>전화번호:</strong> ${data.phone}</p>
                            <p><strong>웹사이트:</strong> ${data.website}</p>
                            <p><strong>회사:</strong> ${data.company.name}</p>
                            <p><strong>회사 업무:</strong> ${data.company.catchPhrase}</p>
                            <p><strong>주소:</strong> ${data.address.street}, ${data.address.city}</p>
                            <p><strong>우편번호:</strong> ${data.address.zipcode}</p>
                        </div>
                    </div>
                `);
        }
    );
}
