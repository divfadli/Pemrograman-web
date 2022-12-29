<?php
require "functions.php";

$id = $_GET['id'];
$result = query("SELECT * FROM karyawan WHERE id = $id");

if (isset($_POST['submit'])) {
    if (isset($_POST['submit'])) {
        if (update($_POST, $id) > 0) {
            echo "
                <script>
                    alert('Data Berhasil Diupdate');
                    document.location.href = 'index.php';
                </script>
            ";
        } else {
            echo "
                <script>
                    alert('Data Gagal Diupdate');
                    document.location.href = 'index.php';
                </script>   
            ";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link rel="stylesheet" href="style/style.css">
    <title>Update Data Karyawan</title>
</head>

<body>
    <div class="header">
        <h1>Update Data Karyawan</h1>
    </div>

    <form action="" method="POST">
        <label for="name">Name</label> <br>
        <input class="form-control" type="text" name="name" id="name">
        <br>

        <label for="email">Email</label> <br>
        <input class="form-control" type="text" name="email" id="email">
        <br>

        <label for="address">Address</label> <br>
        <input class="form-control" type="text" name="address" id="address">
        <br>

        <label for="gender">Gender</label> <br>
        <select class="form-control form-control-sm" name="gender" id="gender">
            <option selected hidden value="">Pilih Gender</option>
            <option value="male">Male
            <option value="female">Female
        </select></td>
        <br>

        <label for="position">Position</label> <br>
        <input class="form-control" type="text" name="position" id="position">
        <br>

        <label for="status">Status</label> <br>
        <select class="form-control form-control-sm" name="status" id="status">
            <option selected hidden value="">Pilih Status</option>
            <option value="fulltime">Fulltime
            <option value="parttime">Parttime
        </select></td>
        <br><br>

        <button type="submit" name="submit" class="btn btn-success">Update Data</button>
    </form>
</body>

</html>