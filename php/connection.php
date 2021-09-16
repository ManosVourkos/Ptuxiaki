<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname="essay";
/*$ldaphost = "ldaps://tripoli2.uop.gr";
$ldap_domain= "uop.gr";
$base_dn = "dc=uop,dc=gr";
$dn = "ou=people,dc=uop,dc=gr";
$ds=ldap_connect($ldaphost) or die ("Connection failed");
ldap_set_option($ds, LDAP_OPT_PROTOCOL_VERSION, 3);
ldap_set_option($ds, LDAP_OPT_REFERRALS, 0);
$bind_result = ldap_bind($ds, "uid=$username",$dn, $password);
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
// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if (!$conn->set_charset("utf8")) {
      printf("Error loading character set utf8: %s\n", $conn->error);
  }
?>
