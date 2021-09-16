<?php
session_start();
require_once("connection.php");
if (($_SERVER["REQUEST_METHOD"] == "POST")  && isset($_POST["title"]) &&  isset($_POST["description"]) &&  isset($_POST["deliverable"]) &&  isset($_POST["tags"])) {
  $error = false;
  $id = $_POST["id"];
  $title = $conn->real_escape_string(trim(trim($_POST["title"])));
  $description = $conn->real_escape_string(trim($_POST["description"]));
  $deliverable = $conn->real_escape_string(trim($_POST["deliverable"]));
  $requirements = $conn->real_escape_string(trim($_POST["requirements"]));
  $coprofessor = $conn->real_escape_string(trim($_POST["coprofessor"]));
  $bibliography = $conn->real_escape_string(trim($_POST["bibliography"]));
  $prestudents = $conn->real_escape_string(trim($_POST["students"]));
  $count = $conn->real_escape_string(trim($_POST["count"]));
  if($count == "") {
    $count = "1";
  }
  $flag_students = false;
  if ($prestudents != "") {
    $students = explode(",", $prestudents);
    $flag_students = true;
  }
  $comments = $conn->real_escape_string($_POST["comments"]);
  $pretags = $conn->real_escape_string($_POST["tags"]);
  $tags = explode(",",$pretags);
  $query = "UPDATE project SET Title='$title',Description='$description',Deliverable='$deliverable',Required='$requirements',Cosupervisor='$coprofessor',Bibliography='$bibliography',StudentsCount='$count',Comments='$comments',DateCreated=CURDATE() WHERE id='$id'";
  if ($conn->query($query) === TRUE) {
    $query = "SELECT teacher_id FROM create_project Where project_id='$id'";
    if ($result_teacher = $conn->query($query)) {
      $row_teacher = $result_teacher->fetch_array(MYSQLI_ASSOC);
      $result_teacher->close();
      $teacherid = $row_teacher["teacher_id"];
      $query = "SELECT tags.id, tags.Name FROM tags, project_tag WHERE project_id='$id' AND tag_id=tags.id";
      if ($result = $conn->query($query)) {
        $row = $result->fetch_all(MYSQLI_ASSOC);
        $result->close();
        $counter = 0;
        $delete = array();
        foreach( $row as $keyrow => $valrow) {
          $temp = array();
          $count = 0;
          $tempid = "";
          foreach( $valrow as $keyrow2 => $valrow2) {
            if($count == 0) {
              $tempid = $valrow2;
              $count++;
            }
            else{
              $temp["id_or$valrow2"] = $tempid;
              $temp["or$valrow2"] = "false";
              $counter++;
            }
          }
          $delete = array_merge($delete, $temp);
        }
        foreach( $tags as $key => $val) {
          $check = false;
          foreach( $row as $keyrow => $valrow) {
            foreach( $valrow as $keyrow2 => $valrow2) {
              if($val == $valrow2) {
                $check = true;
                $counter--;
                $delete["or$valrow2"] = "true";
                break;
              }
            }
            if ($check == true) {
              break;
            }
          }
          if($check == false) {
            $tagsquery = "SELECT id FROM tags Where Name='$val'";
            if ($result = $conn->query($tagsquery)) {
              if ($row_cnt = $result->num_rows === 1 ) {
                $tagsrow = $result->fetch_array(MYSQLI_ASSOC);
                $result->close();
                $tagid = $tagsrow["id"];
                $query = "INSERT INTO project_tag(tag_id, project_id) VALUES ('$tagid','$id')";
                if ($conn->query($query) === FALSE) {
                  $error = true;
                  echo "false";
                }
              }
              else {
                $query = "INSERT INTO tags(Name) VALUES ('$val')";
                if ($conn->query($query) === TRUE) {
                  $tagsquery = "SELECT id FROM tags Where Name='$val'";
                  if ($result = $conn->query($tagsquery)) {
                    if ($row_cnt = $result->num_rows === 1 ) {
                      $tagsrow = $result->fetch_array(MYSQLI_ASSOC);
                      $result->close();
                      $tagid = $tagsrow["id"];
                      $query = "INSERT INTO project_tag(tag_id, project_id) VALUES ('$tagid','$id')";
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
          }
        }
        if ($counter != 0) {
          foreach ($delete as $key => $val) {
            if ($val == "false") {
              $query = "DELETE FROM project_tag WHERE tag_id='".$delete["id_$key"]."' AND project_id='$id'";
              if ($conn->query($query) === FALSE) {
                $error = true;
                echo "false";
              }
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
            $changestatus = "UPDATE interest_project SET Status = 0 WHERE student_id != '$memberid' AND project_id = '$id'";
          }
          else {
            $changestatus = "UPDATE interest_project SET Status = 0 WHERE student_id != '$memberid' AND project_id = '$id' AND Team != $max";
          }
          if ($conn->query($changestatus) === TRUE) {
            $query = "DELETE FROM interest_project WHERE student_id = '$memberid' AND project_id != '$id'";
            if ($conn->query($query) === TRUE) {
              $query = "INSERT INTO take_project(student_id, project_id, DateTaken, Team) VALUES ('$memberid','$id',CURDATE(), $max)";
              if ($conn->query($query) === TRUE) {
                $query = "INSERT INTO interest_project(student_id, project_id, DateInterest, Status, Team) VALUES ('$memberid','$id',CURDATE(), 1, $max)";
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
        /*  $query = "SELECT * FROM login_dummy WHERE Am = '$value'";
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
  if ( $error == false) {
    echo "true";
  }
}
$conn->close();
?>
