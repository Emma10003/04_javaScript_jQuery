$(function () {
    // 페이지 시작할 때 모든 저장된 데이터 보여주기
    showAllFoodData();

    $("#addBtn").click(addFoodData);
    $("#searchBtn").click(searchFoodData);
    $("#showAllBtn").click(showAllFoodData);
    $("#clearAllBtn").click(clearAllFoodData);
});

/* 1️⃣ 음식 데이터 추가하기 */
/**
 *
 * @param {*} e : 파라미터에 대한 설명 작성 공간
 */
function addFoodData(e) {
    e.preventDefault();

    const foodName = $("#foodName").val().trim();
    const price = $("#price").val().trim();
    const category = $("#category").val().trim();

    // 기존에 저장된 데이터가 localStorage에 존재하는지 확인
    // 없으면 빈 배열을 문자열로 가져오기
    let foodList = JSON.parse(localStorage.getItem("foodList") || "[]");

    const newFood = {
        foodName: foodName,
        price: price,
        category: category,
        createAt: new Date().toLocaleString("ko-KR"), //저장시간 한국기준 현재시간으로 설정
    };

    // JS에서 foodList 목록에 newFood 데이터 맨 마지막에 추가
    foodList.push(newFood);

    // 추가된 foodList를 localStorage에 문자열로 변환하여 저장
    localStorage.setItem("foodList", JSON.stringify(foodList));

    // foodName, price, category 입력창 비우기
    $("#foodName, #price, #category").val("");

    // alert "로컬스토리지에 저장되었습니다." 띄우기
    alert("로컬스토리지에 저장되었습니다.");
}

/* 2️⃣ 음식 검색하기 */
function searchFoodData(e) {
    e.preventDefault();

    const searchValue = $("#searchValue").val().trim();
    let foodList = JSON.parse(localStorage.getItem("foodList") || "[]");

    // 검색결과가 존재할 경우 검색결과 보여주기
    const searchFoodDatas = foodList.filter(
        (food) => food.foodName === searchValue
    );

    let html = `<h3>검색결과</h3>`;
    if (searchFoodDatas.length > 0) {
        html += searchFoodDatas
            .map(
                (data) =>
                    `
                <div class="item-row">
                    <div>
                    <strong>🍽️ ${data.foodName}</strong><br>
                    💰 가격: ${data.price}원<br>
                    📂 카테고리: ${data.category}<br>
                    📅 등록일: ${data.createAt}
                    </div>
                </div>
                `
            )
            .join("");
    } else {
        html += `존재하지 않는 음식입니다.`;
    }

    $("#searchResult").html(html).show(); // css에서 display:none으로 숨겨져 있는 걸 보이게 함.
}

/* 3️⃣ 저장된 모든 음식 데이터 */
function showAllFoodData(e) {
    /*
        showAllFoodData(e) : 행동이 들어왔을 때
                             행동에 대한 결과 수행
            버튼이나 input 처럼 특정 행위가 없을 때는
            undefined (행동이 전달되지 않은 상태 / 단순 페이지 오픈 상태)

        if (e) e.preventDefault();
            클릭과 같은 동작이 들어왔을 때 태그 속성을 멈추기 위하여 설정
            if로 e.preventDefault() 를 감싸주지 않는다면
                페이지를 로딩하고, 데이터를 모두 보기 한 상태에서는 
                undefined.preventDefault() 가 되어 문제가 발생하므로
                해당 코드 아래의 기능들을 수행하지 못함.
            -> 따라서 if문으로 감싸줘야 한다!
    */
    if (e) e.preventDefault(); // if 내부가 한 줄이므로 {} 생략 가능.

    /*
        순서를 지키지 않으면 loading 에서 특정 행위나 이벤트가 없을 때는
        내부 에러로 인하여 데이터가 보이지 않을 수 있다.
        따라서 변수를 선언하고, 선언된 변수 이름을 사용할 때는 반드시 순서를 지킬 것
    */
    // 리스트를 먼저 가져와야 함!!!
    let foodList = JSON.parse(localStorage.getItem("foodList") || "[]");
    // -> 위의 형태는 if-else를 쓰지 않고 코드 한 줄로 가져오기 위해서 사용하는 방식

    let html = `<h3>🍽️ 저장된 음식 목록 (총 ${foodList.length}개)</h3>`; // const 로 선언하면 에러 발생!
    for (let i = 0; i < foodList.length; i++) {
        html += `
            <div class="item-row">
                <div>
                <strong>🍽️ ${foodList[i].foodName}</strong><br>
                💰 가격: ${foodList[i].price}원<br>
                📂 카테고리: ${foodList[i].category}<br>
                📅 등록일: ${foodList[i].createAt}
                </div>
            </div>
        `;
    }
    $("#allData").html(html);
}

function clearAllFoodData(e) {
    e.preventDefault();

    if (confirm("모든 음식데이터를 삭제하시겠습니까?")) {
        localStorage.removeItem("foodList"); // 기존에 있던 키 말고 foodList만 삭제
    }
    alert("모든 음식데이터가 삭제되었습니다.");
}
