<?php
header("Content-Type: application/json");
require_once dirname(__FILE__) . "/../../includes/config.php";

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

function printError($err) {
	print '{"err": ' . $err . '}';
	exit(1);
}

function printSuccess() {
	print '{"success": true}';
}

function checkRequestField($fieldName) {
	if (!isset($_REQUEST[$fieldName])) {
		printError("The following field is mandatory for request:" . $fieldName);
	}
}

function getPDOConnection() {
	$db = null;

	$dbConnectionInfo = array(
		"type"		=> SENDSTUDIO_DATABASE_TYPE,
	    "host"		=> SENDSTUDIO_DATABASE_HOST,
	    "dbname"	=> SENDSTUDIO_DATABASE_NAME,
	    "dbuser"	=> SENDSTUDIO_DATABASE_USER,
	    "dbpass"	=> SENDSTUDIO_DATABASE_PASS
	);


	if (!isset($dbConnectionInfo["type"]))
		throw new Exception("Database type is not set");

	$dsn = $dbConnectionInfo["type"] . ":";


	if (!isset($dbConnectionInfo["dbname"]))
		throw new Exception("Wrong database name");

	$dsn .= "dbname=" . $dbConnectionInfo["dbname"] . ";";


	if (!isset($dbConnectionInfo["host"]))
		throw new Exception("Wrong database host");

	$host = $dbConnectionInfo["host"];
    if (strrpos($host, ":") !== false) {
        $host = explode(":", $host);
        $dsn .= "host=" . $host[0] . ";";
        $dsn .= "port=" . $host[1];
    } else {
        $dsn .= "host=" . $host;
    }


	if (!isset($dbConnectionInfo["dbuser"]))
		throw new Exception("Wrong database user name");

	if (!isset($dbConnectionInfo["dbpass"]))
		throw new Exception("Wrong database user password");


	$db = new PDO($dsn, $dbConnectionInfo["dbuser"], $dbConnectionInfo["dbpass"], array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));

	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	return $db;
}


function insertCampaign() {
	checkRequestField("name");
	checkRequestField("subject");
	checkRequestField("text_body");
	checkRequestField("html_body");
	checkRequestField("user_id");


	try {
		$db = getPDOConnection();

		$queryString = "INSERT INTO " . SENDSTUDIO_TABLEPREFIX . "newsletters";
		$queryString .= " (name, format, subject, textbody, htmlbody, createdate, active, archive, ownerid)";
		$queryString .= " VALUES (:name, 'b', :subject, :textBody, :htmlBody, :createdate, 1, 1, :ownerid)";

		$stmt = $db->prepare($queryString);


		$name		= $_REQUEST["name"];
		$subject	= $_REQUEST["subject"];
		$htmlBody	= $_REQUEST["html_body"];
		$textBody	= $_REQUEST["text_body"];
		$createdate	= time();
		$ownerid	= $_REQUEST["user_id"];

		if (get_magic_quotes_gpc()) {
			//old php, magic quotes is on...
			$htmlBody = stripslashes($htmlBody);
		}

		$stmt->bindParam(":name", $name, PDO::PARAM_STR);
		$stmt->bindParam(":subject", $subject, PDO::PARAM_STR);
		$stmt->bindParam(":textBody", $textBody, PDO::PARAM_STR);
		$stmt->bindParam(":htmlBody", $htmlBody, PDO::PARAM_STR);
		$stmt->bindParam(":createdate", $createdate, PDO::PARAM_INT);
		$stmt->bindParam(":ownerid", $ownerid, PDO::PARAM_INT);

		if (!$stmt->execute()) {
			printError("Db error.");
		}

		print '{"_id": ' . $db->lastInsertId() . '}';
	} catch (PDOException $ex) {
	    printError("Connection failed " . $ex->getMessage());
	}
}


function updateCampaign() {
	checkRequestField("id");
	checkRequestField("name");
	checkRequestField("subject");
	checkRequestField("html_body");

	try {
		$db = getPDOConnection();

		$queryString = "UPDATE " . SENDSTUDIO_TABLEPREFIX . "newsletters SET ";
		$queryString .= "name = :name, ";
		$queryString .= "subject = :subject, ";
		$queryString .= "htmlbody = :htmlBody ";
		$queryString .= "WHERE newsletterid = :id";

		$stmt = $db->prepare($queryString);

		$htmlBody = $_REQUEST["html_body"];
		if (get_magic_quotes_gpc()) {
			//old php, magic quotes is on...
			$htmlBody = stripslashes($htmlBody);
		}


		$stmt->bindParam(":id", $_REQUEST["id"], PDO::PARAM_INT);
		$stmt->bindParam(":name", $_REQUEST["name"], PDO::PARAM_STR);
		$stmt->bindParam(":subject", $_REQUEST["subject"], PDO::PARAM_STR);
		$stmt->bindParam(":htmlBody", $htmlBody, PDO::PARAM_STR);

		if (!$stmt->execute()) {
			printError("Db error.");
		} else {
			printSuccess();
		}
	} catch (PDOException $ex) {
	    printError("Connection failed " . $ex->getMessage());
	}
}

