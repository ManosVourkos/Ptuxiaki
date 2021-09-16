<?php
session_start();
require_once("connection.php");
if (($_SERVER["REQUEST_METHOD"] == "POST")) {
  $am = $_SESSION["Am"];
  $query = "SELECT id FROM student WHERE '$am'= am";
  if ($result = $conn->query($query)) {
    $row = $result->fetch_array(MYSQLI_ASSOC);
    $result->close();
    $studentid = $row["id"];
    $query = "SELECT * FROM take_project WHERE student_id = '$studentid'";
    if ($result = $conn->query($query)) {
      if ($row_cnt = $result->num_rows != 0 ) {
        $row = $result->fetch_array(MYSQLI_ASSOC);
        $projectid = $row['project_id'];
        $query = "SELECT id FROM project WHERE id = '$projectid'";
        if ($resultproject = $conn->query($query)) {
          $row = $resultproject->fetch_array(MYSQLI_ASSOC);
          $resultproject->close();
          $projectid = $row['id'];
          echo json_encode(array("id" => $projectid));
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
$conn->close();
?>
