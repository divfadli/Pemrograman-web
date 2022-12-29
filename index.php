<?php
require 'functions.php';
$result = query("SELECT * FROM karyawan");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link rel="stylesheet" href="style/style.css">
    <title>Halaman Admin</title>
</head>

<body>
    <div class="header">
        <h1>Daftar Karyawan</h1>
    </div>

    <div class="tambah_data">
        <a href="tambah.php" class="btn btn-primary option">Tambah Data</a>
    </div>

    <table class="table table-bordered">
        <thead class="thead-dark">
            <tr>
                <th scope="col">#</td>
                <th scope="col">Name</td>
                <th scope="col">Email</td>
                <th scope="col">Address</td>
                <th scope="col">Gender</td>
                <th scope="col">Position</td>
                <th scope="col">Status</td>
                <th scope="col">Action</td>
            </tr>
        </thead>
        <tbody>
            <!-- print data from result -->
            <?php $i = 1;
            foreach ($result as $row) : ?>
                <tr>
                    <td><?= $i; ?></td>
                    <td><?= $row["name"]; ?></td>
                    <td><?= $row["email"]; ?></td>
                    <td><?= $row["address"]; ?></td>
                    <td><?= $row["gender"]; ?></td>
                    <td><?= $row["position"]; ?></td>
                    <td><?= $row["status"]; ?></td>
                    <td>
                        <a href="update.php?id=<?= $row["id"]; ?>"" class=" btn btn-primary option">Update</a>
                        <a href="hapus.php?id=<?= $row["id"]; ?>"" class=" btn btn-danger option">Delete</a>
                    </td>
                    <?php $i++; ?>
                </tr>
            <?php endforeach; ?>
        </tbody>
</body>

</html>