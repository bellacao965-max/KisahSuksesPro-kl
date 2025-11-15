export async function askAI(prompt) {
    const HF_TOKEN = "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";

    const response = await fetch("https://api-inference.huggingface.co/models/google/gemma-2-2b-it", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + HF_TOKEN,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            inputs: prompt,
            parameters: { max_new_tokens: 200 }
        })
    });

    const data = await response.json();
    return data[0]?.generated_text || JSON.stringify(data);
}

window.send = async function () {
    const p = document.getElementById("prompt").value;
    const out = await askAI(p);
    document.getElementById("out").innerText = out;
}
