// https://pokeapi.co/api/v2/pokemon/681
let 현재페이지 = 1;

$(function () {
    // 클릭하지 않아도 자동으로 1번부터 포켓몬 호출
    pokeInfo(1); // 첫 번째 페이지

    // 이전 버튼을 눌렀을 때
    $("#prevBtn").click(() => { // 이전으로 돌아가는 버튼을 클릭했을 때
        if (현재페이지 > 1) {   // 1페이지 초과이면
            현재페이지 --;       // 이전 페이지로 가기
            pokeInfo(현재페이지);
        } else {
            alert("마지막 페이지입니다.")
        }
    });
    // 다음 버튼을 눌렀을 때
    $("#nextBtn").click(() => {  // 다음 페이지로 가기
        // 만약에 가장 마지막 페이지이면 "마지막 페이지입니다" alert 설정 하는 것이 좋음
        현재페이지++;
        pokeInfo(현재페이지);
    });
});

// range(시작, 끝-1) {} : 파이썬에서 사용하는 형식 (js에서는 지원하지 X)
// 파이썬의 range() 처럼 숫자 배열을 만드는 함수
function range(start, end) {
    /*
    ...
    Array() : 배열 생성

    end: 10,  start: 1 인 경우 아래와 같이 계산
    end - start + 1 = 10 -1 +1 = 10
    -> Array(10) => 10개의 배열을 생성하겠다.
                    근데 이제 소비자가 원하는 페이지의 번호로 끝나는 배열...
                    ---
                    아래 pokeInfo(page) 함수에서 range()함수를 호출할 때 변수로 사용되는 startId는
                    (page-1) * 10 + 1 로 고정되어 있고,
                    range(startId, startId + 9)로 입력값이 고정되어 있기 때문에
                    만약에 start 파라미터가 11이라면 end 파라미터는 20으로 고정된다.
    
    .keys() : 키들의 값으로 숫자를 넣겠다. 배열은 0부터 시작  [0,1,2, ... ,7,8,9] 와 같음
    .map(i => i + start) : 시작값 더하기
                    포켓몬 사이트는 0이 존재하지 않고 1부터 시작하기 때문에
                    배열은 0이지만 0번째에 https://pokeapi.co/api/v2/pokemon/1 의 값이 들어가게 되는 것.
    */
    return [...Array(end - start + 1).keys()].map(i => i + start);
}

function pokeInfo(page) {
    // 하나의 포켓몬을 개발자가 지정해서 선택한 상황 (681번째 포켓몬)
    // 1번부터 10번까지 포켓몬 가져오기

    const startId = (page-1) * 10 + 1;  // 주소~~~/0 에는 포켓몬이 없어서 1부터 시작, 10페이지씩 보여줄 거라서 *10 한 거
    const ids = range(startId, startId + 9)
    console.log("현재페이지: ", 현재페이지);
    $("#pokemonContainer").html('');  // 페이지 변경될 때 마다 기존 데이터 없애기

    // 페이지 번호 변경 설정
    $("#pageInfo").text(`페이지 ${현재페이지}`);  // .html()도 가능
    
    ids.map((i) => {  // [1,2,3,4,5,6,7,8,9,10]과 같은 걸 ids라는 변수로 만든 것
        $.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .done(
        function(data){
            $("#pokemonContainer").html(
                $("#pokemonContainer").html() +
                `
                <img src="${data.sprites.front_default}">
                `
            );
        });
    });
}
