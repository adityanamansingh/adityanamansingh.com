<?php
// Start the session
session_start();

// Admin authentication
if (!isset($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true) {
    // Check if login form is submitted
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';

        // Hardcoded credentials
        if ($username === 'admin_layali' && $password === 'admin@121212') {
            $_SESSION['authenticated'] = true;
        } else {
            $error_message = 'Invalid credentials';
        }
    }
}

// If authenticated, show the leads page
if (isset($_SESSION['authenticated']) && $_SESSION['authenticated'] === true) {
    // Database connection
    $host = 'localhost';
    $db = 'layali-contact';
    $user = 'layali-contact';
    $pass = 'layali-contact';

    $conn = new mysqli($host, $user, $pass, $db);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Fetch leads from both tables
    $contacts_result = $conn->query("SELECT id, first_name, last_name, email, phone, message, date FROM contacts");
    $subscribers_result = $conn->query("SELECT id, email, date_subscribed FROM subscribers");

    // HTML structure for the leads page
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Layali Admin Leads</title>
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
        <!-- DataTables CSS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/datatables.net-bs5@1.11.5/css/dataTables.bootstrap5.min.css">
        <style>
            body {
                background-color: #f8f9fa;
            }
            .container {
                max-width: 1200px;
                margin-top: 30px;
            }
            .table th, .table td {
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2 class="text-center mb-4">Admin Dashboard - Leads</h2>

            <h4>Contact Form Leads</h4>
            <table id="contactLeads" class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Message</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($row = $contacts_result->fetch_assoc()) { ?>
                        <tr>
                            <td><?php echo $row['id']; ?></td>
                            <td><?php echo $row['first_name']; ?></td>
                            <td><?php echo $row['last_name']; ?></td>
                            <td><?php echo $row['email']; ?></td>
                            <td><?php echo $row['phone']; ?></td>
                            <td><?php echo $row['message']; ?></td>
                            <td><?php echo $row['date']; ?></td>
                        </tr>
                    <?php } ?>
                </tbody>
            </table>

            <h4 class="mt-4">Subscribers</h4>
            <table id="subscriberLeads" class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Date Subscribed</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($row = $subscribers_result->fetch_assoc()) { ?>
                        <tr>
                            <td><?php echo $row['id']; ?></td>
                            <td><?php echo $row['email']; ?></td>
                            <td><?php echo $row['date_subscribed']; ?></td>
                        </tr>
                    <?php } ?>
                </tbody>
            </table>

            <div class="text-center mt-4">
                <a href="logout.php" class="btn btn-danger">Logout</a>
            </div>
        </div>

        <!-- Bootstrap JS and dependencies -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
        <!-- jQuery -->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <!-- DataTables JS -->
        <script src="https://cdn.jsdelivr.net/npm/datatables.net@1.11.5/js/jquery.dataTables.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/datatables.net-bs5@1.11.5/js/dataTables.bootstrap5.min.js"></script>
        
        <script>
            $(document).ready(function() {
                $('#contactLeads').DataTable();
                $('#subscriberLeads').DataTable();
            });
        </script>
    </body>
    </html>
    <?php
    $conn->close();
} else {
    // If not authenticated, show login page
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Login - Layali</title>
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body style="background-color: #f8f9fa;">
        <div class="container" style="max-width: 400px; margin-top: 100px;">
            <h2 class="text-center mb-4">Admin Login</h2>

            <?php if (isset($error_message)) { ?>
                <div class="alert alert-danger"><?php echo $error_message; ?></div>
            <?php } ?>

            <form method="POST">
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" name="username" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" required>
                </div>
                <button type="submit" class="btn btn-primary w-100">Login</button>
            </form>
        </div>

        <!-- Bootstrap JS -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    <?php
}
?>
