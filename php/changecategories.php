<?php
session_start();
require_once("connection.php");
if (($_SERVER["REQUEST_METHOD"] == "POST")) {
  if (isset($_POST["delete"]) && $_POST["id"]) {
    $count = 0;
    if ($_POST["delete"] == "true") {
      $id = $_POST["id"];
      $query = "SELECT project_id FROM project_tag WHERE tag_id = $id";
      if ($result = $conn->query($query)) {
        if ($row_cnt = $result->num_rows === 0 ) {
          $query = "DELETE FROM tags WHERE id = $id";
          if ($conn->query($query)) {
            $query = "DELETE FROM create_tag WHERE tag_id = $id";
            if ($conn->query($query)) {
              $query = "DELETE FROM project_tag WHERE tag_id = $id";
              if ($conn->query($query)) {
                echo "true";
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
          while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $prid = $row["project_id"];
            $query = "SELECT COUNT(*) AS Count FROM project_tag WHERE project_id = $prid";
            if ($resultcheck = $conn->query($query)) {
              $rowcheck = $resultcheck->fetch_array(MYSQLI_ASSOC);
              if ($rowcheck["Count"] <= 1 ) {
                $count++;
              }
              else {
                  $query = "DELETE FROM project_tag WHERE tag_id = $id AND project_id = $prid";
                  if ($conn->query($query) === FALSE) {
                    echo "false";
                  }
              }
            }
          }
          if ($count == 0) {
            $query = "DELETE FROM tags WHERE id = $id";
            if ($conn->query($query)) {
              $query = "DELETE FROM create_tag WHERE tag_id = $id";
              if ($conn->query($query)) {
                echo "true";
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
            echo json_encode(array('error' => $count));
          }
        }
      }
      else {
        echo "false";
      }
    }
  }
  else {
    $id = $_POST["id"];
    $tag = $conn->real_escape_string($_POST["editCategory"]);
    $query = "UPDATE tags SET Name='$tag' WHERE id = $id";
    if ($conn->query($query)) {
      echo "true";
    }
    else {
      echo "false";
    }
  }
}
$conn->close();
?>
