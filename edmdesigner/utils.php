<?php
require_once dirname(__FILE__) . "/../../includes/config.php";


//ini_set("allow_url_fopen", true);

//error_reporting(E_ALL);

//ini_set('display_errors',1);
//ini_set('display_startup_errors',1);

function printError($msg) {
    print "{\"err\": \"" . $msg . "\"}";
    exit;
}

function sendPostRequest($url, $data) {
    static $apis = array(
        "https://api-a.edmdesigner.com",
        "https://api-b.edmdesigner.com",
        "https://api-c.edmdesigner.com"
    );

    static $activeApiIdx = 0;

	$options = array(
	    "http" => array(
	        "header"  => "Content-type: application/x-www-form-urlencoded\r\n",
	        "method"  => "POST",
	        "content" => http_build_query($data),
	    )
	);

    $route = $apis[$activeApiIdx] . $url;

	$context  = stream_context_create($options);
	$result = file_get_contents($route, false, $context);
	$response = parse_http_response_header($http_response_header);

	$statusCode = $response[0]["status"]["code"];


	if($statusCode === 200) {
		return $result;
	} else if ($activeApiIdx < count($apis)) {
        $activeApiIdx++;
        return sendPostRequest($url, $data);	
	} else {
        die(print($statusCode));
    }
}

function parse_http_response_header(array $headers) {
    $responses = array();
    $buffer = NULL;
    foreach ($headers as $header)
    {
        if ("HTTP/" === substr($header, 0, 5))
        {
            // add buffer on top of all responses
            if ($buffer) array_unshift($responses, $buffer);
            $buffer = array();

            list($version, $code, $phrase) = explode(" ", $header, 3) + array("", FALSE, "");

            $buffer["status"] = array(
                "line" => $header,
                "version" => $version,
                "code" => (int) $code,
                "phrase" => $phrase
            );
            $fields = &$buffer["fields"];
            $fields = array();
            continue;
        }
        list($name, $value) = explode(": ", $header, 2) + array("", "");
        // header-names are case insensitive
        $name = strtoupper($name);
        // values of multiple fields with the same name are normalized into
        // a comma separated list (HTTP/1.0+1.1)
        if (isset($fields[$name]))
        {
            $value = $fields[$name].",".$value;
        }
        $fields[$name] = $value;
    }
    unset($fields); // remove reference
    array_unshift($responses, $buffer);

    return $responses;
}

function getImageType($path) {
    $mimeType = false;
    $contentType = false;
    if(function_exists("mime_content_type")) {
        $mimeType = mime_content_type($path);
    } else if(function_exists("finfo_open")) {
        $finfo = finfo_open(FILEINFO_MIME);
        $mimeType = finfo_file(finfo, $path);
        finfo_close($finfo);
    } else if(function_exists("getimagesize")) {
        $info = getimagesize($path);
        if($info) {
            $mimeType = $info["mime"];
        }
    }

    if($mimeType) {
        $splitted = explode("/", $mimeType);
        $contentType = $splitted[1];
    }

    return $contentType;
}

function getApiKeyAndMagic() {
    $db = null;
    $dbTablePrefix = SENDSTUDIO_TABLEPREFIX;

    $dbConnectionInfo = array(
        "type" => SENDSTUDIO_DATABASE_TYPE,
        "host" => SENDSTUDIO_DATABASE_HOST,
        "dbname" => SENDSTUDIO_DATABASE_NAME,
        "dbuser" => SENDSTUDIO_DATABASE_USER,
        "dbpass" => SENDSTUDIO_DATABASE_PASS
    );

    

    if (!isset($dbConnectionInfo["type"]))
        throw new Exception("Database type is not set");
    
    $dsn = $dbConnectionInfo["type"] . ":";


    if (!isset($dbConnectionInfo['dbname']))
        throw new Exception("Wrong database name");

    $dsn .= 'dbname='.$dbConnectionInfo['dbname'].';';


    if (!isset($dbConnectionInfo['host']))
        throw new Exception("Wrong database host");

    $host = $dbConnectionInfo["host"];
    if (strrpos($host, ":") !== false) {
        $host = explode(":", $host);
        $dsn .= "host=" . $host[0] . ";";
        $dsn .= "port=" . $host[1];
    } else {
        $dsn .= "host=" . $host;
    }


    if (!isset($dbConnectionInfo['dbuser']))
        throw new Exception("Wrong database user name");

    if (!isset($dbConnectionInfo['dbpass']))
        throw new Exception("Wrong database user password");


    try {
        $db = new PDO($dsn, $dbConnectionInfo['dbuser'], $dbConnectionInfo['dbpass']);
    } catch (PDOException $ex){
        throw new Exception("Connection failed " . $ex->getMessage());
    }

    $groupsQuery = 'SELECT settings FROM `'. $dbTablePrefix .'addons` WHERE addon_id = \'edmdesigner\'';


    $settings = null;
    $stmt = $db->prepare( $groupsQuery );
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if ( $row['settings'] ) {
        $settings = unserialize( $row['settings'] );
    } else {
        $settings = array();
    }

    return array(
        "EDMdesignerApiKey" => $settings["EDMdesignerApiKey"],
        "EDMdesignerMagic"  => $settings["EDMdesignerMagic"]
    );
}

function checkHookSecurity($hash, $time) {
    $magic = getApiKeyAndMagic();
    $magic = $magic["EDMdesignerMagic"];

    return strcmp(md5($time . $magic), $hash) == 0;
}
?>