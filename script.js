document.addEventListener('DOMContentLoaded', () => {
    getData();

    // dodawanie form 
    const addForm = document.getElementById('add');
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // zeby sie strona nie przeladowywala
        await addRecord();
    });
});

let flags = [];
let stops = [];

async function getData() {
    try {
        const response = await fetch('ajax.php');
        const data = await response.json();

        // def danych na pozniej
        flags = data.Flagi;
        stops = data.Stopy;

        // Wypełnienie 
        const tbody = document.querySelector('#monetki tbody');
        tbody.innerHTML = '';

        data.dane.forEach(row => {
            const tr = document.createElement('tr');
            tr.id = `row-${row.ID}`;
            tr.innerHTML = `
                <td>${row.ID}</td>
                <td><img src="./gfx/${row.Flaga}" width="50" height="50" onclick="enableEditMode(${row.ID})"></td>
                <td>${row.Nominal}</td>
                <td>${row.Katalog}</td>
                <td>${row.Stupka}</td>
                <td>${row.Rok}</td>
                <td>${row.Kraj}</td>
                <td>
                    <button onclick="deleteRecord(${row.ID})">Usuń</button>
                    <button onclick="enableEditMode(${row.ID})">Edytuj</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        fillDropdowns(flags, document.getElementById('flags'));
        fillDropdowns(stops, document.getElementById('stupka'));

    } catch (error) {
        console.error('Błąd przy pobieraniu danych:', error);
    }
}

function fillDropdowns(options, selectElement) {
    selectElement.innerHTML = options.map(option =>
        `<option value="${option}">${option}</option>`
    ).join('');
}

async function addRecord() {
    const formData = new FormData(document.getElementById('add'));
    // formdata z keyvalue ogl taka basic do wysylania formow
    try {
        await fetch('add.php', {
            method: 'POST',
            body: formData
        });
        await getData();
        document.getElementById('add').reset();
    } catch (error) {
        console.error('Błąd przy dodawaniu:', error);
    }
}

function enableEditMode(id) {
    const tr = document.getElementById(`row-${id}`);
    const cells = tr.querySelectorAll('td');

    //  aktualne wartości
    const currentData = {
        flaga: cells[1].querySelector('img').src.split('/').pop(),
        nominal: cells[2].textContent,
        katalog: cells[3].textContent,
        stupka: cells[4].textContent,
        rok: cells[5].textContent,
        kraj: cells[6].textContent
    };

    // zmiana na edit
    tr.innerHTML = `
        <td>${id}</td>
        <td>
            <select class="edit-flaga">
                ${flags.map(flag =>
        `<option value="${flag}" ${flag === currentData.flaga ? 'selected' : ''}>${flag}</option>`
    ).join('')}
            </select>
        </td>
        <td><input type="text" class="edit-nominal" value="${currentData.nominal}"></td>
        <td><input type="text" class="edit-katalog" value="${currentData.katalog}"></td>
        <td>
            <select class="edit-stupka">
                ${stops.map(stop =>
        `<option value="${stop}" ${stop === currentData.stupka ? 'selected' : ''}>${stop}</option>`
    ).join('')}
            </select>
        </td>
        <td><input type="text" class="edit-rok" value="${currentData.rok}"></td>
        <td><input type="text" class="edit-kraj" value="${currentData.kraj}"></td>
        <td>
            <button onclick="saveEdit(${id})">Zapisz</button>
            <button onclick="cancelEdit(${id})">Anuluj</button>
        </td>
    `;
    tr.classList.add('editing');
}

async function saveEdit(id) {
    const tr = document.getElementById(`row-${id}`);
    const formData = new FormData();

    formData.append('id', id);
    formData.append('flaga', tr.querySelector('.edit-flaga').value);
    formData.append('nominal', tr.querySelector('.edit-nominal').value);
    formData.append('katalog', tr.querySelector('.edit-katalog').value);
    formData.append('stupka', tr.querySelector('.edit-stupka').value);
    formData.append('rok', tr.querySelector('.edit-rok').value);
    formData.append('country', tr.querySelector('.edit-kraj').value);
    // tutaj tez basic form taki zwykly 
    try {
        await fetch('update.php', {
            method: 'POST',
            body: formData
        });
        await getData();
    } catch (error) {
        console.error('Błąd :', error);
    }
}

function cancelEdit(id) {
    getData();
}


// przekierowanie do deleta
async function deleteRecord(id) {
    if (confirm('Na pewno usunąć rekord?')) {
        try {
            await fetch(`delete.php?id=${id}`);
            await getData();
        } catch (error) {
            console.error('Błąd usuwania:', error);
        }
    }
}