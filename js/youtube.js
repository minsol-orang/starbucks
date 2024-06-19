// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script'); // document 객체에서 createElement 즉 요소를 생성하는 메소드를 사용하여 script 태그를 생성해서 tag 라는 변수에다가 할당한다는 의미 . 그렇다고 바로 html 문서에 반영되는 것은 아님

tag.src = "https://www.youtube.com/iframe_api"; // 생성한 script 태그 부분에 source라는 속성에다가 실제 유튜브 영상을 재생할 수 있는 명령의 자바스크립트 파일을 가지고 옴
var firstScriptTag = document.getElementsByTagName('script')[0]; //script 태그를 가지고 있는 요소들 중에 zero-based numbering 즉 0부터 번호를 매기는 방법을 이용해서 찾은 제일 첫 번째 요소를 firstScriptTag 라는 변수에다가 할당을 해준다.
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); // 그렇게 찾은 첫 번째 script태그의 parentNode 즉 부모요소를 찾아 firstScriptTag 이전 부분에 tag변수를 삽입한다는 의미. 기준이 되는 기존 노드의 부모 요소를 알아야, 그 부모 요소의 자식 노드로 새 노드를 삽입할 수 있음

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() { // 여기서 함수 이름은 우리가 외부에서 가져오는 유튜브를 제어할 수 있는 외부 자바스크립트 라이브러리에서 이 함수의 이름을 자동으로 찾게 만들어져 있음. 다른 함수 이름을 사용하면 안됨
    // <div id="player"></div>
    new YT.Player('player', { // new라는 키워드를 앞에 붙이고 yt(유튜브 명령)에서 player라는 메소드를 실행하여 옵션을 적어주면 됨. 여기서 player는 우리가 html 부분에 id값으로 player 를 지정한 id속성의 값이 들어가는 것 
    // height: '360', // 영상의 세로 너비 , 딱히 필요 없음
    // width: '640',  // 영상의 가로 너비
        videoId: 'An6LvWQuj_8', // 우리가 어떤 id값을 가지고 있는 유튜브 비디오를 출력할 것이냐는 의미. 최초 재생할 유튜브 영상의 id를 작성
        playerVars: { // 영상을 재생하기 위한 여러 가지 변수들 이라는 의미
            autoplay: true, // 자동 재생 유무
            loop: true, // 반복 재생 유무
            playlist: 'An6LvWQuj_8' // 반복 재생할 유튜브 영상 ID 목록. 반복 재생 유무가 true인 경우에는 다시 반복해서 재생할 그 영상의 id를 목록으로 제공해 줘야 함
        },
        events: {
            onReady: function(event) { // 동영상 플레이어가 준비가 되면 그떄 이 함수를 실행해주는데, 그 함수의 인수로 이 동영상이 플레이 되는 어떤 상황 자체를 데이터로서 넘겨주는 것
                event.target.mute() // target은 지금 재생되고 있는 그 영상 자체를 의미. mute 는 음소거 처리
            }
        }
        
    });
} 

