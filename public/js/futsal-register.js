const scriptURL = 'https://script.google.com/macros/s/AKfycbyTzS1nvGVk6GiF42lQzxK8twM9e170sOgvA-gHBfc2SBK85CsGzgnqQnxgubd6Ou_q/exec';
const form = document.forms['submit-to-google-sheet']
form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => console.log('Success!', response))
    .catch(error => console.error('Error!', error.message))
})