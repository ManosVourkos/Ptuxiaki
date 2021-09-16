<?php
session_start();
require_once("connection.php");
if (($_SERVER["REQUEST_METHOD"] == "POST")  && (isset($_POST["title"])) && (isset($_POST["interest"]))) {
  $title = $conn->real_escape_string($_POST["title"]);
  $interest = $conn->real_escape_string($_POST["interest"]);
  $am = $_SESSION['Am'];
  $query = "SELECT id FROM project WHERE Title = '$title'";
  if ($result = $conn->query($query)) {
    $row = $result->fetch_array(MYSQLI_ASSOC);
    $result->close();
    $projectid = $row["id"];
    if ($interest == "true") {
      $query = "SELECT * FROM student WHERE Am = '$am'";
      if ($result = $conn->query($query)) {
        if ($row_cnt = $result->num_rows === 1 ) {
          $row = $result->fetch_array(MYSQLI_ASSOC);
          $result->close();
          $studentid = $row["id"];
          if (isset($_POST["students-team"])) {
            $maxquery = "SELECT MAX(Team) As Max FROM interest_project WHERE 1";
            if ($resultmax = $conn->query($maxquery)) {
              $rowmax = $resultmax->fetch_array(MYSQLI_ASSOC);
              $max = $rowmax["Max"] + 1;
              $premembers = $conn->real_escape_string($_POST["students-team"]);
              $members = explode(",",$premembers);
              foreach ($members as $value) {
                $membersquery = "SELECT * FROM student WHERE Am = '$value'";
                if ($resultmembers = $conn->query($membersquery)) {
                  if ($row_cnt = $resultmembers->num_rows === 1 ) {
                    $rowmembers = $resultmembers->fetch_array(MYSQLI_ASSOC);
                    $memberid = $rowmembers["id"];
                    $memberssquery = "SELECT * FROM interest_project WHERE student_id = $memberid AND project_id = $projectid";
                    if ($resultmemberss = $conn->query($memberssquery)) {
                      if ($row_cnt = $resultmemberss->num_rows === 1 ) {
                        $query = "UPDATE interest_project SET DateInterest = CURDATE(), Status = 2, Team = $max WHERE student_id = $memberid AND project_id = $projectid";
                        if ($conn->query($query) === FALSE) {
                          echo "false";
                        }
                      }
                      else{
                        $query = "INSERT INTO interest_project(student_id, project_id, DateInterest, Status, Team) VALUES ('$memberid','$projectid',CURDATE(), 2, $max)";
                        if ($conn->query($query) === FALSE) {
                          echo "false";
                        }
                      }
                    }
                    else {
                      echo "false";
                    }
                  }
                  else {
                    /*$query = "SELECT * FROM login_dummy WHERE Am = '$value'";
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
                          $query = "INSERT INTO interest_project(student_id, project_id, DateInterest, Status, Team) VALUES ('$memberid','$projectid',CURDATE(), 2, $max)";
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
                    else {
                      echo "false";
                    }*/
                  }
                }
                else {
                  echo "false";
                }
              }
              $query = "INSERT INTO interest_project(student_id, project_id, DateInterest, Status, Team) VALUES ($studentid,$projectid,CURDATE(), 2, $max)";
            }
            else {
              echo "false";
            }
          }
          else {
            $query = "INSERT INTO interest_project(student_id, project_id, DateInterest, Status, Team) VALUES ($studentid,$projectid,CURDATE(), 2, -1)";
          }
          if ($conn->query($query)) {
            $query = "SELECT Count(Team) AS Count, Team FROM interest_project WHERE 1 GROUP BY Team HAVING Count(Team) = 1";
            if ($resultcount = $conn->query($query)) {
              if ($row_cnt = $resultcount->num_rows > 0 ) {
                while ($row = $resultcount->fetch_array(MYSQLI_ASSOC)) {
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
            echo $conn->error;
            echo "false";
          }
        }
        else {
          /*$email = $_SESSION['email'];
          $name = explode(" ",$_SESSION['user']);
          $query = "INSERT INTO student(am, email, name, surname) VALUES ('$am','$email','$name[0]','$name[1]')";
          if ($conn->query($query)) {
            $query = "SELECT id FROM student WHERE Am = '$am'";
            if ($result = $conn->query($query)) {
              $row = $result->fetch_array(MYSQLI_ASSOC);
              $result->close();
              $studentid = $row["id"];
              if (isset($_POST["students-team"])) {
                $maxquery = "SELECT MAX(Team) As Max FROM interest_project WHERE 1";
                if ($resultmax = $conn->query($maxquery)) {
                  $rowmax = $resultmax->fetch_array(MYSQLI_ASSOC);
                  $max = $rowmax["Max"] + 1;
                  $premembers = $conn->real_escape_string($_POST["students-team"]);
                  $members = explode(",",$premembers);
                  foreach ($members as $value) {
                    $membersquery = "SELECT * FROM student WHERE Am = '$value'";
                    if ($resultmembers = $conn->query($membersquery)) {
                      if ($row_cnt = $resultmembers->num_rows === 1 ) {
                        $rowmembers = $resultmembers->fetch_array(MYSQLI_ASSOC);
                        $memberid = $rowmembers["id"];
                        $query = "INSERT INTO interest_project(student_id, project_id, DateInterest, Status, Team) VALUES ('$memberid','$projectid',CURDATE(), 2, $max)";
                        if ($conn->query($query) === FALSE) {
                          echo "false";
                        }
                      }
                      else {
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
                              $query = "INSERT INTO interest_project(student_id, project_id, DateInterest, Status, Team) VALUES ('$memberid','$projectid',CURDATE(), 2, $max)";
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
                        else {
                          echo "false";
                        }
                      }
                    }
                    else {
                      echo "false";
                    }
                  }
                  $query = "INSERT INTO interest_project(student_id, project_id, DateInterest, Status, Team) VALUES ('$studentid','$projectid',CURDATE(), 2, $max)";
                }
                else {
                  echo "false";
                }
              }
              else {
                $query = "INSERT INTO interest_project(student_id, project_id, DateInterest, Status, Team) VALUES ('$studentid','$projectid',CURDATE(), 2, -1)";
              }
              if ($conn->query($query)) {
                $query = "SELECT Count(Team) AS Count, Team FROM `interest_project` WHERE 1 GROUP BY Team HAVING Count(Team) = 1";
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
          }*/
        }
      }
      else {
        echo "false";
      }
    }
    else {
      $query = "SELECT * FROM student WHERE Am = '$am'";
      if ($result = $conn->query($query)) {
        if ($row_cnt = $result->num_rows === 1 ) {
          $row = $result->fetch_array(MYSQLI_ASSOC);
          $result->close();
          $studentid = $row["id"];
          $query = "SELECT Team FROM interest_project WHERE student_id = '$studentid' AND project_id = $projectid";
          if ($resultte = $conn->query($query)) {
            $rowte = $resultte->fetch_array(MYSQLI_ASSOC);
            $team = $rowte["Team"];
            if ($team == "-1") {
              $query = "DELETE FROM interest_project WHERE student_id = '$studentid' AND project_id = $projectid";
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
              $query = "SELECT * FROM interest_project WHERE Team = '$team' AND project_id = $projectid";
              if ($resultteam = $conn->query($query)) {
                while ($rowteam = $resultteam->fetch_array(MYSQLI_ASSOC)) {
                  $idteam = $rowteam["student_id"];
                  $query = "DELETE FROM interest_project WHERE student_id = '$idteam' AND project_id = $projectid";
                  if ($conn->query($query)) {
                      $query = "SELECT Count(Team) AS Count, Team FROM interest_project WHERE 1 GROUP BY Team HAVING Count(Team) = 1";
                      if ($resultcount = $conn->query($query)) {
                        if ($row_cnt = $resultcount->num_rows > 0 ) {
                          while ($row = $resultcount->fetch_array(MYSQLI_ASSOC)) {
                            $team = $row["Team"];
                            $query = "UPDATE interest_project SET Team = -1 WHERE Team = $team";
                            if ($conn->query($query) === FALSE) {
                              echo "false";
                            }
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
                echo "true";
              }
              else {
                echo "false";
              }
            }
          }
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
$conn->close();
?>
