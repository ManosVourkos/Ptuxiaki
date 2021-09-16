<?php
session_start();
require_once("connection.php");
if (($_SERVER["REQUEST_METHOD"] == "POST")) {
  $final = array();
  $query = "SELECT * FROM settings";
  if ($resultmonth = $conn->query($query)) {
    $rowmonth = $resultmonth->fetch_array(MYSQLI_ASSOC);
    if ($rowmonth["WinterSemesterStart"] == "false") {
      $wsmonth = substr($rowmonth["DefaultWinterSemesterStart"],0,2);
    }
    else {
      $wsmonth = substr($rowmonth["WinterSemesterStart"],0,2);
    }
    if ($rowmonth["WinterSemesterEnd"] == "false") {
      $wemonth = substr($rowmonth["DefaultWinterSemesterEnd"],0,2);
    }
    else {
      $wemonth = substr($rowmonth["WinterSemesterEnd"],0,2);
    }
  }
  else {
    echo "false";
  }
  $query = "SELECT COUNT(*) AS MaxProjects FROM project WHERE 1";
  if ($resultmax = $conn->query($query)) {
    $rowmax = $resultmax->fetch_array(MYSQLI_ASSOC);
    $maxprojects = $rowmax["MaxProjects"];
    $query = "SELECT * FROM teacher WHERE 1 ORDER BY Surname ASC";
    if ($result = $conn->query($query)) {
      while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        $tmp = array();
        $tmp = $row;
        $teacherid = $row["id"];
        $query = "SELECT AVG(DATEDIFF(DateCompleted,DateTaken)) AS Avg FROM create_project, project, take_project WHERE create_project.project_id = id AND teacher_id = $teacherid AND take_project.project_id = id AND DateCompleted != 0000-00-00";
        if ($resultavg = $conn->query($query)) {
          $rowavg = $resultavg->fetch_array(MYSQLI_ASSOC);
          if ($rowavg["Avg"] == null) {
            $rowavg["Avg"] = "0";
          }
          $tmp = array_merge($tmp, $rowavg);
          $query = "SELECT COUNT(id) AS Alls,COUNT(IF(MONTH(DateCreated)< $wemonth || MONTH(DateCreated)> $wsmonth, 1, NULL)) AS Winter ,COUNT(IF(MONTH(DateCreated)>= $wemonth && MONTH(DateCreated)<= $wsmonth, 1, NULL)) AS Spring  FROM project, create_project  WHERE project_id = id AND teacher_id = $teacherid";
          if ($resultcnt = $conn->query($query)) {
            $rowcnt = $resultcnt->fetch_array(MYSQLI_ASSOC);
            $tmp = array_merge($tmp, $rowcnt);
            $query = "SELECT COUNT(*) AS Completed FROM create_project WHERE DateCompleted != '0000-00-00' AND teacher_id = $teacherid";
            if ($resultcomp = $conn->query($query)) {
              $rowcomp = $resultcomp->fetch_array(MYSQLI_ASSOC);
              $tmp = array_merge($tmp, $rowcomp);
              $query = "SELECT COUNT(*) As AllStudents, COUNT(IF(Team = -1, 1, NULL)) AS Solo,COUNT(IF(Team <> -1, 1, NULL)) AS Team FROM create_project,take_project WHERE teacher_id = $teacherid AND create_project.project_id = take_project.project_id";
              if ($resultcntstu = $conn->query($query)) {
                $rowcntstu = $resultcntstu->fetch_array(MYSQLI_ASSOC);
                $tmp = array_merge($tmp, $rowcntstu);
                $query = "SELECT COUNT(*) As AllCategories FROM create_tag WHERE teacher_id = $teacherid";
                if ($resultallcat = $conn->query($query)) {
                  $rowallcat = $resultallcat->fetch_array(MYSQLI_ASSOC);
                  $tmp = array_merge($tmp, $rowallcat);
                  $query = "SELECT DISTINCT project_tag.tag_id FROM create_tag, project_tag WHERE teacher_id = $teacherid AND create_tag.tag_id = project_tag.tag_id";
                  if ($resultusedcat = $conn->query($query)) {
                    $count_category=0;
                    while ($rowusedcat = $resultusedcat->fetch_array(MYSQLI_ASSOC)){
                      $count_category++;
                    }

                    $tmp = array_merge($tmp, array('UsedCategories' => $count_category));
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
          else {
            echo "false";
          }
        }
        else {
          echo "false";
        }
        $final[] = $tmp;
      }
      echo json_encode($final);
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
