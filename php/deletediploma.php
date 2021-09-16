<?php
session_start();
require_once("connection.php");
if (($_SERVER["REQUEST_METHOD"] == "POST")  && (isset($_POST["title"]))) {
  $title = $conn->real_escape_string($_POST["title"]);
  $query = "SELECT id FROM project WHERE Title = '$title'";
  if ($result = $conn->query($query)) {
    $row = $result->fetch_array(MYSQLI_ASSOC);
    $result->close();
    $id = $row["id"];
    $query = "DELETE FROM create_project WHERE project_id = '$id'";
    if ($conn->query($query) === FALSE) {
      echo "false";
    }
    $query = "DELETE FROM project_tag WHERE project_id = '$id'";
    if ($conn->query($query) === FALSE) {
      echo "false";
    }
    $query = "DELETE FROM project WHERE id = '$id'";
    if ($conn->query($query) === FALSE) {
      echo "false";
    }
    echo "true";
  }
  else {
    echo "false";
  }
}
$conn->close();
?>
