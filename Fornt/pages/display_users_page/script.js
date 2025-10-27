const url = 'http://localhost:2000/api.php/getAllUsers';
const div_id = document.querySelector('.id_value');
const div_first_name = document.querySelector('.first_name_value');
const div_last_name = document.querySelector('.last_name_value');
const div_avatar = document.querySelector('.avatar_value');


async function getUsers() {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        })

        if (response.ok) {
            const data = await response.json()
            const users = data.users;

            users.forEach(user => {
                const id = document.createElement("div");
                id.innerText = user.id;
                div_id.appendChild(id);

                const first_name = document.createElement("div");
                first_name.innerText = user.name;
                div_first_name.appendChild(first_name);

                const last_name = document.createElement("div");
                last_name.innerText = user.last_name;
                div_last_name.appendChild(last_name);

                const avatar = document.createElement("div");
                avatar.innerText = user.avatar;
                div_avatar.appendChild(avatar);
            })
        }

    } catch (error) {
        console.log("Error: ", error);
    }
}

getUsers()