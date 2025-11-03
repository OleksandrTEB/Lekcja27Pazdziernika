const url = 'http://localhost/Lekcja27Pazdziernika/Backend/php/api.php';
const table = document.querySelector('.table');
const show_alert = document.querySelector('.alert');
const show_out_alert = document.querySelector('.out_alert');
const modal_window = document.querySelector('.modal_window');
const add_user_btn = document.querySelector('.add_user_button')
const submit_btn = document.querySelector(".submit_btn")
const title_value = document.querySelector('.title_actions')

add_user_btn.addEventListener('click', (e) => {
    modal_window.style.display = 'block'
    title_value.textContent = 'Dodaj tu nowego użytkownika!'
    submit_btn.dataset.status = "add"
})

submit_btn.addEventListener("click", () => {
    if (submit_btn.dataset.status === "add") {
        addUser()
    } else if (submit_btn.dataset.status === "edit") {
        editUser(current_id)
    }
})


let current_id = 0;

async function getUsers() {
    try {
        const response = await fetch(`${url}/getAllUsers`, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        })

        if (response.ok) {
            const data = await response.json()
            const users = data.users;

            users.forEach(user => {
                const id = document.createElement("div");
                id.innerText = user.id;
                table.appendChild(id);

                const first_name = document.createElement("div");
                first_name.innerText = user.name;
                table.appendChild(first_name);

                const last_name = document.createElement("div");
                last_name.innerText = user.last_name;
                table.appendChild(last_name);


                const avatar_div = document.createElement("div")
                const avatar = document.createElement("img");
                avatar_div.appendChild(avatar)
                avatar.src = user.avatar;
                table.appendChild(avatar_div);


                const div_buttons = document.createElement("div");
                div_buttons.classList.add("buttons");

                const edit_button = document.createElement("button");
                const delete_button = document.createElement("button");

                edit_button.innerText = "Edit";
                edit_button.dataset.edit_id = user.id;

                delete_button.innerText = "Delete";
                delete_button.dataset.delete_id = user.id;

                div_buttons.appendChild(edit_button);
                edit_button.classList.add("edit");

                div_buttons.appendChild(delete_button);
                delete_button.classList.add("delete");

                table.appendChild(div_buttons);
            })

            document.querySelectorAll('[data-edit_id]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.edit_id;

                    submit_btn.dataset.status = "edit"
                    title_value.textContent = 'Zmień tu użytkownika!'

                    getUserFromId(id)

                    current_id = id;
                })
            })
            
            document.querySelectorAll('[data-delete_id]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.delete_id;

                    deleteUser(id)
                })
            });
        }

    } catch (error) {
        console.log("Error: ", error);
    }
}

getUsers()

async function deleteUser(id) {
    try {
        const response = await fetch(`${url}/deleteUser`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id})
        })

        const data = await response.json()

        if (response.ok) {
            show_out_alert.textContent = data.message
            show_out_alert.style.display = 'block'

            setTimeout(() => {
                window.location.reload();
            }, 3000)
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}

async function getUserFromId(id) {
    const first_name_field = document.querySelector('#imie');
    const last_name_field = document.querySelector('#nazwisko');
    const avatar_field = document.querySelector('#avatar');

    try {
        const response = await fetch(`${url}/getUserFromId`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id})
        })

        const data = await response.json();

        if (response.ok) {
            const user = data.user;
            modal_window.style.display = "block";

            first_name_field.value = user.name;
            last_name_field.value = user.last_name;
            avatar_field.value = user.avatar;
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}


async function editUser(id) {
    const first_name_field = document.querySelector('#imie').value;
    const last_name_field = document.querySelector('#nazwisko').value;
    const avatar_field = document.querySelector('#avatar').value;

    add_user_btn.dataset.status = "edit"

    const user_data = {
        id: id,
        name: first_name_field,
        last_name: last_name_field,
        avatar: avatar_field,
    }

    try {
        const response = await fetch(`${url}/editUser`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user_data)
        })
        if (response.ok) {
            show_alert.textContent = "Użytkownik został zmieniony!"
            show_alert.style.display = 'block';

            setTimeout(() => {
                window.location.reload();
            }, 3000)
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}


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
            show_alert.textContent = "Użytkownik został dodany!"
            show_alert.style.display = 'block';

            setTimeout(() => {
                window.location.reload()
            }, 3000)
        }

    } catch (error) {
        console.log("Error: ", error);
    }
}