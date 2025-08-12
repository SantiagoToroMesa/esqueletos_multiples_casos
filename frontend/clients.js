// Variables globales
let clients = [];

// Elementos del DOM
const container = document.querySelector('.container');

// Inicializar la página
document.addEventListener('DOMContentLoaded', async () => {
    await cargarclients();
});

// Cargar clients
async function cargarclients() {
    try {
        const response = await fetch('http://localhost:3000/clients');
        if (response.ok) {
            clients = await response.json();
            mostrarclients();
        } else {
            console.error('Error al cargar clients:', response.status);
        }
    } catch (error) {
        console.error('Error al cargar clients:', error);
    }
}

// Mostrar clients
function mostrarclients() {
    // Limpiar el contenido anterior (excepto el botón de crear)
    const botonCrear = container.querySelector('button');
    container.innerHTML = '';
    if (botonCrear) {
        container.appendChild(botonCrear);
    }

    if (clients.length === 0) {
        container.innerHTML += '<p>No clients</p>';
        return;
    }

    let html = '<div class="clients-lista">';
    clients.forEach(client => {
        html += `
            <div class="client">
                <h3>${client.name}</h3>
                <p>document: ${client.document}</p>
                <p>address: ${client.address}</p>
                <button onclick="editarclient(${client.id})">Edit</button>
                <button onclick="eliminarclient(${client.id})">Delete</button>
            </div>
        `;
    });
    html += '</div>';

    container.innerHTML += html;
}

// Crear client
async function crearclient(clientData) {
    try {
        const response = await fetch('http://localhost:3000/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientData)
        });

        if (response.ok) {
            Swal.fire('¡Succes!', 'client created succesfully', 'success');
            await cargarclients();
        } else {
            const errorData = await response.text();
            Swal.fire('Error', `Error to create the client: ${errorData}`, 'error');
        }
    } catch (error) {
        console.error('Error to create the client:', error);
        Swal.fire('Error', 'connection error', 'error');
    }
}

// Actualizar client
async function actualizarclient(id, clientData) {
    try {
        const response = await fetch(`http://localhost:3000/clients/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientData)
        });

        if (response.ok) {
            Swal.fire('¡success!', 'client updated succesfully', 'success');
            await cargarclients();
        } else {
            const errorData = await response.text();
            Swal.fire('Error', `Error to updated the client: ${errorData}`, 'error');
        }
    } catch (error) {
        console.error('Error to updated the client:', error);
        Swal.fire('Error', 'connection error', 'error');
    }
}

// Eliminar client
async function eliminarclient(id) {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "Are you sure you want to delete this client?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'yes, delete',
        cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
        try {
            const response = await fetch(`http://localhost:3000/clients/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                Swal.fire('¡Deleted!', 'client deleted successfully', 'success');
                await cargarclients();
            } else {
                const errorData = await response.text();
                Swal.fire('Error', `Error to delete the client: ${errorData}`, 'error');
            }
        } catch (error) {
            console.error('Error to delete the client:', error);
            Swal.fire('Error', 'connection error', 'error');
        }
    }
}

// Mostrar formulario para crear client
async function mostrarFormularioCrear() {
    const { value: formValues } = await Swal.fire({
        title: 'Create New client',
        html: `
            <input id="swal-name" class="swal2-input" placeholder="Name">
            <input id="swal-document" class="swal2-input" type="email" placeholder="document">
            <input id="swal-address" class="swal2-input" placeholder="address">
        `,
        focusConfirm: false,
        preConfirm: () => {
            const name = document.getElementById('swal-name').value;
            const documentt = document.getElementById('swal-document').value;
            const address = document.getElementById('swal-address').value;

            if (!name || !documentt || !address) {
                Swal.showValidationMessage('all the fields are required');
                return false;
            }

            return {
                name: name,
                document: documentt,
                address: address
            };
        }
    });

    if (formValues) {
        await crearclient(formValues);
    }
}

// Editar client con SweetAlert
async function editarclient(id) {
    try {
        // Buscar el client en el array local
        const client = clients.find(c => c.id == id);

        if (!client) {
            Swal.fire('Error', 'client no encontrado', 'error');
            return;
        }

        const { value: formValues } = await Swal.fire({
            title: 'update client',
            html: `
                <input id="swal-name" class="swal2-input" placeholder="name del client" value="${client.name}">
                <input id="swal-documentt" class="swal2-input" type="email" placeholder="documentt electrónico" value="${client.document}">
                <input id="swal-address" class="swal2-input" placeholder="Teléfono" value="${client.address}">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('swal-name').value;
                const documentt = document.getElementById('swal-documentt').value;
                const address = document.getElementById('swal-address').value;

                if (!name || !documentt || !address) {
                    Swal.showValidationMessage('all the field are required');
                    return false;
                }

                return {
                    name: name,
                    document: documentt,
                    address: address
                };
            }
        });

        if (formValues) {
            await actualizarclient(id, formValues);
        }
    } catch (error) {
        console.error('Error to edit the client:', error);
        Swal.fire('Error', 'error to edit the client', 'error');
    }
}

// Hacer funciones disponibles globalmente
window.crearclient = crearclient;
window.actualizarclient = actualizarclient;
window.eliminarclient = eliminarclient;
window.editarclient = editarclient;
window.mostrarFormularioCrear = mostrarFormularioCrear;