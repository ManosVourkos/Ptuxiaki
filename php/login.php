<?php
session_start();
require_once("connection.php");
if (($_SERVER["REQUEST_METHOD"] == "POST")  && isset($_POST["email"]) &&  isset($_POST["password"])) {
  $email = $conn->real_escape_string($_POST["email"]);
  $password = $conn->real_escape_string($_POST["password"]);
  if(isset($_POST["rememberme"])) {
    $rememberme = true;
  }
  else {
    $rememberme = false;
  }
  $fname = "";
  $lname = "";
  $am = NULL;
  ////LDAP arxi kwdika

  /*
  ////o kwdikas auto xreiazetai mono ean to ldap querry thelei mono to Username
  ///kai oxi to email. Etsi kovei to @uop.gr kratwntas mono to username kai sunexeizei
  preg_match_all("/[\._a-zA-Z0-9-]+/i",$email,$f);
  $name_em = $f[0];
  $dom_em = $f[1];
  $username = $name_em;
  */

  /*$ldaphost = "ldaps://tripoli2.uop.gr";
  $ldap_domain= "uop.gr";
  $base_dn = "dc=uop,dc=gr";
  $dn = "ou=people,dc=uop,dc=gr";
  $ds=ldap_connect($ldaphost) or die ("Could not connect to LDAP server.");

  echo "ldap_error: " . ldap_error($ds);
  ldap_set_option($ds, LDAP_OPT_PROTOCOL_VERSION, 3);
  ldap_set_option($ds, LDAP_OPT_REFERRALS, 0);
  $bind_result = ldap_bind($ds, "uid=$username,$dn", $password);
  echo "ldap_error: " . ldap_error($ds);
  $filter = "uid=$username";
  $resultFields = array("uopstudentid","edupersonprimaryaffiliation","edupersonorgunitdn","sn","givenName","displayName");
  $result = ldap_search($ds,$dn,$filter,$resultFields);
  $resultData = ldap_get_entries($ds, $result);
  $resultAttributesFull = ldap_get_attributes($ds,$resultData);
  $unbind_result - ldap_unbind($ds);
  $fname = ["givenname"][0].$resultData[0]["givenName"][1];
  $lname = $resultData[0]["sn"][0].$resultData[0]["sn"][1];
  $uopstudentid = $resultData[0]["uopstudentid"][0].$resultData[0]["uopstudentid"][1];
  $department = substr($uopstudentid,0,-13);
  $am = substr($uopstudentid, -13);*/


  /*  $_SESSION['user'] = "$fname $lname";
    $_SESSION['email'] = $email;
    $_SESSION['user'] = trim($_SESSION['user']);
    if ($am == NULL || $am == "") {
      if ($lname == "" && $lname == "") {
      $query="SELECT * FROM login_secretariat WHERE Username='$email' AND Password='$password'";
      if ($result = $conn->query($query)) {
        if ($row_cnt = $result->num_rows === 1 ) {
          $row = $result->fetch_array(MYSQLI_ASSOC);
          $_SESSION['user'] = "Γραμματεία";
          $_SESSION['email'] = $email;
          $_SESSION['user'] = trim($_SESSION['user']);
          $_SESSION['category'] = "secretariat";
          $id = $row["id"];
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
        $_SESSION['category'] = "professor";
        $query = "SELECT id FROM teacher WHERE Name = '$fname' AND Surname = '$lname'";
        if ($resultpr = $conn->query($query)) {
          if ($row_cnt = $resultpr->num_rows === 1 ) {
            $rowpr = $resultpr->fetch_array(MYSQLI_ASSOC);
            $id = $rowpr["id"];
          }
          else {
            $namein = $fname;
            $surnin = $lname;
            $emailin = $email;
            $query = "INSERT INTO teacher (Name, Surname, Email) VALUES ('$namein','$surnin','$emailin')";
            if ($resultss = $conn->query($query)) {
              $query = "SELECT id FROM teacher WHERE Name = '$namein' AND Surname = '$surnin'";
              if ($resultprin = $conn->query($query)) {
                if ($row_cntprin = $resultprin->num_rows === 1 ) {
                  $rowprin = $resultprin->fetch_array(MYSQLI_ASSOC);
                  $id = $rowprin["id"];
              }
            }
          }
          else {
            echo $conn->error;
          }
        }
        }
      }
        $query="SELECT Type FROM admin WHERE id='$id'";
        if ($result = $conn->query($query)) {
          if ($row_cnt = $result->num_rows === 1 ) {
            $row = $result->fetch_array(MYSQLI_ASSOC);
            $_SESSION['Admin'] = $row['Type'];
        }
      }
    }
    else {
      $_SESSION['Am'] = $am;
      $_SESSION['category'] = "student";
      $query="SELECT id FROM student WHERE am='$am'";
      if ($results = $conn->query($query)) {
        if ($row_cnts = $results->num_rows === 1 ) {
          $rows = $results->fetch_array(MYSQLI_ASSOC);
          $query="SELECT Status FROM interest_project WHERE student_id='$rows[id]' AND (Status=6)";
          if ($resultss = $conn->query($query)) {
            if ($row_cntss = $resultss->num_rows === 1 ) {
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
              echo "false";
            }
          }
          else {
            echo "false";
          }
        }
        else {
          $namein = $fname;
          $surnin = $lname;
          $emailin = $row['Email'];
          $query = "INSERT INTO student(am, email, name, surname) VALUES ('$am','$email','$namein','$surnin')";
          if ($resultss = $conn->query($query)) {
            $query = "SELECT id FROM student WHERE Name = '$namein' AND Surname = '$surnin'";
            if ($resultprin = $conn->query($query)) {
              if ($row_cntprin = $resultprin->num_rows === 1 ) {
                $rowprin = $resultprin->fetch_array(MYSQLI_ASSOC);
                $id = $rowprin["id"];
            }
          }
        }
        else {
          echo $conn->error;
        }
        }
        }
      }
      else {
        echo "false";
      }
    }
    if($rememberme == true) {
      $encodedemail = serialize( $email );
      $encodedemail = gzcompress( $encodedemail );
      $encodedemail = base64_encode( $encodedemail );
      $encodedpassword = serialize( $password );
      $encodedpassword = gzcompress( $encodedpassword );
      $encodedpassword = base64_encode( $encodedpassword );
      $params = session_get_cookie_params();
      setcookie("username",$encodedemail, strtotime( '+30 days' ), "/", $params["domain"], $params["secure"], true);
      setcookie("password",$encodedpassword, strtotime( '+30 days' ), "/", $params["domain"], $params["secure"], true);
    }
    else {
      if (isset($_COOKIE["username"])) {
        setcookie("username","", 1, "/");
      }
      if (isset($_COOKIE["password"])) {
        setcookie("password","", 1, "/");
      }
    }
    if (($fname != NULL || $fname != "") && ($lname != NULL || $lname != "")) {
      echo "true";
    }
    else {
    echo false;
  }
  */

  ////LDAP telos kwdika

  $id = -1;
  ////login_dummy arxi
  $query="SELECT * FROM login_dummy WHERE Email='$email' AND Password='$password'";
  if ($result = $conn->query($query)) {
    if ($row_cnt = $result->num_rows === 1 ) {
      $row = $result->fetch_array(MYSQLI_ASSOC);
      $lname = $row['Surname'];
      $fname = $row['Name'];
      $_SESSION['user'] = "$fname $lname";
      $_SESSION['email'] = $row['Email'];
      $_SESSION['user'] = trim($_SESSION['user']);
      $am = $row['Am'];
      if ($am == NULL || $am == "") {
        if ($lname == "") {
          $_SESSION['category'] = "secretariat";
          $id = $row["id"];
        }
        else {
          $_SESSION['category'] = "professor";
          $query = "SELECT id FROM teacher WHERE Name = '$fname' AND Surname = '$lname'";
          if ($resultpr = $conn->query($query)) {
            if ($row_cnt = $resultpr->num_rows === 1 ) {
              $rowpr = $resultpr->fetch_array(MYSQLI_ASSOC);
              $id = $rowpr["id"];
            }
            else {
              $namein = $fname;
              $surnin = $lname;
              $emailin = $row['Email'];
              $query = "INSERT INTO teacher (Name, Surname, Email) VALUES ('$namein','$surnin','$emailin')";
              if ($resultss = $conn->query($query)) {
                $query = "SELECT id FROM teacher WHERE Name = '$namein' AND Surname = '$surnin'";
                if ($resultprin = $conn->query($query)) {
                  if ($row_cntprin = $resultprin->num_rows === 1 ) {
                    $rowprin = $resultprin->fetch_array(MYSQLI_ASSOC);
                    $id = $rowprin["id"];
                }
              }
            }
            else {
              echo $conn->error;
            }
          }
          }
        }
          $query="SELECT Type FROM admin WHERE id='$id'";
          if ($result = $conn->query($query)) {
            if ($row_cnt = $result->num_rows === 1 ) {
              $row = $result->fetch_array(MYSQLI_ASSOC);
              $_SESSION['Admin'] = $row['Type'];
          }
        }
      }
      else {
        $_SESSION['Am'] = $am;
        $_SESSION['category'] = "student";
        $query="SELECT id FROM student WHERE am='$am'";
        if ($results = $conn->query($query)) {
          if ($row_cnts = $results->num_rows === 1 ) {
            $rows = $results->fetch_array(MYSQLI_ASSOC);
            $query="SELECT Status FROM interest_project WHERE student_id='$rows[id]' AND (Status=6)";
            if ($resultss = $conn->query($query)) {
              if ($row_cntss = $resultss->num_rows === 1 ) {
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
                echo "false";
              }
            }
            else {
              echo "false";
            }
          }
          else {
            $namein = $fname;
            $surnin = $lname;
            $emailin = $row['Email'];
            $query = "INSERT INTO student(am, email, name, surname) VALUES ('$am','$email','$namein','$surnin')";
            if ($resultss = $conn->query($query)) {
              $query = "SELECT id FROM student WHERE Name = '$namein' AND Surname = '$surnin'";
              if ($resultprin = $conn->query($query)) {
                if ($row_cntprin = $resultprin->num_rows === 1 ) {
                  $rowprin = $resultprin->fetch_array(MYSQLI_ASSOC);
                  $id = $rowprin["id"];
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
      ////login_dummy telos
      if($rememberme == true) {
        $encodedemail = serialize( $email );
        $encodedemail = gzcompress( $encodedemail );
        $encodedemail = base64_encode( $encodedemail );
        $encodedpassword = serialize( $password );
        $encodedpassword = gzcompress( $encodedpassword );
        $encodedpassword = base64_encode( $encodedpassword );
        $params = session_get_cookie_params();
        setcookie("username",$encodedemail, strtotime( '+30 days' ), "/", $params["domain"], $params["secure"], true);
        setcookie("password",$encodedpassword, strtotime( '+30 days' ), "/", $params["domain"], $params["secure"], true);
      }
      else {
        if (isset($_COOKIE["username"])) {
          setcookie("username","", 1, "/");
        }
        if (isset($_COOKIE["password"])) {
          setcookie("password","", 1, "/");
        }
      }
      echo "true";
    }
    else {
      $query="SELECT * FROM login_secretariat WHERE Username='$email' AND Password='$password'";
      if ($result = $conn->query($query)) {
        if ($row_cnt = $result->num_rows === 1 ) {
          $row = $result->fetch_array(MYSQLI_ASSOC);
          $_SESSION['user'] = "Γραμματεία";
          $_SESSION['email'] = $email;
          $_SESSION['user'] = trim($_SESSION['user']);
          $_SESSION['category'] = "secretariat";
          $id = $row["id"];
          if($rememberme == true) {
            $encodedemail = serialize( $email );
            $encodedemail = gzcompress( $encodedemail );
            $encodedemail = base64_encode( $encodedemail );
            $encodedpassword = serialize( $password );
            $encodedpassword = gzcompress( $encodedpassword );
            $encodedpassword = base64_encode( $encodedpassword );
            $params = session_get_cookie_params();
            setcookie("username",$encodedemail, strtotime( '+30 days' ), "/", $params["domain"], $params["secure"], true);
            setcookie("password",$encodedpassword, strtotime( '+30 days' ), "/", $params["domain"], $params["secure"], true);
          }
          else {
            if (isset($_COOKIE["username"])) {
              setcookie("username","", 1, "/");
            }
            if (isset($_COOKIE["password"])) {
              setcookie("password","", 1, "/");
            }
          }
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
  }
  $conn->close();
}
?>
