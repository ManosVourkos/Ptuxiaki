<?php
session_start();
require_once("connection.php");
if (($_SERVER["REQUEST_METHOD"] == "POST") && isset($_POST["status"])) {
 $status = $_POST["status"];
 $name = preg_split('/\s+/', $_SESSION["user"]);
 $query = "SELECT id FROM teacher WHERE '$name[0]' = Name AND '$name[1]' = Surname";
 if ($result = $conn->query($query)) {
   $row = $result->fetch_array(MYSQLI_ASSOC);
   $id = $row['id'];
   $query = "SELECT max FROM different_max_teacher WHERE teacher_id = $id";
   $flag = false;
   if ($result_settings = $conn->query($query)) {
     if ($row_cnt = $result_settings->num_rows != 0) {
       $row_settings = $result_settings->fetch_array(MYSQLI_ASSOC);
       $max = $row_settings["max"];
       $flag = true;
     }
   }
   $query = "SELECT * FROM settings";
   if ($result_settings = $conn->query($query)) {
     $row_settings = $result_settings->fetch_array(MYSQLI_ASSOC);
     if ($flag == false) {
      $max = $row_settings["MaxDiploma"];
     }
     $min = $row_settings["MinDiploma"];
     $month = date("m");
     foreach ($row_settings as $key => $value) {
       if(($key != "MinDiploma") && ($key != "MaxDiploma")) {
         if ($value != "false") {
           if ($key == "DefaultWinterSemesterStart") {
             if ($month >=9) {
               $row_settings[$key] = (date("Y"))."-".$row_settings[$key];
             }
             else {
               $row_settings[$key] = (date("Y")-1)."-".$row_settings[$key];
             }
           }
           else if ($key == "WinterSemesterStart") {
             if ($month >=9) {
               $row_settings[$key] = (date("Y"))."-".$row_settings[$key];
             }
             else {
               $row_settings[$key] = (date("Y")-1)."-".$row_settings[$key];
             }
           }
           else {
             if ($month >=9) {
               $row_settings[$key] = (date("Y")+1)."-".$row_settings[$key];
             }
             else {
               $row_settings[$key] = (date("Y")-1)."-".$row_settings[$key];
             }
           }
         }
       }
     }
     if ($row_settings["WinterSemesterStart"] == "false" && $row_settings["WinterSemesterEnd"] == "false") {
       $WinterSemesterStart = $row_settings["DefaultWinterSemesterStart"];
       $WinterSemesterEnd = $row_settings["DefaultWinterSemesterEnd"];
     }
     else {
       $WinterSemesterStart = $row_settings["WinterSemesterStart"];
       $WinterSemesterEnd = $row_settings["WinterSemesterEnd"];
     }
     if ($row_settings["SpringSemesterStart"] == "false" && $row_settings["SpringSemesterEnd"] == "false") {
       $SpringSemesterStart = $row_settings["DefaultSpringSemesterStart"];
       $SpringSemesterEnd = $row_settings["DefaultSpringSemesterEnd"];
     }
     else {
       $SpringSemesterStart = $row_settings["SpringSemesterStart"];
       $SpringSemesterEnd = $row_settings["SpringSemesterEnd"];
     }
     $current_date = date("Y-m-d");
     $wintertStartDate = date_create($WinterSemesterStart);
     $wintertEndDate = date_create($WinterSemesterEnd);
     if (($current_date > $wintertStartDate) || ($current_date < $wintertEndDate)){
          $datestring = "(DateCreated >= '$WinterSemesterStart' OR DateCreated <= '$WinterSemesterEnd')";
     }
     else {
          $datestring = "(DateCreated >= '$SpringSemesterStart' and DateCreated <= '$SpringSemesterEnd')";
     }
   }
   else {
     echo "false";
   }
   $query = "SELECT * FROM create_project, project WHERE  '$id' = teacher_id AND project_id = project.id AND ".$datestring;
   if ($result_row = $conn->query($query)) {
     $row_cnt = $result_row->num_rows;
     if($status == 0) {
       if ($row_cnt >= $min) {
         echo json_encode(array('min' => 'false'));
       }
       else {
         echo json_encode(array('min' => 'true'));
       }
     }
     else {
       if ($row_cnt < $max) {
         echo json_encode(array('max' => 'false'));
       }
       else {
         echo json_encode(array('max' => 'true'));
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
$conn->close();
?>
