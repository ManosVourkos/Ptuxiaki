<?php
session_start();
require_once("connection.php");
if (($_SERVER["REQUEST_METHOD"] == "POST")) {
  $query = "SELECT WinterSemesterStart,WinterSemesterEnd,DefaultWinterSemesterStart,DefaultWinterSemesterEnd,SpringSemesterStart,SpringSemesterEnd,DefaultSpringSemesterStart,DefaultSpringSemesterEnd FROM settings WHERE 1";
  if ($result = $conn->query($query)) {
    $row = $result->fetch_array(MYSQLI_ASSOC);
    $month = date("m");
    foreach ($row as $key => $value) {
      if(($key != "MinDiploma") && ($key != "MaxDiploma")) {
        if ($value != "false") {
          if ($key == "DefaultWinterSemesterStart") {
            if ($month >=9) {
              $row[$key] = (date("Y"))."-".$row[$key];
            }
            else {
              $row[$key] = (date("Y")-1)."-".$row[$key];
            }
          }
          else if ($key == "WinterSemesterStart") {
            if ($month >=9) {
              $row[$key] = (date("Y"))."-".$row[$key];
            }
            else {
              $row[$key] = (date("Y")-1)."-".$row[$key];
            }
          }
          else {
            if ($month >=9) {
              $row[$key] = (date("Y")+1)."-".$row[$key];
            }
            else {
              $row[$key] = (date("Y"))."-".$row[$key];
            }
          }
        }
      }
    }
    $current_date = date_create(date("Y-m-d"));
    if ($row["WinterSemesterStart"] == "false") {
      $dWinter = date_create($row["DefaultWinterSemesterStart"]);
    }
    else {
      $dWinter = date_create($row["WinterSemesterStart"]);
    }
    if ($row["WinterSemesterEnd"] == "false") {
      $dWinterE = date_create($row["DefaultWinterSemesterEnd"]);
    }
    else {
      $dWinterE = date_create($row["WinterSemesterEnd"]);
    }
    if ($current_date >= $dWinter && $current_date <= $dWinterE) {
      echo json_encode("0");
    }
    else {
      echo json_encode("1");
    }
    /*$interval = date_diff($current_date, $dWinter);
    if( $interval->invert){
      $diff = -1 * $interval->format('%a');
    }
    else {
      $diff = $interval->format('%a');
    }
    if ($diff < 0) {
      echo json_encode("0");
    }
    else {
      echo json_encode("1");
    }*/
  }
  else {
    echo "false";
  }
}
$conn->close();
?>
