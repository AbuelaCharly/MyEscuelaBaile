function addTeacherToList() {

    var newTeacher = new teacherViewModel({

        name: $('#name').val(),
        surname: $('#surname').val(),
        phone: $('#phone').val(),
        email: $('#email').val(),
        creationDate: 

    });


    $('#name').val('');
    $('#surname').val('');


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
