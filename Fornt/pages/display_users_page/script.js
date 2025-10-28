const url = 'http://localhost:2000/api.php';
const table = document.querySelector('.table');
const edit_form = document.querySelector('.detalis_form_user');
const submit_btn = document.querySelector('.submit');

let edit_buttons = [];
let delete_buttons = [];

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

                const avatar = document.createElement("div");
                avatar.innerText = user.avatar;
                table.appendChild(avatar);


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

            edit_buttons = Array.from(document.querySelectorAll('[data-edit_id]'));
            delete_buttons = Array.from(document.querySelectorAll('[data-delete_id]'));

            addEventToEdit(edit_buttons)
            addEventToDelete(delete_buttons)
        }

    } catch (error) {
        console.log("Error: ", error);
    }
}

getUsers()

function addEventToEdit(arr_buttons) {
    for (let i = 0; i < arr_buttons.length; i++) {
        arr_buttons[i].addEventListener('click', (e) => {
            const id = e.target.dataset.edit_id;

            getUserFromId(id)

            current_id = id
        })
    }
}

function addEventToDelete(arr_buttons) {
    for (let i = 0; i < arr_buttons.length; i++) {
        arr_buttons[i].addEventListener('click', (e) => {
            const id = e.target.dataset.delete_id;

            deleteUser(id)
        })
    }
}

async function deleteUser(id) {
    try {
        const response = await fetch(`${url}/deleteUser`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id})
        })
        if (response.ok) {
            window.location.reload();
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
            edit_form.style.display = "block";

            first_name_field.value = user.name;
            last_name_field.value = user.last_name;
            avatar_field.value = user.avatar;
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}


submit_btn.addEventListener('click', () => {
    editUser(current_id)

    edit_form.style.display = "none";
});


async function editUser(id) {
    const first_name_field = document.querySelector('#imie').value;
    const last_name_field = document.querySelector('#nazwisko').value;
    const avatar_field = document.querySelector('#avatar').value;

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
            window.location.reload();
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}
