const url = 'http://localhost/Lekcja27Pazdziernika/back/php/api.php';
const show_alert = document.querySelector('.alert');

document.querySelector(".submit").addEventListener("click", () => {
    addUser()
})

async function addUser() {
    const first_name = document.querySelector("#imie").value;
    const last_name = document.querySelector("#nazwisko").value;
    const avatar = document.querySelector("#avatar").value;

    const user_data = {
        name: first_name,
        last_name: last_name,
        avatar: avatar,
    }

    try {
        const response = await fetch(`${url}/addUser`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user_data)
        })

        if (response.ok) {
            first_name.value = '';
            last_name.value = '';
            avatar.value = '';

            show_alert.style.display = 'block';

            setTimeout(() => {
                show_alert.style.display = 'none';
            }, 5000)
        }

    } catch (error) {
        console.log("Error: ", error);
    }
}