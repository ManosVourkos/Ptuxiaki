<?php
session_start();
require_once("connection.php");
if (($_SERVER["REQUEST_METHOD"] == "POST")  && isset($_POST["title"]) &&  isset($_POST["description"]) &&  isset($_POST["deliverable"]) &&  isset($_POST["tags"])) {
  $title = $conn->real_escape_string(trim($_POST["title"]));
  $description = $conn->real_escape_string(trim($_POST["description"]));
  $deliverable = $conn->real_escape_string(trim($_POST["deliverable"]));
  $requirements = $conn->real_escape_string(trim($_POST["requirements"]));
  $coprofessor = $conn->real_escape_string(trim($_POST["coprofessor"]));
  $bibliography = $conn->real_escape_string(trim($_POST["bibliography"]));
  $prestudents = $conn->real_escape_string(trim($_POST["students"]));
  $comments = $conn->real_escape_string(trim($_POST["comments"]));
  $pretags = $conn->real_escape_string(trim($_POST["tags"]));
  $count = $conn->real_escape_string(trim($_POST["count"]));
  if($count == "") {
    $count = "1";
  }
  $flag_students = false;
  if ($prestudents != "") {
    $students = explode(",", $prestudents);
    $flag_students = true;
  }
  $tags = explode(",",$pretags);
  $query = "INSERT INTO project (Title, Description, Deliverable, Required, Cosupervisor, Bibliography, StudentsCount, Comments, DateCreated) VALUES ('$title','$description','$deliverable','$requirements','$coprofessor','$bibliography','$count','$comments', CURDATE())";
    if ($conn->query($query) === TRUE) {
      $email = $_SESSION['email'];
      $projectquery = "SELECT id FROM project Where Title='$title'";
      $teacherquery = "SELECT id FROM teacher Where Email='$email'";
      $error = false;
      if ($projectresult = $conn->query($projectquery)) {
        $projectrow = $projectresult->fetch_array(MYSQLI_ASSOC);
        $projectid = $projectrow['id'];
        $projectresult->close();
      }
      else {
        $error = true;
        echo "false";
      }
      if ($teacherresult = $conn->query($teacherquery)) {
        $teacherrow = $teacherresult->fetch_array(MYSQLI_ASSOC);
        $teacherid = $teacherrow['id'];
        $teacherresult->close();
      }
      else {
        $error = true;
        echo "false";
      }
      foreach ($tags as $value) {
        $tagsquery = "SELECT id FROM tags Where Name='$value'";
        if ($result = $conn->query($tagsquery)) {
          if ($row_cnt = $result->num_rows === 1 ) {
            $row = $result->fetch_array(MYSQLI_ASSOC);
            $tagid = $row["id"];
            $query = "INSERT INTO project_tag(tag_id, project_id) VALUES ('$tagid','$projectid')";
            if ($conn->query($query) === FALSE) {
              $error = true;
              echo "false";
            }
          }
          else {
            $query = "INSERT INTO tags(Name) VALUES ('$value')";
            if ($result = $conn->query($query)) {
              $tagsquery = "SELECT id FROM tags Where Name='$value'";
              if ($result = $conn->query($tagsquery)) {
                if ($row_cnt = $result->num_rows === 1 ) {
                  $row = $result->fetch_array(MYSQLI_ASSOC);
                  $tagid = $row["id"];
                  $query = "INSERT INTO project_tag(tag_id, project_id) VALUES ('$tagid','$projectid')";
                  if ($conn->query($query) === FALSE) {
                    $error = true;
                    echo "false";
                  }
                  $query = "INSERT INTO create_tag(tag_id, teacher_id) VALUES ('$tagid','$teacherid')";
                  if ($conn->query($query) === FALSE) {
                    $error = true;
                    echo "false";
                  }
                }
                else {
                  $error = true;
                  echo "false";
                }
              }
              else {
                $error = true;
                echo "false";
              }
            }
            else {
              $error = true;
              echo "false";
            }
          }
        }
        else {
          $error = true;
          echo "false";
        }
      }
      if ($flag_students == true) {
        if (count($students) == 1) {
          $max = -1;
        }
        else {
          $maxquery = "SELECT MAX(Team) As Max FROM interest_project WHERE 1";
          if ($resultmax = $conn->query($maxquery)) {
            $rowmax = $resultmax->fetch_array(MYSQLI_ASSOC);
            $max = $rowmax["Max"] + 1;
          }
          else {
              $error = true;
              echo "false";
          }
        }
        foreach ($students as $value) {
          $membersquery = "SELECT * FROM student WHERE Am = '$value'";
          if ($resultmembers = $conn->query($membersquery)) {
            if ($row_cnt = $resultmembers->num_rows === 1 ) {
              $rowmembers = $resultmembers->fetch_array(MYSQLI_ASSOC);
              $memberid = $rowmembers["id"];
              $query = "SELECT Team FROM interest_project WHERE student_id = $memberid";
              if ($resultteam = $conn->query($query)) {
                while ($rowteam = $resultteam->fetch_array(MYSQLI_ASSOC)) {
                  $chteam = $rowteam["Team"];
                  if ($chteam != -1) {
                    $changestatus = "UPDATE interest_project SET Status = 0 WHERE Team = '$chteam'";
                    if ($conn->query($changestatus) === FALSE) {
                      $error = true;
                      echo "false";
                    }
                  }
                }
              }
              else {
                $error = true;
                echo "false";
              }
              if (count($students) == 1) {
                $changestatus = "UPDATE interest_project SET Status = 0 WHERE student_id != '$memberid' AND project_id = '$projectid'";
              }
              else {
                $changestatus = "UPDATE interest_project SET Status = 0 WHERE student_id != '$memberid' AND project_id = '$projectid' AND Team != $max";
              }
              if ($conn->query($changestatus) === TRUE) {
                $query = "DELETE FROM interest_project WHERE student_id = '$memberid' AND project_id != '$projectid'";
                if ($conn->query($query) === TRUE) {
                  $query = "INSERT INTO take_project(student_id, project_id, DateTaken, Team) VALUES ('$memberid','$projectid',CURDATE(), $max)";
                  if ($conn->query($query) === TRUE) {
                    $query = "INSERT INTO interest_project(student_id, project_id, DateInterest, Status, Team) VALUES ('$memberid','$projectid',CURDATE(), 1, $max)";
                    if ($conn->query($query) === TRUE) {
                      $query = "SELECT Count(Team) AS Count, Team FROM interest_project WHERE 1 GROUP BY Team HAVING Count(Team) = 1";
                      if ($resultcount = $conn->query($query)) {
                        if ($row_cnt = $resultcount->num_rows > 0 ) {
                          while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                            $team = $row["Team"];
                            $query = "DELETE FROM interest_project WHERE Team = $team";
                            if ($conn->query($query) === FALSE) {
                              $error = true;
                              echo "false";
                            }
                          }
                        }
                      }
                      else {
                        $error = true;
                        echo "false";
                      }
                    }
                    else {
                      $error = true;
                      echo "false";
                    }
                  }
                  else {
                    $error = true;
                    echo "false";
                  }
                }
                else {
                  $error = true;
                  echo "false";
                }
              }
              else {
                $error = true;
                echo "false";
              }
            }
            else {/*
              $query = "SELECT * FROM login_dummy WHERE Am = '$value'";
              if ($resultst = $conn->query($query)) {
                $rowst = $resultst->fetch_array(MYSQLI_ASSOC);
                $am = $rowst["Am"];
                $email = $rowst["Email"];
                $name = $rowst["Name"];
                $surname = $rowst["Surname"];
                $query = "INSERT INTO student(am, email, name, surname) VALUES ('$am','$email','$name','$surname')";
                if ($conn->query($query)) {
                  $query = "SELECT id FROM student WHERE Am = '$am'";
                  if ($resultmem = $conn->query($query)) {
                    $rowmem = $resultmem->fetch_array(MYSQLI_ASSOC);
                    $resultmem->close();
                    $memberid = $rowmem["id"];
                    if (count($students) == 1) {
                      $changestatus = "UPDATE interest_project SET Status = 0 WHERE student_id != '$memberid' AND project_id = '$projectid'";
                    }
                    else {
                      $changestatus = "UPDATE interest_project SET Status = 0 WHERE student_id != '$memberid' AND project_id = '$projectid' AND Team != $max";
                    }
                    if ($conn->query($changestatus) === TRUE) {
                      $query = "DELETE FROM interest_project WHERE student_id = '$memberid' AND project_id != '$projectid'";
                      if ($conn->query($query) === TRUE) {
                        $query = "INSERT INTO take_project(student_id, project_id, DateTaken, Team) VALUES ('$memberid','$projectid',CURDATE(), $max)";
                        if ($conn->query($query) === TRUE) {
                          $query = "INSERT INTO interest_project(student_id, project_id, DateInterest, Status, Team) VALUES ('$memberid','$projectid',CURDATE(), 1, $max)";
                          if ($conn->query($query) === TRUE) {
                            $query = "SELECT Count(Team) AS Count, Team FROM interest_project WHERE 1 GROUP BY Team HAVING Count(Team) = 1";
                            if ($resultcount = $conn->query($query)) {
                              if ($row_cnt = $resultcount->num_rows > 0 ) {
                                while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                                  $team = $row["Team"];
                                  $query = "DELETE FROM interest_project WHERE Team = $team";
                                  if ($conn->query($query) === FALSE) {
                                    $error = true;
                                    echo "false";
                                  }
                                }
                              }
                            }
                            else {
                              $error = true;
                              echo "false";
                            }
                          }
                          else {
                            $error = true;
                            echo "false";
                          }
                        }
                        else {
                          $error = true;
                          echo "false";
                        }
                      }
                      else {
                        $error = true;
                        echo "false";
                      }
                    }
                    else {
                      $error = true;
                      echo "false";
                    }
                  }
                  else {
                    $error = true;
                    echo "false";
                  }
                }
                else {
                  $error = true;
                  echo "false";
                }
              }
              else {
                $error = true;
                echo "false";
              }*/
            }

          }
        }
      }
      if ($error == false) {
        $query = "INSERT INTO create_project (project_id, teacher_id) VALUES ('$projectid','$teacherid')";
        if ($conn->query($query) === TRUE) {
          echo "true";
        }
        else {
          echo "false";
        }
      }
      else{
        echo "false";
      }
    }
    else {
      echo "false";
    }
    $conn->close();
}
?>
