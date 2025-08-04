$(function () {
    $(".register-btn").click(addProduct);
});

function addProduct(e) {
    e.preventDefault(); // 제출 방지

    // 입력값 가져오기
    const productName = $("#productName").val();
    const productPrice = $("#productPrice").val();
    const productImage = $("#productImage").val();

    // 전역변수 선언 - localStorage에 저장된 productList를 가져와서 리스트 형태로 파싱 또는 빈 배열
    // localStorage 자체가 문자열만 취급하기 때문에 빈 배열도 "[]" 로 문자열 처리해서 적어줘야 함.
    let productList = JSON.parse(localStorage.getItem("productList") || "[]");

    // 새 제품정보 담는 json 배열 생성
    const newProduct = {
        name: productName,
        price: productPrice,
        image: productImage,
    };

    // 빈 배열 또는 기존 배열에 새로운 제품 정보 추가
    productList.push(newProduct);
    // localStorage에 저장 -> json 형식으로 문자열로 변환해서 저장!
    localStorage.setItem("productList", JSON.stringify(productList));

    // 결과 페이지로 이동
    window.location.href = "23_제품목록.html";
}
