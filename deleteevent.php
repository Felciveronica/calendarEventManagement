<?php
// Connect to the database (replace with your database credentials)
$servername = "localhost";
$username = "Felci";
$password = "felcif";
$dbname = "calander";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Check if event ID is provided
if (isset($_POST['event_id'])) {
  // Sanitize input to prevent SQL injection
  $eventId = mysqli_real_escape_string($conn, $_POST['event_id']);

  // SQL query to delete event from the database
  $sql = "DELETE FROM events WHERE eventid = '$eventId'";
  if ($conn->query($sql) === TRUE) {
    echo "Event deleted successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
} else {
  echo "Event ID not provided";
}

// Close database connection
$conn->close();
?>
