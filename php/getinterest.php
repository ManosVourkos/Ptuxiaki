<?php
session_start();
require_once("connection.php");
if (($_SERVER["REQUEST_METHOD"] == "POST")) {
  $name = preg_split('/\s+/', $_SESSION["user"]);
  $query = "SELECT project.id FROM project,create_project,teacher WHERE '$name[0]' = teacher.Name AND '$name[1]' = teacher.Surname AND teacher.id = create_project.teacher_id AND create_project.project_id = project.id";
  $count = 0;
  if ($result = $conn->query($query)) {
    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
      $projectid = $row['id'];
      $query = "SELECT * FROM interest_project WHERE '$projectid'= project_id AND (Status = 1 OR Status = 2 OR Status = 4)";
      if ($result_row = $conn->query($query)) {
        if ($row_cnt = $result_row->num_rows != 0 ) {
          $count++;
        }
      }
    }
  }
  echo json_encode(array('count' => $count));
}
$conn->close();
?>
