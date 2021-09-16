<?php
session_start();
require_once("connection.php");
$query = "SELECT WinterSemesterStart,WinterSemesterEnd,DefaultWinterSemesterStart,DefaultWinterSemesterEnd,SpringSemesterStart,SpringSemesterEnd,DefaultSpringSemesterStart,DefaultSpringSemesterEnd FROM settings WHERE 1";
$limiter = 4; // Vazei to orio twn ptuxiakwn sto erwthma ths SQL
$date = "";
$load = "";
if(isset($_POST["lastid"])) {
  $lastid = $_POST["lastid"];
  $load = "AND project.id < $lastid";
}
if ($result = $conn->query($query)) {
  $row = $result->fetch_array(MYSQLI_ASSOC);
  $month = date("M");
  if ($month >= 9) {
    $year = date("Y") + 1;
  }
  else {
    $year = date("Y");
  }
  foreach ($row as $key => $value) {
    if(($key != "MinDiploma") && ($key != "MaxDiploma")) {
      if ($value != "false") {
        if ($key == "DefaultWinterSemesterStart") {
          $row[$key] = $year."-".$row[$key];
        }
        else if ($key == "WinterSemesterStart") {
          $row[$key] = $year."-".$row[$key];
        }
        else {
          $row[$key] = $year."-".$row[$key];
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
  if ($row["WinterSemesterStart"] == "false") {
    $dWinterE = date_create($row["DefaultWinterSemesterEnd"]);
  }
  else {
    $dWinterE = date_create($row["WinterSemesterEnd"]);
  }
  if ($current_date >= $dWinter && $current_date <= $dWinterE) {
    if (isset($_POST["old"])) {
      $pdate = date_format($dWinter, 'Y-m-d');
      $date = "AND DateCreated < '$pdate'  AND project.id NOT IN (SELECT DISTINCT id FROM project, create_project, take_project WHERE (project.id = take_project.project_id AND take_project.project_id = create_project.project_id AND DateCompleted = \"0000-00-00\") ORDER BY project.id DESC)";
    }
    else {
      $pdate = date_format($dWinter, 'Y-m-d');
      if(isset($_POST["category"])) {
          if($_POST["category"] == "professor") {
            $name = preg_split('/\s+/', $_POST["name"]);
            $date = "AND DateCreated > '$dSpring' OR (project.id = take_project.project_id AND take_project.project_id = create_project.project_id AND DateCompleted = \"0000-00-00\" AND create_project.teacher_id = teacher.id  AND '$name[0]' = teacher.Name AND '$name[1]' = teacher.Surname $load)";
          }
          else {
            $name = $_POST["name"];
            $date = "AND DateCreated > '$dSpring' OR (project.id = take_project.project_id AND take_project.project_id = create_project.project_id AND DateCompleted = \"0000-00-00\" AND '$name' = tags.Name AND tags.id = project_tag.tag_id AND project_tag.project_id = project.id $load)";
          }
      }
      else {
        $date = "AND DateCreated > '$dSpring' OR (project.id = take_project.project_id AND take_project.project_id = create_project.project_id AND DateCompleted = \"0000-00-00\" $load)";
      }
    }
  }
  else {
    if ($row["SpringSemesterStart"] == "false") {
      $dSpring = $row["DefaultSpringSemesterStart"];
    }
    else {
      $dSpring = $row["SpringSemesterStart"];
    }
    if (isset($_POST["old"])) {
      $date = "AND DateCreated < '$dSpring' AND project.id NOT IN (SELECT DISTINCT id FROM project, create_project, take_project WHERE (project.id = take_project.project_id AND take_project.project_id = create_project.project_id AND DateCompleted = \"0000-00-00\") ORDER BY project.id DESC)";
    }
    else {
      if(isset($_POST["category"])) {
          if($_POST["category"] == "professor") {
            $name = preg_split('/\s+/', $conn->real_escape_string(trim($_POST["name"])));
            $date = "AND DateCreated > '$dSpring' OR (project.id = take_project.project_id AND take_project.project_id = create_project.project_id AND DateCompleted = \"0000-00-00\" AND create_project.teacher_id = teacher.id AND '$name[0]' = teacher.Name AND '$name[1]' = teacher.Surname $load)";
          }
          else {
            $name = $conn->real_escape_string(trim($_POST["name"]));
            $date = "AND DateCreated > '$dSpring' OR (project.id = take_project.project_id AND take_project.project_id = create_project.project_id AND DateCompleted = \"0000-00-00\" AND '$name' = tags.Name AND tags.id = project_tag.tag_id AND project_tag.project_id = project.id $load)";
        }
      }
      else {
        $date = "AND DateCreated > '$dSpring' OR (project.id = take_project.project_id AND take_project.project_id = create_project.project_id AND DateCompleted = \"0000-00-00\" $load)";
      }
    }
  }
}
else {
  echo "false";
}
if(isset($_POST["category"])) {
  if($_POST["category"] == "professor") {
    $name = preg_split('/\s+/', $conn->real_escape_string(trim($_POST["name"])));
    if (isset($_POST["old"])) {
      $query = "SELECT DISTINCT project.id, Title, StudentsCount, Required, Description, Deliverable, DateCreated,Cosupervisor, create_project.DateCompleted FROM project, create_project,teacher,take_project WHERE '$name[0]' = teacher.Name AND '$name[1]' = teacher.Surname AND teacher.id = create_project.teacher_id AND create_project.project_id = project.id $load $date ORDER BY project.id DESC LIMIT $limiter";
    }
    else{
      $query = "SELECT DISTINCT project.id, project.Title, project.StudentsCount, project.Required, project.Description, project.Deliverable, project.DateCreated,project.Cosupervisor, create_project.DateCompleted FROM project,create_project,teacher,take_project WHERE '$name[0]' = teacher.Name AND '$name[1]' = teacher.Surname AND teacher.id = create_project.teacher_id AND create_project.project_id = project.id $load $date ORDER BY project.id DESC LIMIT $limiter";
    }
  }
  else {
    $name = $conn->real_escape_string(trim($_POST["name"]));
    if (isset($_POST["old"])) {
      $query = "SELECT DISTINCT project.id, project.Title, project.StudentsCount, project.Required, project.Description, project.Deliverable, project.DateCreated,project.Cosupervisor, create_project.DateCompleted FROM project,project_tag,tags,create_project,teacher,take_project WHERE '$name' = tags.Name AND tags.id = project_tag.tag_id AND project_tag.project_id = project.id AND create_project.project_id = project.id $load $date ORDER BY project.id DESC LIMIT $limiter";
    }
    else{
      $query = "SELECT DISTINCT project.id, project.Title, project.StudentsCount, project.Required, project.Description, project.Deliverable, project.DateCreated,project.Cosupervisor, create_project.DateCompleted FROM project,project_tag,tags, create_project,take_project WHERE '$name' = tags.Name AND tags.id = project_tag.tag_id AND project_tag.project_id = project.id  AND create_project.project_id = project.id $load $date ORDER BY project.id DESC LIMIT $limiter";
    }
  }
}
else {
  if (isset($_POST["old"])) {
    $query = "SELECT DISTINCT id, Title, StudentsCount, Required, Description, Deliverable, DateCreated,Cosupervisor, create_project.DateCompleted FROM project, create_project,take_project WHERE create_project.project_id = id $load $date ORDER BY project.id DESC LIMIT $limiter";
  }
  else {
    $query = "SELECT DISTINCT id, Title, StudentsCount, Required, Description, Deliverable, DateCreated,Cosupervisor, create_project.DateCompleted FROM project, create_project,take_project WHERE create_project.project_id = id $load $date ORDER BY project.id DESC LIMIT $limiter";
  }
}
$final = array();
if ($result = $conn->query($query)) {
  while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
    $projectid = $row['id'];
    if ($row["DateCompleted"] == "0000-00-00") {
      $row["DateCompleted"] = "";
    }
    $query = "SELECT teacher.Name, teacher.Surname FROM project, create_project, teacher WHERE '$projectid'= create_project.project_id AND create_project.teacher_id = teacher.id";
    if ($result_teacher = $conn->query($query)) {
      $row_teacher = $result_teacher->fetch_array(MYSQLI_ASSOC);
    }
    $query = "SELECT tags.Name as Tags FROM project_tag, tags WHERE '$projectid'= project_tag.project_id AND project_tag.tag_id = tags.id";
    $tags = array();
    $firsttag = true;
    if ($result_tag = $conn->query($query)) {
      while ($tagrow = $result_tag->fetch_array(MYSQLI_ASSOC)) {
        if ($firsttag == true) {
          $tags['Tags'] = $tagrow['Tags'];
          $firsttag = false;
        }
        else {
          $tags['Tags'] .= ",".$tagrow['Tags'];
        }
      }
    }
    $result_tag->close();
    $interest = array();
    $hasinterest = array();
    $flag_interset = false;
    if ($_SESSION['category'] == "professor") {
      $name = preg_split('/\s+/', $_SESSION["user"]);
      if($row_teacher['Name'] == $name[0] && $row_teacher['Surname'] == $name[1]) {
          $query = "SELECT * FROM interest_project WHERE '$projectid'= project_id AND Status = 2";
          if ($result_row = $conn->query($query)) {
            if ($row_cnt = $result_row->num_rows != 0 ) {
              $hasinterestrow = $result_row->fetch_array(MYSQLI_ASSOC);
              $hasinterest['Has_Interest'] = "true";
              $hasinterest['Status'] = $hasinterestrow['Status'];
            }
            else {
              $hasinterest['Has_Interest'] = "false";
            }
            $flag_interset = true;
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
          $query = "SELECT * FROM interest_project WHERE student_id = '$studentid' AND project_id = '$projectid'";
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
    $query = "SELECT * FROM take_project WHERE project_id = $projectid";
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
    $result1 = array_merge($row, $row_teacher);
    $result1 = array_merge($result1, $taken);
    $result1 = array_merge($result1, $tags);
    if (isset($_SESSION['Am'])) {
      $result1 = array_merge($result1, $interest);
    }
    if ($flag_interset == true) {
      $result1 = array_merge($result1, $hasinterest);
    }
    $final[] = $result1;
  }
  echo json_encode($final);
  $conn->close();
}
?>
