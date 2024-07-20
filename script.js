document.getElementById('get-started-button').addEventListener('click', function() {
    document.getElementById('text-box').scrollIntoView({ behavior: 'smooth' });
});

const textArea = document.getElementById('text-area');
const charCountDisplay = document.getElementById('char-count');
const maxLength = textArea.getAttribute('maxlength');

textArea.addEventListener('input', function() {
    charCountDisplay.textContent = `${textArea.value.length}/${maxLength}`;
});

charCountDisplay.textContent = `0/${maxLength}`;

document.getElementById('scan-button').addEventListener('click', function() {
    const text = textArea.value;
    if (text.length === 0) {
        alert('Please enter some text!');
        return;
    } else {
        document.getElementById('text-area-title').style.display = 'none';
        document.getElementById('result-box').style.display = 'flex';
        document.getElementById('text-box').classList.add('half-size');
    }
});