<?php
 session_start();
 echo "Logout Successfully ";
 unset($_SESSION['user']);
 unset($_SESSION['email']);
 unset($_SESSION['category']);
 if(isset($_SESSION['Am'])){
   unset($_SESSION['Am']);
 }
 if(isset($_SESSION['Type'])){
   unset($_SESSION['Type']);
 }
 session_destroy();
 if(!isset($_POST['idle'])){
   header("Location: ../index.php");
 }
?>
