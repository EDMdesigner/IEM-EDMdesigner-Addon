<?php
//ini_set('display_errors',1);
//ini_set('display_startup_errors',1);
//error_reporting(-1);

//var_dump($_GET);
//var_dump($_POST);
//var_dump($_FILES);

require_once dirname(__FILE__) . "/../../includes/config.php";

require_once dirname(__FILE__) . "/utils.php";

header("Content-type: application/json;charset=utf-8");

if (!isset($_FILES["file"])) {
	printError("File input is needed.");
}

//security check
$hash = $_REQUEST["hash"];
$time = $_REQUEST["time"];

if (!checkHookSecurity($hash, $time)) {
	printError("Security error.");
}



if ($_FILES["file"]["size"] > 5000000) {
	printError("File size is too large.");
}

if ($_FILES["file"]["error"] > 0) {
	printError("Upload error, error code: " . $_FILES["file"]["error"]);
}

if (file_exists("upload/" . $_FILES["file"]["name"])) {
	printError("File already exists.");
}
//$contentType = mime_content_type($_FILES["file"]);
//$finfo = new finfo(FILEINFO_MIME_TYPE);
$extension = "";
if(getImageType($_FILES["file"]["tmp_name"])) {
	$extension = "." . getImageType($_FILES["file"]["tmp_name"]);
}

$userId = null;

if($_GET["userId"] === "templater") {
	$userId = "templater";
} else {
	$userId = explode(" - ", $_GET["userId"]);
	$userId = $userId[1];
}

$dirName = dirname(dirname(dirname(__FILE__))) . "/temp/user/" . $userId;
if (!file_exists($dirName)) {
	mkdir($dirName, 0755, true);
}
$savedFileName = "img_" . rand(1,100000000);
move_uploaded_file($_FILES["file"]["tmp_name"], $dirName . "/" . $savedFileName . $extension);

echo "{\"url\": \"" . SENDSTUDIO_APPLICATION_URL . "/admin/temp/user/" . $userId . "/" . $savedFileName . $extension . "\"}";
?>
