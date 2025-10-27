const url = 'http://localhost:2000'

async function request() {
    try {
        const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
    const data = await response.json();

    console.log(data)
    } catch (error) {
        console.log(error);
    }
}

request()