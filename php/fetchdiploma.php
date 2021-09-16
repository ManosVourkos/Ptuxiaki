<?php
session_start();
require_once("connection.php");
$check = false;
$query = NULL;
$projectid = NULL;
if(isset($_POST['id'])) {
  $check = true;
  $projectid = $_POST['id'];
  $query = "SELECT teacher.id, teacher.Name, teacher.Surname FROM project, create_project, teacher WHERE '$projectid'= create_project.project_id AND create_project.teacher_id = teacher.id";
}
else {
  $email = $_SESSION['email'];
  $query = "SELECT teacher.id, teacher.Name, teacher.Surname FROM teacher where Email='$email'";
}
if ($result = $conn->query($query)) {
  $row = $result->fetch_array(MYSQLI_ASSOC);
  $result->close();
  $name = "";
  if ($check == true) {
    $name = "$row[Name] $row[Surname]";
    $query = "SELECT project.id, project.Title, project.StudentsCount, project.Required, project.Description, project.Deliverable, project.DateCreated, project.Cosupervisor, project.Comments, project.Bibliography, create_project.DateCompleted FROM project, create_project WHERE id='$projectid' AND id=project_id";
  }
  else {
    $id = $row['id'];
    $query = "SELECT project.id, project.Title, project.StudentsCount, project.Required, project.Description, project.Deliverable, project.DateCreated, project.Cosupervisor, project.Comments, project.Bibliography, create_project.DateCompleted FROM create_project, project WHERE create_project.teacher_id = '$id' AND project_id = project.id ORDER BY project.id DESC LIMIT 1";
  }
  $teacher_info = $row;
  if ($result = $conn->query($query)) {
    $row = $result->fetch_array(MYSQLI_ASSOC);
    if ($check == true){
      $id = $projectid;
    }
    else {
      $id = $row['id'];
    }
    $result->close();
    $query = "SELECT tags.Name AS Tags FROM tags,project_tag WHERE project_id = '$id' AND tags.id = tag_id";
    $tags = array();
    $firsttag = true;
    if ($result = $conn->query($query)) {
      while ($tagrow = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($firsttag == true) {
          $tags['Tags'] = $tagrow['Tags'];
          $firsttag = false;
        }
        else {
          $tags['Tags'] .= ",".$tagrow['Tags'];
        }
      }
      $result->close();
      $interest = array();
      $students = array();
      $flag_students = false;
      $team = array();
      $flag_team = false;
      if ($_SESSION['category'] == "professor" || $_SESSION['category'] == "secretariat") {
        $check_name = preg_split('/\s+/', $_SESSION["user"]);
        if(($teacher_info['Name'] == $check_name[0] && $teacher_info['Surname'] == $check_name[1]) || $_SESSION['category'] == "secretariat") {
            $query = "SELECT am, email, name, surname, DateTaken, Team FROM student, take_project WHERE '$id'= project_id AND student_id = student.id";
            if ($result_row = $conn->query($query)) {
              if ($row_cnt = $result_row->num_rows != 0 ) {
                $index = 0;
                $tmp = array();
                while ($studentrow = $result_row->fetch_array(MYSQLI_ASSOC)) {
                  if($studentrow["Team"] == -1) {
                    $students['Students'][$index] = $studentrow;
                    $flag_students = true;
                  }
                  else {
                    $tmp []= $studentrow;
                    $flag_team = true;
                  }
                  $index++;
                }
                if ($flag_team == true) {
                  $team['Team'][0] = $tmp;
                }
              }
              else {
                $query = "SELECT am, email, name, surname, DateInterest FROM student, interest_project WHERE '$id'= project_id AND student_id = student.id AND Status != 0 AND Team = -1 ORDER BY DateInterest DESC";
                $index = 0;
                if ($result_row = $conn->query($query)) {
                  while ($studentrow = $result_row->fetch_array(MYSQLI_ASSOC)) {
                    $students['Students'][$index] = $studentrow;
                    $index++;
                  }
                  $flag_students = true;
                }
                $query = "SELECT am, email, name, surname, DateInterest, Team FROM student, interest_project WHERE '$projectid'= project_id AND student_id = student.id AND Status != 0 AND Team != -1 ORDER BY Team DESC";
                $index = 0;
                $flagfirst = true;
                $teamnum = -1;
                $tmp = array();
                if ($result_row = $conn->query($query)) {
                  if($row_cnt = $result_row->num_rows != 0){
                    while ($teamrow = $result_row->fetch_array(MYSQLI_ASSOC)) {
                      if($flagfirst == true) {
                        $flagfirst = false;
                        $teamnum = intval($teamrow["Team"]);
                        $tmp []= $teamrow;
                        continue;
                      }
                      if($teamnum == intval($teamrow["Team"])) {
                        $tmp []= $teamrow;
                      }
                      else {
                        $team['Team'][$index] = $tmp;
                        $tmp = array();
                        $teamnum = intval($teamrow["Team"]);
                        $index++;
                      }
                    }
                    if ($index == 0) {
                      $team['Team'][$index] = $tmp;
                    }
                    $flag_team = true;
                  }
                }
              }
          }
        }
      }
      if (isset($_SESSION['Am'])) {
        $am = $_SESSION['Am'];
        $query_student = "SELECT * FROM student WHERE Am = '$am'";
        if ($result_student = $conn->query($query_student)) {
          if ($row_cnt = $result_student->num_rows === 1 ) {
            $row_student = $result_student->fetch_array(MYSQLI_ASSOC);
            $studentid = $row_student["id"];
            $query = "SELECT * FROM interest_project WHERE student_id = '$studentid' AND project_id = '$id'";
            if ($result_interest = $conn->query($query)) {
              if ($row_cnt = $result_interest->num_rows === 1 ) {
                $interestrow = $result_interest->fetch_array(MYSQLI_ASSOC);
                $interest['Interest'] = "true";
                $interest['Status'] = $interestrow['Status'];
              }
              else {
                $interest['Interest'] = "false";
              }
            }
          }
          else {
            $interest['Interest'] = "false";
          }
          $result_student->close();
        }
      }
      $taken = array();
      $query = "SELECT * FROM take_project WHERE project_id = $id";
      if($resulttake = $conn->query($query)) {
        if ($row_cnt = $resulttake->num_rows != 0 ) {
          $taken['Taken'] = "true";
        }
        else {
          $taken['Taken'] = "false";
        }
      }
      else {
        echo "false";
      }
      if ($check == true){
        $array1 = array("Professor" => $name);
      }
      else {
        $array1 = array("Professor" => $_SESSION['user']);
      }
      if ($row["DateCompleted"] == "0000-00-00") {
        $row["DateCompleted"] = "";
      }
      $result1 = array_merge($row, $array1);
      $result1 = array_merge($result1, $taken);
      if (isset($_SESSION['Am'])) {
        $result1 = array_merge($result1, $interest);
      }
      if ($flag_students == true) {
        $result1 = array_merge($result1, $students);
      }
      if ($flag_team == true) {
        $result1 = array_merge($result1, $team);
      }
      if ($tags != NULL) {
        $final = array_merge($result1, $tags);
        echo json_encode($final);
    }
    else {
      echo json_encode($result1);
    }
  }
}
}
$conn->close();
?>
