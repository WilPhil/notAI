document.getElementById('get-started-button').addEventListener('click', function() {
    document.getElementById('text-box').scrollIntoView({ behavior: 'smooth' });
});

const textArea = document.getElementById('text-area');
const charCountDisplay = document.getElementById('char-count');
const maxLength = 1000;

textArea.addEventListener('input', function() {
    const textLength = textArea.textContent.length;
    charCountDisplay.textContent = `${textLength}/${maxLength}`;

    if (textLength > maxLength) {
        const truncatedText = textArea.textContent.substring(0, maxLength);
        textArea.textContent = truncatedText;
        charCountDisplay.textContent = `${maxLength}/${maxLength}`;
    }
});

charCountDisplay.textContent = `0/${maxLength}`;

document.getElementById('scan-button').addEventListener('click', async function() {
    const text = textArea.textContent;
    if (text.length === 0) {
        alert('Please enter some text!');
        return;
    }

    document.getElementById('loading').style.display = 'flex';

    try {
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        document.getElementById('analysis-result').innerHTML = `${result.prob}<br><p>${result.verdict}</p>`;
        document.getElementById('text-area-title').style.display = 'none';
        document.getElementById('result-box').style.display = 'flex';
        document.getElementById('text-box').classList.add('half-size');

        const highlights = result.highlights;
        let highlightedText = ' ';
        highlights.forEach(([type, chunk]) => {
            if (type == 'ai') {
                highlightedText += `<span class="ai-text">${chunk}</span>`;
            } else if (type == 'human') {
                highlightedText += `<span class="human-text">${chunk}</span>`;
            } else {
                highlightedText += `${chunk}`;
            }
        });

        textArea.innerHTML = highlightedText;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('There was a problem with the request. Please try again later.');
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}); 