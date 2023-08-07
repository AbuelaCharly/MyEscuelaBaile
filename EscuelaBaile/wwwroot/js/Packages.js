function addPackageToList() {

    var newPackage = new packageViewModel({
       
        packageCode: $('#name').val(),
        price: $('#price').val()
    });


   $('#name').val('');
   $('#price').val('');


   var existPackage = false;

    
   

    if (newPackage.name() == "" || newPackage.price() == "") {

        
        return;

    } else {
       
        if (packageListViewModel.package().length > 0) {

            packageListViewModel.package().forEach(value => {

                if (newPackage.name() == value.name()) {

                    existPackage = true;

                }
            });

            if (existPackage == true) {

                alert("El package ya existe");

                return;


            } else {

                packageListViewModel.package.push(newPackage);

                addPackageDataBase(newPackage);
            }

        } else {

            packageListViewModel.package.push(newPackage);

            addPackageDataBase(newPackage);
        }

    }

    
}


async function addPackageDataBase(newPackage) {

    
  
    const data = getNewPackageBody(newPackage);

    function getNewPackageBody(newPackage) {
        return JSON.stringify({
         
            packageCode: parseInt(newPackage.name()),
            price: parseFloat(newPackage.price())

            
        });


    }

    
    
    const answer = await fetch(urlPackage, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    

    

    if (answer.ok) {
        const json = await answer.json();
        package.id(json.id);
    } else {
        errorHandlingApi(answer);
    }
}


async function getPackages() {

    packageListViewModel.loading(true);

    const answer = await fetch(urlPackage, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!answer.ok) {

        errorHandlingApi(answer);
        return;
    }

    const json = await answer.json();
    packageListViewModel.package([]);

    json.forEach(item => {
        
        item.packageCode = item.packageCode.toString();
        item.price = item.price.toString();
        
        packageListViewModel.package.push(new packageViewModel(item));
    });

    
    packageListViewModel.loading(false);
}


async function getPackage(package) {
   
    const answer = await fetch(`${urlPackage}/${package.name()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!answer.ok) {
        errorHandlingApi(answer);
        return;
    }

    const json = await answer.json();

    editPackageViewModel.id = json.id,
    editPackageViewModel.name(json.packageCode);
    editPackageViewModel.price(json.price);

    modalEditPackageBootstrap.show();
}



 
async function editPreparePackage() {

    console.log(parseInt(editPackageViewModel.name()));
    console.log(editPackageViewModel)
    

    console.log(editPackageViewModel.name());

    const obj = {
        id: editPackageViewModel.id,
        name: parseInt(editPackageViewModel.name()),
        price: parseFloat(editPackageViewModel.price())
  };

    

    if (!obj.name || !obj.price) {
        return;
    }


    await editPackage(obj);

    const index = packageListViewModel.package().findIndex(p => p.id() === obj.id);

 
    const package = packageListViewModel.package()[index];

    package.name(obj.name);
    package.price(obj.price);

   

    
}

async function editPackage(package) {

    const data = JSON.stringify(package);

    const answer = await fetch(`${urlPackage}/${package.id}`, {
        method: 'PUT',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!answer.ok) {
        errorHandlingApi(answer);

        throw "error";
    }

    
}


function prepareDeletePackage(package) {

    modalEditPackageBootstrap.hide();

    confirmAction({
        callbackAccept: () => {

            deletePacakge(package);
            
        },
        callbackCancel: () => {

            modalEditPackageBootstrap.show();
            
        },
        title: `Would you like to delete the package: Lessons: ${package.name()} ?`
    });

}

async function deletePacakge(package) {

    const idPackage = package.id;

    const answer = await fetch(`${urlPackage}/${idPackage}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (answer.ok) {
        const index = getPackageIndex();
        packageListViewModel.package.splice(index, 1);
    }
}

function getPackageIndex() {

    return packageListViewModel.package().findIndex(p => p.id() == editPackageViewModel.id);
}

