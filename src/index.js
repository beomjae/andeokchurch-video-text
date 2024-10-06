// 화면을 처음 열면 최근에 저장한 데이터를 불러온다.
// 1. 마지막 저장한 id 값을 불러온다.
// 2. 마지막 저장한 ID가 있으면 해당 ID의 데이터를 불러온다.
const video_text_db = new PouchDB('video_text');

$(async function () {
  let last_video_id = get_last_video_id();
  console.log(last_video_id);

  const lastData = await loadVideoData(last_video_id);
  if (lastData) {
    const videoText = getTemplate();
  }
});

$('.sermon-input').on('change', function () {
  const videoText = getTemplate();
  saveInputData(videoText);
  displayToTemplate(videoText);
});

const displayToInputData = (videoData) => {
  const date = $('#sermon-date').val(videoData._id);
  const title = $('#sermon-title').val(videoData.title);
  const pastor = $('#sermon-pastor').val();
  const scripture = $('#sermon-scripture').val();
  const mp3 = $('#sermon-mp3').val();
  const podcast = $('#sermon-podcast').val();
  const video = $('#sermon-video').val();
};
const displayToTemplate = (videoData) => {
  const mainText = document.getElementById('main-text');
  mainText.value = videoData;
};

const get_last_video_id = () => {
  return (last_video_id = localStorage.getItem('last_video_id'));
};

const save_last_video_id = (video_id) => {
  localStorage.setItem('last_video_id', video_id);
};

const saveInputData = (videoText) => {
  const date = $('#sermon-date').val();
  const title = $('#sermon-title').val();
  const pastor = $('#sermon-pastor').val();
  const scripture = $('#sermon-scripture').val();
  const mp3 = $('#sermon-mp3').val();
  const podcast = $('#sermon-podcast').val();
  const video = $('#sermon-video').val();

  const doc = {
    _id: date,
    date: date,
    title: title,
    scripture: scripture,
    mp3: mp3,
    scripture: scripture,
    podcast: podcast,
    video: video,
    video_text: videoText,
  };

  video_text_db.put(doc);

  console.log(doc);

  save_last_video_id(date);
};

const loadVideoData = async (_id) => {
  const result = await video_text_db.get(_id);
  console.log(result);
  return result;
};

function getTemplate() {
  const sermonDate = document.getElementById('sermon-date').value;
  const sermonTitle = document.getElementById('sermon-title').value;
  const sermonPastor = document.getElementById('sermon-pastor').value;
  const sermonScripture = document.getElementById('sermon-scripture').value;
  const sermonMp3 = document.getElementById('sermon-mp3').value;
  const sermonPodCast = document.getElementById('sermon-podcast').value;
  const sermonVideo = document.getElementById('sermon-video').value;

  console.log(sermonDate, sermonTitle, sermonPastor, sermonScripture, sermonMp3, sermonPodCast, sermonVideo);

  const sermonDateObject = new Date(sermonDate);
  const sermonYear = String(sermonDateObject.getFullYear());
  const sermonMonth = String(sermonDateObject.getMonth() + 1).padStart(2, 0);
  const sermonDay = String(sermonDateObject.getDate()).padStart(2, 0);

  let template = `${sermonDate} - ${sermonTitle}

${sermonYear}년 ${sermonMonth}월 ${sermonDay}일 주일예배

${sermonTitle}

설교자 : ${sermonPastor} 목사

성경말씀 : ${sermonScripture}

MP3 : ${sermonMp3}

팟캐스트 : ${sermonPodCast}

설교말씀영상 : ${sermonVideo}


▒▒▒　안덕교회 주일설교 안내　▒▒▒
- 안덕교회 카페 : http://cafe.daum.net/anduk-church
- 안덕교회 주일설교 : http://cafe.daum.net/anduk-church/Ambk
- 안덕교회 주일설교 팟캐스트 : http://www.podbbang.com/ch/1770192

<a href="${sermonMp3}">
<img width="100" src="https://andeok-sermon.s3.ap-northeast-2.amazonaws.com/mp3_button.png">
</a>
<a href="${sermonPodCast}">
<img width="100" src="https://andeok-sermon.s3.ap-northeast-2.amazonaws.com/podcast_button.png">
</a>

[전체영상] ${sermonDate} 안덕교회 주일예배 - 1부
https://www.youtube.com/watch?v=
-----------------
${sermonYear}년 ${sermonMonth}월 ${sermonDay}일 주일예배 - 1부

${sermonTitle}

설교자 : ${sermonPastor} 목사

성경말씀 : ${sermonScripture}
-----------------

[전체영상] ${sermonDate} 안덕교회 주일예배 - 2부
https://www.youtube.com/watch?v=
-----------------
${sermonYear}년 ${sermonMonth}월 ${sermonDay}일 주일예배 - 2부

${sermonTitle}

설교자 : ${sermonPastor} 목사

성경말씀 : ${sermonScripture}
---------------------

[전체영상] ${sermonDate} 안덕교회 주일예배 - 구역찬양예배
https://www.youtube.com/watch?v=
-----------------
${sermonYear}년 ${sermonMonth}월 ${sermonDay}일 주일예배 - 구역찬양예배

신앙의 순수성을 잃지 맙시다

설교자 : ${sermonPastor} 목사

성경말씀 : 사사기 16장 20절
-----------------
`;

  console.log(template);

  return template;
}