function deleteCampaign() {
	checkRequestField("id");

	try {
		$db = getPDOConnection();

		$queryString = "DELETE FROM " . SENDSTUDIO_TABLEPREFIX . "newsletters ";
		$queryString .= "WHERE newsletterid = :id";

		$stmt = $db->prepare($queryString);
		$stmt->bindParam(":id", $_REQUEST["id"], PDO::PARAM_INT);

		if (!$stmt->execute()) {
			printError("Db error.");
		} else {
			printSuccess();
		}
	} catch (PDOException $ex) {
		printError("Connection failed " . $ex->getMessage());
	}
}


function setCampaignActivated($active) {
	checkRequestField("id");

	try {
		$db = getPDOConnection();

		$queryString = "UPDATE " . SENDSTUDIO_TABLEPREFIX . "newsletters SET ";
		$queryString .= "active = :active ";
		$queryString .= "WHERE newsletterid = :id";

		$stmt = $db->prepare($queryString);

		$stmt->bindParam(":id", $_REQUEST["id"], PDO::PARAM_INT);
		$stmt->bindParam(":active", $active, PDO::PARAM_INT);

		if (!$stmt->execute()) {
			printError("Db error.");
		} else {
			printSuccess();
		}
	} catch (PDOException $ex) {
	    printError("Connection failed " . $ex->getMessage());
	}
}

function setCampaignArchivated($archive) {
	checkRequestField("id");

	try {
		$db = getPDOConnection();

		$queryString = "UPDATE " . SENDSTUDIO_TABLEPREFIX . "newsletters SET ";
		$queryString .= "archive = :archive ";
		$queryString .= "WHERE newsletterid = :id";

		$stmt = $db->prepare($queryString);

		$stmt->bindParam(":id", $_REQUEST["id"], PDO::PARAM_INT);
		$stmt->bindParam(":archive", $archive, PDO::PARAM_INT);

		if (!$stmt->execute()) {
			printError("Db error.");
		} else {
			printSuccess();
		}
	} catch (PDOException $ex) {
	    printError("Connection failed " . $ex->getMessage());
	}
}

function setTextBody() {
	checkRequestField("id");
	checkRequestField("textBody");

	try {
		$db = getPDOConnection();

		$queryString = "UPDATE " . SENDSTUDIO_TABLEPREFIX . "newsletters SET ";
		$queryString .= "textbody = :textBody ";
		$queryString .= "WHERE newsletterid = :id";

		$stmt = $db->prepare($queryString);

		$stmt->bindParam(":id", $_REQUEST["id"], PDO::PARAM_INT);
		$stmt->bindParam(":textBody", $_REQUEST["textBody"], PDO::PARAM_STR);

		if (!$stmt->execute()) {
			printError("Db error.");
		} else {
			printSuccess();
		}
	} catch (PDOException $ex) {
	    printError("Connection failed " . $ex->getMessage());
	}
}

function getTextBody() {
	checkRequestField("id");

	try {
		$db = getPDOConnection();

		$queryString = "SELECT textbody FROM " . SENDSTUDIO_TABLEPREFIX . "newsletters WHERE newsletterid = :id";

		$stmt = $db->prepare($queryString);

		$stmt->bindParam(":id", $_REQUEST["id"], PDO::PARAM_INT);

		if (!$stmt->execute()) {
			printError("Db error.");
		} else {
			$result = $stmt->fetch(PDO::FETCH_ASSOC);

			print($result["textbody"]);
		}
	} catch (PDOException $ex) {
	    printError("Connection failed " . $ex->getMessage());
	}
}


if (!isset($_REQUEST["action"])) {
	printError("No action!");
}

if ($_REQUEST["action"] == "insert") {
	insertCampaign();
} else if ($_REQUEST["action"] == "update") {
	updateCampaign();
} else if ($_REQUEST["action"] == "delete") {
	deleteCampaign();
} else if ($_REQUEST["action"] == "activate") {
	setCampaignActivated(1);
} else if ($_REQUEST["action"] == "deactivate") {
	setCampaignActivated(0);
} else if ($_REQUEST["action"] == "archivate") {
	setCampaignArchivated(1);
} else if ($_REQUEST["action"] == "dearchivate") {
	setCampaignArchivated(0);
} else if ($_REQUEST["action"] == "getTextBody") {
	getTextBody();
} else if ($_REQUEST["action"] == "setTextBody") {
	setTextBody();
} else {
	printError("Unknown action!");
}

?>
