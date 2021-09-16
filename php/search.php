<?php
session_start();
require_once("connection.php");
$final = array();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $search_term = "";
  $query = "";
  $tmp = array();
  if(isset($_POST["search"])){
    $search_term = trim($_POST["search"]);
    if (count(explode(' ', $search_term)) > 1) {
      $search_term_array = explode(' ', $search_term);
      $query = "SELECT Name, Surname FROM teacher WHERE Name LIKE _utf8'$search_term_array[0]%' COLLATE utf8_general_ci AND (Surname LIKE _utf8'$search_term_array[1]%' COLLATE utf8_general_ci OR Surname LIKE _utf8'$search_term_array[0]%' COLLATE utf8_general_ci) ORDER BY CHARACTER_LENGTH(Surname) - CHARACTER_LENGTH('$search_term_array[1]') LIMIT 5";
    }
    else {
      $query = "SELECT Name, Surname FROM teacher WHERE Name LIKE _utf8'$search_term%' COLLATE utf8_general_ci OR Surname LIKE _utf8'$search_term%' COLLATE utf8_general_ci ORDER BY CHARACTER_LENGTH(Surname) - CHARACTER_LENGTH('$search_term') LIMIT 5";
    }
  }
  else if(isset($_POST["search-landing"])){
    $search_term = trim($_POST["search-landing"]);
    if (count(explode(' ', $search_term)) > 1) {
      $search_term_array = explode(' ', $search_term);
      $query = "SELECT Name, Surname FROM teacher WHERE Name LIKE _utf8'$search_term_array[0]%' COLLATE utf8_general_ci AND (Surname LIKE _utf8'$search_term_array[1]%' COLLATE utf8_general_ci OR Surname LIKE _utf8'$search_term_array[0]%' COLLATE utf8_general_ci) ORDER BY CHARACTER_LENGTH(Surname) - CHARACTER_LENGTH('$search_term_array[1]') LIMIT 5";
    }
    else {
      $query = "SELECT Name, Surname FROM teacher WHERE Name LIKE _utf8'$search_term%' COLLATE utf8_general_ci OR Surname LIKE _utf8'$search_term%' COLLATE utf8_general_ci ORDER BY CHARACTER_LENGTH(Surname) - CHARACTER_LENGTH('$search_term') LIMIT 5";
    }
  }
  else if (isset($_POST["search-students"])) {
    $search_term = trim($_POST["search-students"]);
    $ams = $_SESSION['Am'];
    $query = "SELECT Am FROM student WHERE Am LIKE _utf8'$search_term%' COLLATE utf8_general_ci AND Am != '$ams' ORDER BY Am LIMIT 5";
  }
  else if (isset($_POST["search-students-byteacher"])) {
    $search_term = trim($_POST["search-students-byteacher"]);
    $query = "SELECT Am FROM student WHERE Am LIKE _utf8'$search_term%' COLLATE utf8_general_ci ORDER BY Am LIMIT 5";
  }
  else{
    $search_term = trim($_POST["search-tags"]);
    $query = "SELECT Name FROM tags WHERE Name LIKE _utf8'$search_term%' COLLATE utf8_general_ci ORDER BY CHARACTER_LENGTH(Name) - CHARACTER_LENGTH('$search_term') LIMIT 5";
  }
  if ($result = $conn->query($query)) {
    if ($row_cnt = $result->num_rows > 0 ) {
      while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        if(isset($_POST["search-students"]) || isset($_POST["search-students-byteacher"])){
          $am = $row["Am"];
          if (isset($_POST["pid"])){
            $pid = $_POST["pid"];
            $query = "SELECT * FROM student, interest_project WHERE $am = student.Am AND student.id = student_id AND project_id = $pid AND Status != 2 LIMIT 5";
          }
          else {
            $query = "SELECT * FROM student, interest_project WHERE $am = student.Am AND student.id = student_id AND (Status = 1 AND Status = 4 AND Status = 5 AND Status = 6) LIMIT 5";
          }
          $takequery = "SELECT * FROM student, take_project WHERE $am = student.Am AND student.id = student_id LIMIT 5";
          if ($resulttake = $conn->query($takequery)){
            if ($row_cnttake = $resulttake->num_rows == 0 ) {
              if ($resultstu = $conn->query($query)) {
                if ($row_cntstu = $resultstu->num_rows == 0 ) {
                    $term['term'] = $search_term;
                    $result1 = array_merge($row, $term);
                    $tmp = $result1;
                    $final[] = $result1;
                }
              }
              else {
                echo "false";
              }
            }
          }
          else {
            echo "false";
          }
        }
        else {
          if(isset($_POST["search"])){
            $name = preg_split('/\s+/', $_SESSION["user"]);
            if($row["Name"] == $name[0] && $row["Surname"] == $name[1]) {
              continue;
            }
          }
          $term['term'] = $search_term;
          $result1 = array_merge($row, $term);
          $tmp = $result1;
          $final[] = $result1;
        }
      }
    }
    $result->close();
    if(isset($_POST["search-landing"])){
      $query = "SELECT Name FROM tags WHERE Name LIKE _utf8'$search_term%' COLLATE utf8_general_ci ORDER BY CHARACTER_LENGTH(Name) - CHARACTER_LENGTH('$search_term') LIMIT 5";
      if ($result = $conn->query($query)) {
        if ($row_cnt = $result->num_rows > 0 ) {
          while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $term['term'] = $search_term;
            $result1 = array_merge($row, $term);
            $final[] = $result1;
          }
        }
        $result->close();
      }
    }
    echo json_encode($final);
  }
}
$conn->close();
?>
