<?php
session_start();
require_once("connection.php");
if (($_SERVER["REQUEST_METHOD"] == "POST") && $_SESSION["category"] == "professor") {
  if($_POST["all"] == "false") {
    $name = preg_split('/\s+/', $_SESSION["user"]);
    $query = "SELECT tags.id, tags.Name FROM teacher, create_tag, tags WHERE '$name[0]' = teacher.Name AND '$name[1]' = teacher.Surname AND teacher.id = create_tag.teacher_id AND create_tag.tag_id = tags.id";
  }
  else {
    $query = "SELECT tags.id, tags.Name, teacher.Name AS Tname, teacher.Surname FROM teacher, create_tag, tags WHERE teacher.id = create_tag.teacher_id AND create_tag.tag_id = tags.id";
  }
  $final = array();
  $temp = array();
  if ($result = $conn->query($query)) {
    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
      $id = $row["id"];
      $query = "SELECT COUNT(*) AS Count FROM project_tag WHERE project_tag.tag_id = $id";
      if ($resultcount = $conn->query($query)) {
        $rowcount = $resultcount->fetch_array(MYSQLI_ASSOC);
        if($_POST["all"] == "false") {
          $temp = array("id" => $id, "Name" => $row["Name"],"Count" => $rowcount['Count']);
        }
        else {
          $temp = array("id" => $id, "Name" => $row["Name"], "Professor" => "$row[Tname] $row[Surname]", "Count" => $rowcount['Count']);
        }
      }
      $final[] = $temp;
    }
    $result->close();
  }
  function cmp($a, $b)  {
    if ($a == $b) {
      return 0;
    }
    return ($a['Count'] > $b['Count']) ? -1 : 1;
  }
  usort($final, "cmp");
  echo json_encode($final);
}
$conn->close();
?>
