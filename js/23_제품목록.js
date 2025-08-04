$(function () {
    displayProducts();
    $("#delete-btn").click(deleteProducts);
});

// 상품 보여주기 함수
function displayProducts() {
    // localStorage에 저장된 productList 가져와서 리스트 형태로 파싱 또는 빈 배열
    let productList = JSON.parse(localStorage.getItem("productList") || "[]");

    const productHTML = productList
        .map(
            (product) =>
                `
             <div class="product-card">
                <img src="${product.image}" alt="${product.name}" />
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">${Number(
                        product.price
                    ).toLocaleString()}원</p>
                </div>
            </div>
        `
            // ${p.name} <- 여기에 들어가는 name, price, image 는
            // 23_제품등록.js에서 const newProduct = {} 안에 들어간 key 이름으로 호출해야 함.
            // 그게 productList 안에 들어간 json 형태의 키가 되기 때문
            /*
        {
             name: 어쩌구저쩌구
             price: 어쩌구저쩌구
             image: 어쩌구저쩌구
        }
             -> 이런 식으로 생긴 json 형태를 parse해서 리스트 형태로 가져온 게 productList = product
        */
        )
        .join(""); // map 뒤에 자동으로 붙는 콤마(,) 지우기

    $("#product-grid").html(productHTML);
}

// 상품 삭제 함수
function deleteProducts(e) {
    e.preventDefault(); // a의 href로 이동하는 기본 동작 방지

    // 사용자에게 정말 삭제할 것인지 최종 확인!!
    // alert : 확인 버튼
    // prompt : 입력창과 확인 버튼
    // confirm : 확인 취소 버튼     확인 = true  /  취소 = false
    if (confirm("정말 모든 제품을 삭제하시겠습니까?")) {
        // confirm에서 확인을 눌렀을 경우 (== true)
        // localStorage 에서 productList 에서 데이터만 제거
        localStorage.removeItem("productList");

        // 화면을 자동으로 F5(새로고침) 하여 변경사항 반영
        alert("모든 상품이 삭제되었습니다.");
        location.reload(); // 현재페이지 새로고침 -> window 생략한 코드
        // window.location.reload();
    }
}
