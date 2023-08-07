async function errorHandlingApi(answer) {
    let errorMessage = '';

    if (answer.status === 300) {
        errorMessage = await answer.text();
    } else if (answer.status === 404) {
        errorMessage = "Resource Not Found";

    } else if (answer.status === 400) {
        errorMessage = "Resource Not Found";
    }else {
        errorMessage = "Unexpected Error";
    }


    showErrorMessage(errorMessage);
}


function showErrorMessage(errorMessage) {
    Swal.fire({
        icon: 'error',
        
        text: errorMessage
        
    });
    
}



function confirmAction({ callbackAccept, callbackCancel, title }) {
    Swal.fire({
        title: title || '¿Realmente deseas hacer esto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        focusConfirm: true
    }).then((result) => {
        if (result.isConfirmed) {
            callbackAccept();
        } else if (callbackCancel) {
            callbackCancel();
        }
    })
}


/*

function descargarArchivo(url, nombre) {
    var link = document.createElement('a');
    link.download = nombre;
    link.target = "_blank";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

*/