$(function () {
  let last_video_id = getLastVideoId();
  const lastSermonData = loadSermonData(last_video_id);
  if (lastSermonData) {
    displayToTemplate(lastSermonData.videoText);
    displayToInputData(lastSermonData);
  }

  $('.sermon-input').on('change', function () {
    const sermonData = makeSermonDataFromSermonInputData();
    saveSermonData(sermonData);
    displayToTemplate(sermonData.videoText);
  });

  $('#btn-download').on('click', downloadToFile);
});

const getSermonInputDataFromInput = () => {
  const sermonDate = $('#sermon-date').val();
  const sermonTitle = $('#sermon-title').val();
  const sermonPastor = $('#sermon-pastor').val();
  const sermonScripture = $('#sermon-scripture').val();
  const sermonMp3 = $('#sermon-mp3').val();
  const sermonPodCast = $('#sermon-podcast').val();
  const sermonVideo = $('#sermon-video').val();

  return { sermonDate, sermonTitle, sermonPastor, sermonScripture, sermonMp3, sermonPodCast, sermonVideo };
};

const makeSermonDataFromSermonInputData = () => {
  const sermonInputData = getSermonInputDataFromInput();
  const videoText = makeVideoText(sermonInputData);
  sermonInputData['videoText'] = videoText;
  return sermonInputData;
};

const saveSermonData = (sermonData) => {
  const { sermonDate, sermonTitle, sermonPastor, sermonScripture, sermonMp3, sermonPodCast, sermonVideo, videoText } =
    sermonData;
  const doc = {
    id: sermonDate,
    date: sermonDate,
    title: sermonTitle,
    pastor: sermonPastor,
    scripture: sermonScripture,
    mp3: sermonMp3,
    podcast: sermonPodCast,
    video: sermonVideo,
    videoText: videoText,
  };

  localStorage.setItem(doc.id, JSON.stringify(doc));
  saveLastVideoId(sermonDate);
};

const loadSermonData = (date) => {
  const sermonData = JSON.parse(localStorage.getItem(date));
  return sermonData;
};

const displayToInputData = (sermonData) => {
  const date = $('#sermon-date').val(sermonData.date);
  const title = $('#sermon-title').val(sermonData.title);
  const pastor = $('#sermon-pastor').val(sermonData.pastor);
  const scripture = $('#sermon-scripture').val(sermonData.scripture);
  const mp3 = $('#sermon-mp3').val(sermonData.mp3);
  const podcast = $('#sermon-podcast').val(sermonData.podcast);
  const video = $('#sermon-video').val(sermonData.video);
};

const displayToTemplate = (videoText) => {
  const mainText = document.getElementById('main-text');
  mainText.value = videoText;
};

const getLastVideoId = () => {
  return localStorage.getItem('last_video_id');
};

const saveLastVideoId = (video_id) => {
  localStorage.setItem('last_video_id', video_id);
};

const downloadToFile = () => {
  const content = $('#main-text').val();
  const formattedDate = $('#sermon-date').val().replace(/-/g, ''); // YYYYMMDD format
  const filename = `${formattedDate}.txt`;

  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  link.click();
  URL.revokeObjectURL(link.href);
};

const makeVideoText = ({
  sermonDate,
  sermonTitle,
  sermonPastor,
  sermonScripture,
  sermonMp3,
  sermonPodCast,
  sermonVideo,
}) => {
  const sermonDateObject = new Date(sermonDate);
  const sermonYear = String(sermonDateObject.getFullYear());
  const sermonMonth = String(sermonDateObject.getMonth() + 1).padStart(2, 0);
  const sermonDay = String(sermonDateObject.getDate()).padStart(2, 0);

  let template = `${sermonYear}.${sermonMonth}.${sermonDay} - ${sermonTitle}

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

[전체영상] ${sermonYear}.${sermonMonth}.${sermonDay} 안덕교회 주일예배 - 1부
https://www.youtube.com/watch?v=
-----------------
${sermonYear}년 ${sermonMonth}월 ${sermonDay}일 주일예배 - 1부

${sermonTitle}

설교자 : ${sermonPastor} 목사

성경말씀 : ${sermonScripture}
-----------------

[전체영상] ${sermonYear}.${sermonMonth}.${sermonDay} 안덕교회 주일예배 - 2부
https://www.youtube.com/watch?v=
-----------------
${sermonYear}년 ${sermonMonth}월 ${sermonDay}일 주일예배 - 2부

${sermonTitle}

설교자 : ${sermonPastor} 목사

성경말씀 : ${sermonScripture}
---------------------

[전체영상] ${sermonYear}.${sermonMonth}.${sermonDay} 안덕교회 주일예배 - 구역찬양예배
https://www.youtube.com/watch?v=
-----------------
${sermonYear}년 ${sermonMonth}월 ${sermonDay}일 주일예배 - 구역찬양예배

신앙의 순수성을 잃지 맙시다

설교자 : ${sermonPastor} 목사

성경말씀 : 사사기 16장 20절
-----------------
`;

  return template;
};
