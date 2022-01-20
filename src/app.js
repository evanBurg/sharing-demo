const elements = {
  h1: document.querySelector('h1'),
  titleInput: document.querySelector('#title'),
  textInput: document.querySelector('#text'),
  urlInput: document.querySelector('#url'),
  fileInput: document.querySelector('#files'),
  shareBtn: document.querySelector('#share'),
  shareFilesBtn: document.querySelector('#shareFiles')
}

if (window.location.href.includes('article')) {
  const parsedURL = new URL(window.location);
  const protocolURL = parsedURL.searchParams.get('id');
  const articleId = protocolURL.replace('web+pwa://', '').replace('/', '');
  elements.h1.innerHTML = `Article ID: ${articleId}`;
  // https://dev.localhost/article/?id=web+pwa://a213323123/
}

const onShare = async () => {
  const title = elements.titleInput.value;
  const text = elements.textInput.value;
  const url = elements.urlInput.value;

  try {
    if (navigator.share) {
      await navigator.share({
        title, text, url
      })
      console.log('Opened share sheet successfully', {title, text, url});
    } else {

    }
  } catch (e) {
    console.error(`Could not open share dialog`, e);
  }
}

const onShareFile = async () => {
  const title = elements.titleInput.value;
  const text = elements.textInput.value;
  const files = elements.fileInput.files;

  try {
    if (navigator.canShare && navigator.canShare({ files: files })) {
      await navigator.share({
        title, text, files,
      });
      console.log('Opened share sheet successfully', {title, text, files});
    } else {

    }
  } catch (e) {
    console.error(`Could not open share dialog`, e);
  }
}

elements.shareBtn.addEventListener('click', onShare);
elements.shareFilesBtn.addEventListener('click', onShareFile);