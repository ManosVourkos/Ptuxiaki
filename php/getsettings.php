<?php
session_start();
require_once("connection.php");
if (($_SERVER["REQUEST_METHOD"] == "POST")) {
  $query = "SELECT * FROM settings";
  $final = array();
  if ($result = $conn->query($query)) {
    $month = date("m");
    $row = $result->fetch_array(MYSQLI_ASSOC);
    foreach ($row as $key => $value) {
      if(($key != "MinDiploma") && ($key != "MaxDiploma")) {
        if ($value != "false") {
          if ($key == "DefaultWinterSemesterStart") {
            if ($month >=9) {
              $row[$key] = (date("Y"))."-".$row[$key];
              $year = date("Y");
            }
            else {
              $row[$key] = (date("Y")-1)."-".$row[$key];
              $year = date("Y")-1;
            }
          }
          else if ($key == "WinterSemesterStart") {
            if ($month >=9) {
              $row[$key] = (date("Y"))."-".$row[$key];
              $year = date("Y");
            }
            else {
              $row[$key] = (date("Y")-1)."-".$row[$key];
              $year = date("Y")-1;
            }
          }
          else {
            if ($month >=9) {
              $row[$key] = (date("Y")+1)."-".$row[$key];
              $year = date("Y")+1;
            }
            else {
              $row[$key] = (date("Y"))."-".$row[$key];
              $year = date("Y");
            }
          }
        }
      }
    }
    $final = array_merge($final, $row);
    $result->close();
    $query = "SELECT * FROM different_max_teacher";
    if ($result = $conn->query($query)) {
      if ($row_cnt = $result->num_rows != 0 ) {
        $count = 0;
        while ($rowteacher = $result->fetch_array(MYSQLI_ASSOC)) {
          $id = $rowteacher["teacher_id"];
          $query = "SELECT Name, Surname FROM teacher WHERE id = $id";
          if ($resultt = $conn->query($query)) {
            $rowteachern = $resultt->fetch_array(MYSQLI_ASSOC);
            $temp[$count] = array("name" => "$rowteachern[Surname] $rowteachern[Name]", "max" => $rowteacher["max"]);
            $count++;
          }
          else {
            echo "false";
          }
        }
        if ($count != 0) {
          $teacher = array("teacher" => $temp);
          $final = array_merge($final, $teacher);
        }
      }
      else {
        $teacher = array("teacher" => "false");
        $final = array_merge($final, $teacher);
      }
    }
    $query = "SELECT Name, Surname, Type FROM admin, teacher WHERE admin.id = teacher.id";
    if ($result = $conn->query($query)) {
      $row = $result->fetch_all(MYSQLI_ASSOC);
      $admin = array("admin" => $row);
      $final = array_merge($final, $admin);
    }
    $date["year"] = $year;
    $final = array_merge($final, $date);
    echo json_encode($final);
  }
  else {
    echo "false";
  }
}
$conn->close();
?>
