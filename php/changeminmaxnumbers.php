<?php
session_start();
require_once("connection.php");
if (($_SERVER["REQUEST_METHOD"] == "POST")) {
  $check_query = true;
  if (isset($_POST["admindel"])) {
    $name = preg_split('/\s+/', $_POST["admindel"]);
    $query = "SELECT id FROM teacher WHERE '$name[1]' = Name AND '$name[0]' = Surname";
    if ($result = $conn->query($query)) {
      $row = $result->fetch_array(MYSQLI_ASSOC);
      $id = $row['id'];
      $result->close();
      $query = "DELETE FROM admin WHERE id = $id";
    }
  }
  else if (isset($_POST["admin"])) {
    $name = preg_split('/\s+/', $_POST["admin"]);
    $query = "SELECT id FROM teacher WHERE '$name[0]' = Name AND '$name[1]' = Surname";
    if ($result = $conn->query($query)) {
      $row = $result->fetch_array(MYSQLI_ASSOC);
      $id = $row['id'];
      $result->close();
      $query = "SELECT id FROM admin WHERE id = $id";
      if ($result = $conn->query($query)) {
        if ($row_cnt = $result->num_rows === 0) {
          $query = "INSERT INTO admin(id, Type) VALUES ($id, 'Admin')";
        }
        else {
          $check_query = false;
        }
      }
    }
  }
  else if (isset($_POST["changeSpringSemesterStart"]) && isset($_POST["changeSpringSemesterEnd"])) {
    $SpringSemesterStart = substr($_POST["changeSpringSemesterStart"], 5);
    $SpringSemesterEnd = substr($_POST["changeSpringSemesterEnd"], 5);
    $query = "UPDATE settings SET  SpringSemesterStart='$SpringSemesterStart', SpringSemesterEnd='$SpringSemesterEnd'";
  }
  else if (isset($_POST["changeWinterSemesterStart"]) && isset($_POST["changeWinterSemesterEnd"])) {
    $WinterSemesterStart = substr($_POST["changeWinterSemesterStart"], 5);
    $WinterSemesterEnd = substr($_POST["changeWinterSemesterEnd"], 5);
    $query = "UPDATE settings SET  WinterSemesterStart='$WinterSemesterStart', WinterSemesterEnd='$WinterSemesterEnd'";
  }
  else if (isset($_POST["namedel"])) {
    $name = preg_split('/\s+/', $_POST["namedel"]);
    $query = "SELECT id FROM teacher WHERE '$name[1]' = Name AND '$name[0]' = Surname";
    if ($result = $conn->query($query)) {
      $row = $result->fetch_array(MYSQLI_ASSOC);
      $id = $row['id'];
      $result->close();
      $query = "DELETE FROM different_max_teacher WHERE teacher_id = $id";
    }
  }
  else if (isset($_POST["editNumberMaxProfessor"]) && isset($_POST["name"])) {
    $name = preg_split('/\s+/', $_POST["name"]);
    $query = "SELECT id FROM teacher WHERE '$name[0]' = Surname AND '$name[1]' = Name";
    if ($result = $conn->query($query)) {
      $row = $result->fetch_array(MYSQLI_ASSOC);
      $id = $row['id'];
      $result->close();
      $query = "UPDATE different_max_teacher SET max = $_POST[editNumberMaxProfessor] WHERE teacher_id = $id";
    }
  }
  else if (isset($_POST["changeNumberMax"]) && isset($_POST["professor"])) {
    $name = preg_split('/\s+/', $_POST["professor"]);
    $query = "SELECT id FROM teacher WHERE '$name[0]' = Name AND '$name[1]' = Surname";
    if ($result = $conn->query($query)) {
      $row = $result->fetch_array(MYSQLI_ASSOC);
      $id = $row['id'];
      $result->close();
      $query = "INSERT INTO different_max_teacher(teacher_id, max) VALUES ($id, $_POST[changeNumberMax])";
    }
  }
  else if(isset($_POST["MinimumDefault"])) {
    $query = "UPDATE settings SET MinDiploma=$_POST[MinimumDefault]";
  }
  else {
    $query = "UPDATE settings SET MaxDiploma=$_POST[MaximumDefault]";
  }
  if ($conn->query($query)) {
      $month = date("m");
      if ($month >= 9) {
        $year = date("Y") + 1;
      }
      else {
        $year = date("Y");
      }
    if (isset($_POST["changeWinterSemesterStart"]) && isset($_POST["changeWinterSemesterEnd"])) {
      $query = "SELECT SpringSemesterStart,SpringSemesterEnd,DefaultSpringSemesterStart,DefaultSpringSemesterEnd FROM settings WHERE 1";
      if ($result = $conn->query($query)) {
        $row = $result->fetch_array(MYSQLI_ASSOC);
        foreach ($row as $key => $value) {
          if ($value != "false") {
            if ($key == "DefaultWinterSemesterStart") {
              if ($month >=9) {
                $row[$key] = (date("Y"))."-".$row[$key];
              }
              else {
                $row[$key] = (date("Y")-1)."-".$row[$key];
              }
            }
            else if ($key == "WinterSemesterStart") {
              if ($month >=9) {
                $row[$key] = (date("Y"))."-".$row[$key];
              }
              else {
                $row[$key] = (date("Y")-1)."-".$row[$key];
              }
            }
            else {
              if ($month >=9) {
                $row[$key] = (date("Y")+1)."-".$row[$key];
              }
              else {
                $row[$key] = (date("Y"))."-".$row[$key];
              }
            }
          }
        }
        $change = date_create($_POST["changeWinterSemesterEnd"]);
        if ($row["SpringSemesterStart"] == "false") {
          $dspring = date_create($row["DefaultSpringSemesterStart"]);
          $dspringe = $row["DefaultSpringSemesterEnd"];
        }
        else {
          $dspring = date_create($row["SpringSemesterStart"]);
          $dspringe = $row["SpringSemesterEnd"];
        }
        $interval = date_diff($change, $dspring);
        if( $interval->invert){
         $diff = -1 * $interval->format('%a');
        }
        else {
          $diff = $interval->format('%a');
        }
        if ($diff == 0) {
          $dspring->add(new DateInterval('P1D'));
          $dformat = $dspring->format("m-d");
          $dsend = substr($dspringe, 5);
          $query = "UPDATE settings SET  SpringSemesterStart='$dformat', SpringSemesterEnd='$dsend'";
        }
        else if ($diff < 0) {
          $string = "P".(($diff * (-1)) + 1)."D";
          $dspring->add(new DateInterval($string));
          $dformat = $dspring->format("m-d");
          $dsend = substr($dspringe, 5);
          $query = "UPDATE settings SET  SpringSemesterStart='$dformat', SpringSemesterEnd='$dsend'";
        }
      }
      if( $check_query == true) {
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
      echo "true";
    }
  }
  else {
    echo "false";
  }
}
$conn->close();
?>
