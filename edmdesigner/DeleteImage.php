<?php

//ini_set('display_errors',1);
//ini_set('display_startup_errors',1);
//error_reporting(-1);

require_once dirname(__FILE__) . "/../../includes/config.php";

require_once dirname(__FILE__) . "/utils.php";


header("Content-type: application/json;charset=utf-8");

function printError($err) {
	print '{"err": ' . $err . '}';
	exit(1);
}

$json = file_get_contents("php://input");
$values = json_decode($json, true);

if($values == null) {
	printError("Null " . $json);
}

if (!isset($values["url"]) || !isset($values["userId"])) {
	printError("Could not delete resource. 0");
}

$hash = $values["hash"];
$time = $values["time"];

if (!checkHookSecurity($hash, $time)) {
	printError("Security error.");
}

$count = 0;
$path = str_replace(SENDSTUDIO_APPLICATION_URL . "/admin", "", $values["url"], $count);

$path = dirname(__FILE__) . "/../../" . $path;

if ($count == 1) {
	if (unlink($path)) {
		echo "{\"success\": true}";
	} else {
		printError("Could not delete resource. 1");
	}
} else {
	http_response_code(404);
}

?>
