<?php
// Connect to your database
$servername = "localhost";
$username = "Felci";
$password = "felcif";
$dbname = "calander";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
// Retrieve data based on ID
$date = $_GET['id'];

$sql = "SELECT * FROM events WHERE DATE(timestart) = '$date'";


$result = $conn->query($sql);



if (!empty($result)) {
  // Loop through each event and create a div for each one
  foreach ($result as $event) {
    $eid=$event['eventid'];
      $eventName = $event['eventname'];
      $eventDetails = $event['description'];
      $datetime =$event['timestart'];

      // Create a div element for each event
      echo "<div class='eventdiv'>";
      echo "<div class='eventtop'><h5>$eventName</h5>";
      echo "<span>$datetime</span> </div>";
      
      
      echo "<p>$eventDetails</p>";
      echo "<div><button  onclick='deleteevent(${eid});'> <i class='fa fa-trash-o' style='font-size:24px;margin-right:10px ;border:none'></i></button>";
      echo "<button class='edit' onclick='edit(${eid});' >Edit</button></div>";
      echo "</div>";
  }
} else {
  // If no events found
  echo "No events found.";
}
$conn->close();

}

elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {

$name = $_POST['name'];
$des = $_POST['description'];
$time1=$_POST['date'];
// Convert the date string to a Unix timestamp
$timestamp = strtotime($time1);

// Format the timestamp in the desired format (YYYY-MM-DD)
$time = date("Y-m-d", $timestamp);

// Insert data into database
$sql = "INSERT INTO events (eventname, description,timestart) VALUES ('$name', '$des','$time')";
if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();

header("Location: https://localhost/ppp.html");
exit;
}



?>
