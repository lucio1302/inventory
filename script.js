let inventario = [];

async function caricaInventario() {
    const response = await fetch('/inventario.json');
    inventario = await response.json();
    aggiornaTabella();
}

async function salvaInventario() {
    await fetch('/salva', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inventario)
    });
}

function eseguiAzione() {
    let azione = document.getElementById('azione').value.toLowerCase();
    
    document.getElementById('form-articoli').style.display = 'none';
    document.getElementById('form-rimozione').style.display = 'none';
    document.getElementById('form-ricerca').style.display = 'none';

    if (azione === 'aggiungere') {
        document.getElementById('form-articoli').style.display = 'block';
    } else if (azione === 'rimuovere') {
        document.getElementById('form-rimozione').style.display = 'block';
    } else if (azione === 'cercare') {
        document.getElementById('form-ricerca').style.display = 'block';
    }
}

function aggiornaTabella() {
    let tbody = document.getElementById('articoli');
    tbody.innerHTML = '';
    inventario.forEach((articolo, index) => {
        if (articolo && articolo.nome) { // Verifica che l'articolo sia valido
            let row = tbody.insertRow();
            row.insertCell(0).innerText = articolo.nome || '';
            row.insertCell(1).innerText = articolo.acquisto || '';
            row.insertCell(2).innerText = articolo.vendita || '';
            row.insertCell(3).innerText = articolo.listino || '';
        }
    });
}

function aggiungiArticolo() {
    let nomeArticolo = document.getElementById('nome-articolo').value;
    let prezzoAcquisto = document.getElementById('prezzo-acquisto').value;
    let prezzoVendita = document.getElementById('prezzo-vendita').value;
    let prezzoListino = document.getElementById('prezzo-listino').value;

    if (nomeArticolo && prezzoAcquisto && prezzoVendita && prezzoListino) {
        let nuovoArticolo = {
            nome: nomeArticolo,
            acquisto: parseFloat(prezzoAcquisto).toFixed(2),
            vendita: parseFloat(prezzoVendita).toFixed(2),
            listino: parseFloat(prezzoListino).toFixed(2)
        };
        inventario.push(nuovoArticolo);
        aggiornaTabella();
        salvaInventario();
        
        document.getElementById('nome-articolo').value = '';
        document.getElementById('prezzo-acquisto').value = '';
        document.getElementById('prezzo-vendita').value = '';
        document.getElementById('prezzo-listino').value = '';
    } else {
        alert("Per favore, compila tutti i campi.");
    }
}

function rimuoviArticolo() {
    let nomeArticolo = document.getElementById('nome-articolo-rimuovi').value;
    let index = inventario.findIndex(articolo => articolo.nome === nomeArticolo);
    if (index !== -1) {
        inventario.splice(index, 1);
        aggiornaTabella();
        salvaInventario();
        document.getElementById('nome-articolo-rimuovi').value = '';
    } else {
        alert("L'articolo non è stato trovato.");
    }
}

function cercaArticolo() {
    let nomeArticolo = document.getElementById('nome-articolo-ricerca').value;
    let count = inventario.filter(articolo => articolo.nome === nomeArticolo).length;
    if (count > 0) {
        alert(`L'articolo che stai cercando è presente ${count} volte nell'inventario.`);
    } else {
        alert("L'articolo non è presente nell'inventario.");
    }
}

document.addEventListener('DOMContentLoaded', caricaInventario);
