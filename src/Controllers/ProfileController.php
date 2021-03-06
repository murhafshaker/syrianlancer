<?php 
session_start();
include 'dbh.php';

if(isset($_GET['fid']))
    $fid=$_GET['fid'];
else if(isset($_POST['fid']))
    $fid=$_POST['fid'];

if($fid==1){
    loadUser();
}
if($fid==2){
    editUser();
}

function loadUser() {
    global $conn;

    $id;
    if(isset($_GET['id']))
        $id = $_GET['id'];
    else
        $id = $_SESSION['userID'];

    if(!$conn)
    {
        die("Connection Failed: " . mysqli_connect_error());
    }
    else{
        $sql = 'select users.id, first_name, last_name, gender, birth_date, about_me, main_focus, isfreelancer, image, country_id, countries.name as country 
        from users, countries
        where users.id='. $id .
        ' and countries.id = users.country_id';
        $result = mysqli_query($conn,$sql);
        $arr = array() ;
        
        if(mysqli_num_rows($result)>0)
        {
            while($row = mysqli_fetch_assoc($result) )
            {
                $arr=$row;
            }
        }
        if(isset($_SESSION['userID']))
        {
            if($_SESSION['userID'] == $id)
                $arr['owner']=1;
            else
                $arr['owner']=0;
        }

        echo json_encode($arr);
    }
    mysqli_close($conn);
}


function editUser() {
    global $conn;
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $birthDate = $_POST['birth_date'];
    $gender = $_POST['gender'];
    $country_id = $_POST['countryID'];
    $main_focus = $_POST['main_focus'];
    $isfreelancer = $_POST['isfreelancer'];

    if(isset($_POST['newPassword']))
        $newPassword = $_POST['newPassword'];

    if(isset($_POST['currentPassword']))
        $currentPassword = $_POST['currentPassword'];

    if(!$conn){
        die("Connection Failed: " . mysqli_connect_error());
    }
    else{
        $arr = array();
        if(isset($_POST['currentPassword'])){
            $sql='select password from users where id='.$_SESSION['userID'];
            $stmt=mysqli_stmt_init($conn);
            if(!mysqli_stmt_prepare($stmt,$sql)){
                die("Connection Failed: " . mysqli_connect_error());
            }
            else {
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);
                if($row = mysqli_fetch_assoc($result)){
                    $pwdcheck=password_verify($currentPassword,$row['password']);

                    if($pwdcheck == false)
                    {
                        $arr['failure'] = "1";
                        echo json_encode($arr);
                    }
                    else if($pwdcheck == true) {
                        $sql = "UPDATE users
                        SET first_name = ?, last_name = ?, password = ?, gender = ?, birth_date = ?, updated_at = ?, country_id = ?, main_focus = ?, isfreelancer = ?
                        WHERE id = ". $_SESSION['userID'];
                        $stmt = mysqli_stmt_init($conn);
                        if (!mysqli_stmt_prepare($stmt, $sql)) {
                            die("Connection Failed: " . $stmt->error);
                        } else {
                        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
                        $dateNow=date("Y-m-d H:i:s");
                        mysqli_stmt_bind_param($stmt, "sssssssisi", $firstName, $lastName, $hashedPassword, $gender, $birthDate, $dateNow, $country_id, $main_focus, $isfreelancer);
                        mysqli_stmt_execute($stmt);
                        $arr['success'] = '1';
                        echo json_encode($arr);
                        }
                    }
                }
                mysqli_stmt_close($stmt);
            }
        }
        else {
            $sql = "UPDATE users SET first_name = ?, last_name = ?, gender = ?, birth_date = ?, updated_at = ?, country_id = ?, main_focus = ?, isfreelancer = ? WHERE id = ". $_SESSION['userID'];
            $stmt = mysqli_stmt_init($conn);
            if (!mysqli_stmt_prepare($stmt, $sql)) {
                die("Connection Failed: " . $stmt->error);
            } else {
            $dateNow=date("Y-m-d H:i:s");
            mysqli_stmt_bind_param($stmt, "ssssssisi", $firstName, $lastName, $gender, $birthDate, $dateNow, $country_id, $main_focus, $isfreelancer);
            mysqli_stmt_execute($stmt) or die($stmt->error);
            $arr['success'] = '1';
            echo json_encode($arr);
            }
            mysqli_stmt_close($stmt);
        }
    }
    mysqli_close($conn);
}
?>