<?php
session_start();
require_once("connection.php");
if (($_SERVER["REQUEST_METHOD"] == "POST")  && (isset($_POST["am"])) && (isset($_POST["bind"])) && (isset($_POST["title"]))) {
  $am = $_POST["am"];
  $title = $_POST["title"];
  if ($_POST["bind"] == "true") {
    $status = 1;
  }
  else {
    $status = 0;
  }
  $team = false;
  $pam = explode(",", $am);
  if( count($pam) == 1  ) {
    $am = $pam[0];
  }
  else {
    $am = $pam;
    $team = true;
  }
  if ($team == false) {
    $query = "SELECT id FROM student WHERE am = '$am'";
    if ($result = $conn->query($query)) {
      $row = $result->fetch_array(MYSQLI_ASSOC);
      $studentid = $row["id"];
      $result->close();
      $query = "SELECT id FROM project WHERE Title = '$title'";
      if ($result = $conn->query($query)) {
        $row = $result->fetch_array(MYSQLI_ASSOC);
        $projectid = $row["id"];
        $result->close();
        $query = "UPDATE interest_project SET Status = '$status' WHERE student_id = '$studentid' AND project_id = '$projectid'";
        if ($conn->query($query)) {
          if ($status == 1) {
            $query = "INSERT INTO take_project(student_id, project_id, DateTaken, Team) VALUES ('$studentid','$projectid',CURDATE(), -1)";
            if ($conn->query($query)) {
              $query = "UPDATE interest_project SET Status = 0 WHERE student_id != '$studentid' AND project_id = '$projectid'";
              if ($conn->query($query)) {
                $query = "DELETE FROM interest_project WHERE student_id = '$studentid' AND project_id != '$projectid'";
                if ($conn->query($query)) {
                  if ($conn->query($query)) {
                    $query = "SELECT Count(Team) AS Count, Team FROM interest_project WHERE 1 GROUP BY Team HAVING Count(Team) = 1";
                    if ($resultcount = $conn->query($query)) {
                      if ($row_cnt = $resultcount->num_rows > 0 ) {
                        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                          $team = $row["Team"];
                          $query = "UPDATE interest_project SET Team = -1 WHERE Team = $team";
                          if ($conn->query($query) === FALSE) {
                            echo "false";
                          }
                        }
                        echo "true";
                      }
                      else {
                        echo "true";
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
          }
          else {
            echo "true";
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
    foreach ($am as $key => $value) {
      $query = "SELECT id FROM student WHERE am = '$value'";
      if ($result = $conn->query($query)) {


        $row = $result->fetch_array(MYSQLI_ASSOC);
        $studentid = $row["id"];
        $result->close();
        $query = "SELECT id FROM project WHERE Title = '$title'";
        if ($result = $conn->query($query)) {
          $row = $result->fetch_array(MYSQLI_ASSOC);
          $projectid = $row["id"];
          $result->close();
          $query = "SELECT Team FROM interest_project WHERE student_id = '$studentid' AND project_id = '$projectid'";
          if ($result = $conn->query($query)) {
            $row = $result->fetch_array(MYSQLI_ASSOC);
            $team = $row["Team"];
          }
          else {
            echo "false";
          }
          $query = "UPDATE interest_project SET Status = '$status' WHERE student_id = '$studentid' AND project_id = '$projectid'";
          if ($conn->query($query)) {
            if ($status == 1) {
              $query = "INSERT INTO take_project(student_id, project_id, DateTaken, Team) VALUES ('$studentid','$projectid',CURDATE(), $team)";
              if ($conn->query($query)) {
                $query = "SELECT Team FROM interest_project WHERE student_id = $studentid";
                if ($resultteam = $conn->query($query)) {
                  while ($rowteam = $resultteam->fetch_array(MYSQLI_ASSOC)) {
                    $chteam = $rowteam["Team"];
                    if ($chteam != -1 || $chteam != $team) {
                      $changestatus = "UPDATE interest_project SET Status = 0 WHERE Team = '$chteam'";
                      if ($conn->query($changestatus) === FALSE) {
                        $error = true;
                        echo "false";
                      }
                    }
                  }
                }
                $query = "UPDATE interest_project SET Status = 0 WHERE student_id != '$studentid' AND project_id = '$projectid' AND Team != $team";
                if ($conn->query($query)) {
                  $query = "DELETE FROM interest_project WHERE student_id = '$studentid' AND project_id != '$projectid'";
                  if ($conn->query($query) === FALSE) {
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
    if ($conn->query($query)) {
      $query = "SELECT Count(Team) AS Count, Team FROM interest_project WHERE 1 GROUP BY Team HAVING Count(Team) = 1";
      if ($resultcount = $conn->query($query)) {
        if ($row_cnt = $resultcount->num_rows > 0 ) {
          while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $team = $row["Team"];
            $query = "DELETE FROM interest_project WHERE Team = $team";
            if ($conn->query($query) === FALSE) {
              echo "false";
            }
          }
          echo "true";
        }
        else {
          echo "true";
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
}
$conn->close();
?>
