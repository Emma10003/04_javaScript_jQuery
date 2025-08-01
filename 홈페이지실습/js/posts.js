// https://jsonplaceholder.typicode.com/posts
// https://jsonplaceholder.typicode.com/posts/1/comments?_limit=3

// 전역변수 - post.js 모든 곳에서 사용할 수 있는 변수이름
let 현재페이지 = 1; // 현재 페이지
let 전체게시물 = []; // 전체 페이지
console.log("전체게시물 1번 : ", 전체게시물);
const 페이지당게시물수 = 10; // 페이지 당 게시물 수 -> 한 페이지 당 10개

$(function () {
    // 1. posts를 클릭하지 않고 가져오기
    // 한 페이지 당 10개의 게시물만 볼 수 있도록 만들 것!
    getAllPosts();

    $("#prevBtn").click(prevPage);
    $("#nextBtn").click(nextPage);
});

// getAllPosts() : 초반에 데이터를 전체 가져오는 기능
function getAllPosts() {
    $.get(`https://jsonplaceholder.typicode.com/posts`).done(function (data) {
        전체게시물 = data; // 전체 데이터를 변수에 저장
        console.log("전체게시물 2번 : ", 전체게시물);
        getPosts(); // 첫 번째 페이지 표시
    });
}

// getPosts() : 페이지에 해당하는 게시물만 보여주는 기능
function getPosts() {
    // 현재 페이지에서 해당하는 게시물들만 계산
    const 시작인덱스 = (현재페이지 - 1) * 페이지당게시물수; // 현재페이지=1인데 인덱스는 0부터니까 -1.
    console.log("시작인덱스 : ", 시작인덱스);

    const 끝인덱스 = 시작인덱스 + 페이지당게시물수; // ex) 페이지당 게시물수가 10이면 시작이 10일 때 끝은 20.
    console.log("끝인덱스 : ", 끝인덱스);

    const 현재페이지게시물 = 전체게시물.slice(시작인덱스, 끝인덱스);
    console.log("현재페이지게시물 : ", 현재페이지게시물);

    /*
        ex)
        현재페이지(currentPage) = 2
        페이지당게시물수 = 10
        시작인덱스 = (2 - 1) * 10 = 10
        끝인덱스   = 10 + 10 = 20
        현재페이지게시물 = [].slice(10, 20) -> 전체게시물 리스트에서 10 ~ 19번째 요소를 인덱싱.
        
        전체게시물 -> 100개

        총페이지수 = Math.ceil([].length / 10)
            = Math.ceil(100 / 10) = 10
        
        현재페이지게시물.map()
            -> 10~19번째 게시물 리스트에 대해 .map(순회하면서 게시물 꺼내기) 수행
    */

    // 페이지 정보 업데이트
    const 총페이지수 = Math.ceil(전체게시물.length / 페이지당게시물수); // 전역변수로 선언하면 안 되나?
    $("#pageInfo").text(`페이지 ${현재페이지} / 페이지 ${총페이지수}`);
    $("#postsResult").html(
        // map으로 순회하는 데이터를 모두 전달받을 것! done -> function -> html 순서 기억!
        현재페이지게시물.map(
            // 한 번에 여러개 가져오기~ map이니까 인덱싱 안 해도 됨 (+ json은 배열 형식임)
            (post) =>
                `
                    <div class="success">
                        <div class="post-item" onclick="getComments(${post.id})">
                            <h4>${post.id}. ${post.title}</h4>
                            <p>${post.body}</p>
                        </div>
                    </div>
                `
        )
    );
}

// 이전페이지 버튼
function prevPage() {
    if (현재페이지 > 1) {
        현재페이지--;
        getPosts();
    } else {
        alert("첫 번째 페이지입니다.");
    }
}

// 다음페이지 버튼
function nextPage() {
    const 총페이지수 = Math.ceil(전체게시물.length / 페이지당게시물수); // ceil: 올림
    if (현재페이지 < 총페이지수) {
        현재페이지++;
        getPosts();
    } else {
        alert("마지막 페이지입니다.");
    }
}

// 게시물에 해당하는 댓글 가져오기
function getComments(postId) {
    // https://jsonplaceholder.typicode.com/posts/1/comments?_limit=3
    $.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments?_limit=3`
    ).done(function (data) {
        $("#commentResult").html(
            data.map(
                (comment) =>
                    `
                        <h4>${comment.name}</h4>
                        <p>${comment.email}</p>
                        <p>${comment.body}</p>
                    `
            )
        );
    });
}
