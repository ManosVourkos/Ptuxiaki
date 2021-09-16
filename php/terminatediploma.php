<?php
session_start();
require_once("connection.php");
if (($_SERVER["REQUEST_METHOD"] == "POST")  && (isset($_POST["am"])) && (isset($_POST["title"]))) {
  $title = $conn->real_escape_string($_POST["title"]);
  $prestudents = $conn->real_escape_string($_POST["am"]);
  if ($prestudents != "") {
    $students = explode(",", $prestudents);
  }
  $query = "SELECT id FROM project Where Title='$title'";
  if ($result = $conn->query($query)) {
    $row = $result->fetch_array(MYSQLI_ASSOC);
    $projectid = $row["id"];
    $name = preg_split('/\s+/', $_SESSION["user"]);
    $query = "SELECT id FROM teacher WHERE Name = '$name[0]' AND Surname = '$name[1]'";
    $result->close();
    if ($result = $conn->query($query)) {
      $row = $result->fetch_array(MYSQLI_ASSOC);
      $teacherid = $row["id"];
      $query = "DELETE FROM interest_project WHERE project_id = '$projectid'";
      if ($conn->query($query)) {
        $query = "DELETE FROM take_project WHERE project_id = '$projectid'";
        if ($conn->query($query)) {
          echo "true";
        }
        else {
          echo "false";
        }
      }
      else {
        echo "false";
      }
    }
    else {
      echo "false";
    }
  }
  else {
    echo "false";
  }
}
?>
