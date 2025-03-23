document.addEventListener('DOMContentLoaded', () => {
    getData();

    // Obsługa formularza dodawania
    const addForm = document.getElementById('add');
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await addRecord();
    });

    // Obsługa formularza edycji
    const editForm = document.getElementById('editForm');
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await updateRecord();
    });

    // document.getElementById('closeEdit').addEventListener('click', () => {
    //     document.getElementById('editModal').style.display = 'none';
    // });
});

async function getData() {
    try {
        const response = await fetch('ajax.php');
        const data = await response.json();

        // Wypełnienie tabeli danymi z bazy
        const tbody = document.querySelector('#monetki tbody');
        tbody.innerHTML = '';

        console.log(data);


        data.dane.forEach(row => {
            const tr = document.createElement('tr');
            tr.id = `row-${row.ID}`;
            tr.innerHTML = `
                <td>${row.ID}</td>
                <td><img src="./gfx/${row.Flaga}" width="50" height="50"></td>
                <td>${row.Nominal}</td>
                <td>${row.Katalog}</td>
                <td>${row.Stupka}</td>
                <td>${row.Rok}</td>
                <td>${row.Kraj}</td>
                <td>
                    <button onclick="deleteRecord(${row.ID})">Usuń</button>
                    <button onclick='openEditModal(${JSON.stringify(row)})'>Edytuj</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        fillDropdowns(data.Flagi, document.getElementById('flags'));
        fillDropdowns(data.Stopy, document.getElementById('stupka'));
        fillDropdowns(data.Flagi, document.getElementById('edit-flaga'));
        fillDropdowns(data.Stopy, document.getElementById('edit-stupka'));

    } catch (error) {
        console.error('Błąd przy pobieraniu danych:', error);
    }
}

function fillDropdowns(optionsArray, selectElement) {
    selectElement.innerHTML = '';
    optionsArray.forEach(optionValue => {
        selectElement.innerHTML += `<option value="${optionValue}">${optionValue}</option>`;
    });
}


async function addRecord() {
    const formData = new FormData(document.getElementById('add'));
    try {
        const response = await fetch('add.php', {
            method: 'POST',
            body: formData
        });
        const result = await response.text();
        console.log(result);
        await getData();
        document.getElementById('add').reset();
    } catch (error) {
        console.error('Błąd przy dodawaniu rekordu:', error);
    }
}

function openEditModal(record) {
    document.getElementById('edit-id').value = record.ID;
    document.getElementById('edit-flaga').value = record.Flaga;
    document.getElementById('edit-nominal').value = record.Nominal;
    document.getElementById('edit-stupka').value = record.Stupka;
    document.getElementById('edit-rok').value = record.Rok;
    document.getElementById('edit-katalog').value = record.Katalog;
    document.getElementById('edit-country').value = record.Kraj;
    document.getElementById('editModal').style.display = 'block';
}

async function updateRecord() {
    const formData = new FormData(document.getElementById('editForm'));
    try {
        const response = await fetch('update.php', {
            method: 'POST',
            body: formData
        });
        const result = await response.text();
        console.log(result);
        await getData();
        document.getElementById('editModal').style.display = 'none';
    } catch (error) {
        console.error('Błąd przy aktualizacji rekordu:', error);
    }
}

async function deleteRecord(id) {
    if (confirm("Na pewno chcesz usunąć rekord?")) {
        try {
            const response = await fetch(`delete.php?id=${id}`);
            const result = await response.json();
            if (result.success) {
                // Usuwamy wiersz z tabeli
                document.getElementById(`row-${id}`).remove();
            } else {
                console.error('Błąd przy usuwaniu rekordu:', result.message);
            }
        } catch (error) {
            console.error('Błąd przy usuwaniu rekordu:', error);
        }
    }
}
