<?php
session_start();
require_once("connection.php");
if (($_SERVER["REQUEST_METHOD"] == "POST")) {
  $am = $_SESSION["Am"];
  $query = "SELECT id FROM student WHERE '$am'= am";
  if ($result = $conn->query($query)) {
    $row = $result->fetch_array(MYSQLI_ASSOC);
    $result->close();
    $studentid = $row["id"];
    $query = "SELECT * FROM interest_project WHERE student_id = '$studentid'";
    if ($result = $conn->query($query)) {
      if ($row_cnt = $result->num_rows != 0 ) {
        $row = $result->fetch_array(MYSQLI_ASSOC);
        $projectid = $row['project_id'];
        $query = "SELECT Status FROM interest_project WHERE project_id = '$projectid' AND student_id = '$studentid' AND (Status = 1 OR Status = 5)";
        if ($resultstatus = $conn->query($query)) {
          if ($row_cnt = $resultstatus->num_rows != 0 ) {
            $row = $resultstatus->fetch_array(MYSQLI_ASSOC);
            $status = $row["Status"];
            $query = "SELECT Title FROM project WHERE id = '$projectid'";
            if ($resultproject = $conn->query($query)) {
              $row = $resultproject->fetch_array(MYSQLI_ASSOC);
              $title = $row['Title'];
              if ($status == 1) {
                $query = "UPDATE interest_project SET Status = 4 WHERE student_id = '$studentid' AND project_id = '$projectid'";
              }
              else {
                $query = "UPDATE interest_project SET Status = 6 WHERE student_id = '$studentid' AND project_id = '$projectid'";
              }
              if ($conn->query($query)) {
                if ($status == 1) {
                  $message = Array("Title" => "$title","Status" => 1);
                }
                else {
                  $message = Array("Title" => "$title","Status" => 5);
                }
                echo json_encode($message);
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
            $query = "SELECT * FROM interest_project WHERE student_id = '$studentid' AND Status = 0";
            if ($resultstatus = $conn->query($query)) {
              if ($row_cnt = $resultstatus->num_rows != 0 ) {
                $index = 0;
                $message = array();
                while ($row = $resultstatus->fetch_array(MYSQLI_ASSOC)) {
                  $projectid = $row['project_id'];
                  $query = "SELECT Title FROM project WHERE id = '$projectid'";
                  if ($resultproject = $conn->query($query)) {
                    $row = $resultproject->fetch_array(MYSQLI_ASSOC);
                    $title = $row['Title'];
                    $query = "UPDATE interest_project SET Status = 3 WHERE student_id = '$studentid' AND project_id = '$projectid'";
                    if ($conn->query($query)) {
                      $message['Diploma'][$index] = $title;
                    }
                    else {
                      echo "false";
                    }
                  }
                  else {
                    echo "false";
                  }
                  $message['Status'] = 0;
                  $index++;
                }
                echo json_encode($message);
              }
              else {
                $query = "SELECT * FROM interest_project WHERE student_id = '$studentid' AND Status = 5";
                if ($resultstatus = $conn->query($query)) {
                  if ($row_cnt = $resultstatus->num_rows != 0 ) {
                    $row = $resultstatus->fetch_array(MYSQLI_ASSOC);
                    $projectid = $row['project_id'];
                    $message = array();
                    $query = "SELECT Title FROM project WHERE id = '$projectid'";
                    if ($resultproject = $conn->query($query)) {
                      $row = $resultproject->fetch_array(MYSQLI_ASSOC);
                      $title = $row['Title'];
                      $query = "UPDATE interest_project SET Status = 6 WHERE student_id = '$studentid' AND project_id = '$projectid'";
                      if ($conn->query($query)) {
                        $message = Array("Title" => "$title","Status" => 5);
                        echo json_encode($message);
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
      $result->close();
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
