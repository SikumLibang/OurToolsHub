const input = document.getElementById("inputText");
const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");

// Live stats update
input.addEventListener("input", updateStats);

function updateStats() {
    const text = input.value;
    charCount.textContent = "Characters: " + text.length;
    wordCount.textContent = "Words: " + (text.trim() ? text.trim().split(/\s+/).length : 0);
}

function convertCase(type) {
    let text = input.value;

    switch(type) {
        case "upper":
            text = text.toUpperCase();
            break;

        case "lower":
            text = text.toLowerCase();
            break;

        case "title":
            text = text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
            break;

        case "sentence":
            text = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
            break;

        case "camel":
            text = text.toLowerCase()
                .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
            break;

        case "pascal":
            text = text.toLowerCase()
                .replace(/(^\w|[^a-zA-Z0-9]+(\w))/g, (m) => m.replace(/[^a-zA-Z0-9]/, '').toUpperCase());
            break;

        case "snake":
            text = text.toLowerCase()
                .replace(/[^a-zA-Z0-9]+/g, '_');
            break;

        case "kebab":
            text = text.toLowerCase()
                .replace(/[^a-zA-Z0-9]+/g, '-');
            break;
    }

    input.value = text;
    updateStats();
}

function clearText() {
    input.value = "";
    updateStats();
}

function copyText() {
    const textArea = document.getElementById("inputText");
    const message = document.getElementById("copyMessage");

    if (!textArea.value.trim()) {
        message.innerText = "Nothing to copy 🙂";
        return;
    }

    navigator.clipboard.writeText(textArea.value).then(() => {
        message.innerText = "Text copied successfully ✓";
        setTimeout(() => {
            message.innerText = "";
        }, 2000);
    });
}

const textarea = document.getElementById("inputText");

textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
});
