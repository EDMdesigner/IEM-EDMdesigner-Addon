<?php
/**
 * This file contains the 'EDMdesigner' addon which implements the drag 'n drop editor from EDMdesigner.
 *
 * @package Interspire_Addons
 */
//error_reporting(E_ALL);

//ini_set('display_errors',1);
//ini_set('display_startup_errors',1);
//error_reporting(-1);

/**
 * Make sure the base Interspire_Addons class is defined.
 */
if (!class_exists("Interspire_Addons", false)) {
	require_once(dirname(dirname(__FILE__)) . "/interspire_addons.php");
}


require_once (dirname(__FILE__) . "/language/language.php");
require_once(dirname(__FILE__) . "/utils.php");


/**
 * This class handles the EDMdesigner.
 *
 * @uses Interspire_Addons
 * @uses Interspire_Addons_Exception
 */
class Addons_edmdesigner extends Interspire_Addons
{
	private $apiUrls = null;
	private $version = "1.0.0";

	private $userId = null;
	private $edmdSettings = null;

    public function Install() {
    	//*
        $tables = $sequences = array ();

        $this->db->StartTransaction ();

        require dirname ( __FILE__ ) . "/schema." . SENDSTUDIO_DATABASE_TYPE . ".php";
        foreach ( $queries as $query ) {
            $qry = str_replace ( '%%TABLEPREFIX%%', $this->db->TablePrefix, $query );
            $result = $this->db->Query ( $qry );
            if (! $result) {
                $this->db->RollbackTransaction ();
                throw new Interspire_Addons_Exception ( "There was a problem running query " . $qry . ": " . $this->db->GetErrorMsg (), Interspire_Addons_Exception::DatabaseError );
            }
        }

        $this->enabled = true;
        $this->configured = true;
        try {
            $status = parent::Install ();
        } catch ( Interspire_Addons_Exception $e ) {
            $this->db->RollbackTransaction ();
            throw new Exception ( "Unable to install addon {$this->GetId()} " . $e->getMessage () );
        }

        $this->db->CommitTransaction ();
        //*/

        return true;
    }

	public function UnInstall() {
		//*
		$tables = $sequences = array();

		$this->db->StartTransaction();

		try {
			$this->Disable();
		} catch (Interspire_Addons_Exception $e) {
			$this->db->RollbackTransaction();
			throw new Interspire_Addons_Exception($e->getMessage(), $e->getCode());
		}

		require dirname(__FILE__) . '/schema.' . SENDSTUDIO_DATABASE_TYPE . '.php';
		foreach ($tables as $tablename) {
			$query = 'DROP TABLE [|PREFIX|]' . $tablename . ' CASCADE';
			$result = $this->db->Query($query);
			if (!$result) {
				$this->db->RollbackTransaction();
				throw new Interspire_Addons_Exception("There was a problem running query " . $query . ": " . $this->db->GetErrorMsg(), Interspire_Addons_Exception::DatabaseError);
			}
		}

		foreach ($sequences as $sequencename) {
			$query = 'DROP SEQUENCE [|PREFIX|]' . $sequencename;
			$result = $this->db->Query($query);
			if (!$result) {
				$this->db->RollbackTransaction();
				throw new Interspire_Addons_Exception("There was a problem running query " . $query . ": " . $this->db->GetErrorMsg(), Interspire_Addons_Exception::DatabaseError);
			}
		}

        try {
			$status = parent::UnInstall();
		} catch (Interspire_Addons_Exception $e) {
			$this->db->RollbackTransaction();
			throw new Interspire_Addons_Exception($e->getMessage(), $e->getCode());
		}

		$this->db->CommitTransaction();
		//*/
		return true;
	}

	public function Upgrade($info) {
		$description = self::LoadDescription("edmdesigner");

		return $this->_Upgrade($description["addon_version"]);
	}

	static function RegisterAddonPermissions() {
		$description = self::LoadDescription("edmdesigner");
		$perms = array (
			"edmdesigner" => array (
				"addon_description" => GetLang("Addon_edmdesigner_Permissions_Header"),

				"managetemplates" => array(
					"name" => GetLang("Addon_edmdesigner_Permissions_Templates")
				),
				"managedefaulttemplates" => array(
					"name" => GetLang("Addon_edmdesigner_Permissions_BuiltInTemplates")
				),
				"managecampaigns" => array(
					"name" => GetLang("Addon_edmdesigner_Permissions_Campaigns")
				),
				"token" => array(
					"name" => GetLang("Addon_edmdesigner_Permissions_Token") 
				),
				"settings" => array(
					"name" => GetLang("Addon_edmdesigner_Permissions_Settings")
				)
			)
		);
		self::RegisterAddonPermission($perms);
	}

	//*

	private function _createAdminToken($publicId, $magic) {
		// handshake
		$ip = $_SERVER["REMOTE_ADDR"];
		$timestamp = time();
		$hash = md5($publicId . $ip . $timestamp . $magic);
		$data = array(
				"id"	=> $publicId,
				"uid"	=> "admin",
				"ip"	=> $ip,
				"ts"	=> $timestamp,
				"hash"	=> $hash
		);
		$tokenResult = json_decode(sendPostRequest("/api/token", $data), true);

		return $tokenResult;
	}

	private function createAdminToken() {
		$publicId = $this->settings["EDMdesignerApiKey"];
		$magic = $this->settings["EDMdesignerMagic"];

		return $this->_createAdminToken($publicId, $magic);
	}

	//*
	private function registerUserToEDMdesigner($edmdUsername) {
		$adminToken = $this->createAdminToken();
		$adminToken = $adminToken["token"];

		$createUserUrl = "/json/user/create?token=" . $adminToken . "&user=admin";


		$user = IEM::getCurrentUser(); //GetUser();

		$result = json_decode(sendPostRequest($createUserUrl, array(
			"id" => $this->application_url . " - " . $edmdUsername,
			"customData" => array(
				"userName" => $user->username,
				"fullName" => $user->fullname,
				"email" => $user->emailaddress
			)
		)), true);

		$edmdUserId = $result["id"];

		return $edmdUserId;
	}

	private function registerActUserIfNeeded() {
		$user = IEM::getCurrentUser(); //GetUser();
		$this->userId = $user->userid;
		$edmdUserSettings = $user->GetSettings("EDMdesignerSettings");

		if (!isset($edmdUserSettings["EDMdesignerSettings"]) || !is_array($edmdUserSettings["EDMdesignerSettings"])) {
			$edmdUserSettings["EDMdesignerSettings"] = array();
		}

		$registered = false;

		if (isset($edmdUserSettings["registered"])) {
			if (strcmp($edmdUserSettings["registered"], "yes") == 0) {
				$registered = true;
			}
		}

		if (!$registered) {
			$this->registerUserToEDMdesigner($this->userId);

			$edmdUserSettings["registered"] = "yes";

			$user->SetSettings("EDMdesignerSettings", $edmdUserSettings);
			$user->SaveSettings();
		}
	}
	//*/

	public function Configure() {
		$user = IEM::getCurrentUser(); //GetUser();
		if (!$user->HasAccess("edmdesigner", "settings")) {
			return;
		}

		$settings = $this->GetSettings();
        $this->edmdSettings = $settings;

		//$this->registerActUserIfNeeded();

		foreach ($this->settings as $k => $v) {
			$this->template_system->Assign($k, $v);
		}

		$this->template_system->Assign("SettingsUrl", $this->settings_url, false);
		$this->template_system->Assign("ApplicationUrl", $this->application_url, false);

        $this->template_system->Assign("EDMdesignerApiKey", $settings["EDMdesignerApiKey"]);
        $this->template_system->Assign("EDMdesignerMagic", $settings["EDMdesignerMagic"]);
        $this->template_system->Assign("EDMdesignerLang", $settings["EDMdesignerLang"]);
        $this->template_system->Assign("EDMdesignerHost", $settings["EDMdesignerHost"]);
        $this->template_system->Assign("EDMdesignerSpamCheck", $settings["EDMdesignerSpamCheck"]);
        $this->template_system->Assign("EDMdesignerAutoSave", $settings["EDMdesignerAutoSave"]);

        $this->template_system->Assign("userId", $this->application_url . " - " . $this->userId);

		return $this->template_system->ParseTemplate("settings", true);
	}

	public function SaveSettings() {
		$user = IEM::getCurrentUser(); //GetUser();
		if (!$user->HasAccess("edmdesigner", "settings")) {
			return;
		}

        $settings = array();
        $settings["EDMdesignerApiKey"] = $_POST["EDMdesignerApiKey"];
        $settings["EDMdesignerMagic"] = $_POST["EDMdesignerMagic"];
        $settings["EDMdesignerLang"] = $_POST["EDMdesignerLang"];
        $settings["EDMdesignerSpamCheck"] = $_POST["EDMdesignerSpamCheck"];
        $settings["EDMdesignerAutoSave"] = $_POST["EDMdesignerAutoSave"];


		if (empty($settings)) {
			return false;
		}


		$adminToken = $this->_createAdminToken($settings["EDMdesignerApiKey"], $settings["EDMdesignerMagic"]);
		$adminToken = $adminToken["token"];

		//configure gallery
		$addonBaseDirectory = substr($this->template_url, 0, -11);

		$galleryConfig = array(
        	"uploadRoute" => $addonBaseDirectory . "/UploadImage.php",
        	"deleteRoute" => $addonBaseDirectory . "/DeleteImage.php"
        );

        sendPostRequest("/json/gallery/config?token=" . $adminToken . "&user=admin", $galleryConfig);

        //configure dynamic content
        $postData = array(
        	"customStringButtons" => array(
        		"Interspire_texteditor_button_for_dynamic_content" => array(
	        		"label" => array(
	        			"en" => "Dynamic Content..."
	        		),
	        		"action" => "setDynamicContent"
        		)
        	)
        );

        sendPostRequest("/json_v" . $this->version . "/apiKey/" . $settings["EDMdesignerApiKey"] . "/customStringButtons?user=admin&token=" . $adminToken, $postData);

		return self::SetSettings($settings);
	}

	public static function SetSettings($settings) {
		$db = IEM::getDatabase();
		if (!$db) {
			return false;
		}

		$id = str_replace('Addons_', '', __CLASS__);


		$result = $db->Query("UPDATE [|PREFIX|]addons SET configured=1, settings='" . $db->Quote(serialize($settings)) . "' WHERE addon_id='{$id}'");
		return (bool)$result;
	}

	public static function GetSettings() {
		$db = IEM::getDatabase();
		if (!$db) {
			return array();
		}

		$id = str_replace('Addons_', '', __CLASS__);
		$settings = $db->FetchOne("SELECT settings FROM [|PREFIX|]addons WHERE addon_id='{$id}'");
		if (!$settings) {
			return array();
		}
		return unserialize($settings);
	}

	function GetEventListeners() {
		$listeners = array();
		$user = IEM::getCurrentUser(); //GetUser();

		$my_file = '{%IEM_ADDONS_PATH%}/edmdesigner/edmdesigner.php';
			
		//if ($user->HasAccess('edmdesigner', 'settings'))
		//{
			//*
			$listeners[] = array (
				'eventname' => 'IEM_SENDSTUDIOFUNCTIONS_GENERATETEXTMENULINKS',
				'trigger_details' => array (
					'Addons_edmdesigner',
					'GetTextMenuItems'
				),
				'trigger_file' => $my_file
			);
			//*/

			$listeners[] = array (
				'eventname' => 'IEM_SENDSTUDIOFUNCTIONS_GENERATEMENULINKS',
				'trigger_details' => array (
					'Addons_edmdesigner',
					'SetMenuItems',
				),
				'trigger_file' => $my_file
			);
		//}
		return $listeners;
	}

	static function GetTextMenuItems(EventData_IEM_SENDSTUDIOFUNCTIONS_GENERATETEXTMENULINKS $data)
	{
		$user = IEM::getCurrentUser(); //GetUser();

		try {
			$me = new self;
			$me->Load();
		} catch (Exception $e) {
			return;
		}

		if (!$me->enabled) {
			return;
		}

		if (!isset($data->data["templates"])) {
			$data->data["templates"] = array();
		}


		if ($user->HasAccess("edmdesigner", "ManageTemplates")) {
			array_unshift($data->data["templates"], array (
				"text" => GetLang("Addon_edmdesigner_Menu_ManageTemplates"),
	            "link" => $me->admin_url . "&Action=ManageTemplates",
				"description" => GetLang("Addon_edmdesigner_Menu_Description"),
				"show" => array (
					"CheckAccess" => "HasAccess",
					"Permissions" => array("edmdesigner", "ManageTemplates")
				)
			));	
		}

		if ($user->HasAccess("edmdesigner", "ManageDefaultTemplates")) {
			array_unshift($data->data["templates"], array (
				"text" => GetLang("Addon_edmdesigner_Menu_Text"),
	            "link" => $me->admin_url . "&Action=ManageDefaultTemplates",
				"description" => GetLang("Addon_edmdesigner_Menu_Description"),
				"show" => array (
					"CheckAccess" => "HasAccess",
					"Permissions" => array("edmdesigner", "ManageDefaultTemplates")
				)
			));
		}

		unset($me);
	}

	static function SetMenuItems(EventData_IEM_SENDSTUDIOFUNCTIONS_GENERATEMENULINKS $data)
	{
		$self = new self;
		$user = IEM::getCurrentUser(); //GetUser();

		if (!isset($data->data["newsletter_button"])) {
			$data->data["newsletter_button"] = array();
		}

		//if ($user->HasAccess("edmdesigner", "ManageCampaigns")) {
			array_unshift($data->data["newsletter_button"], array (
				"text" => GetLang("Addon_edmdesigner_Menu_ManageCampaigns"),
				"link" => $self->admin_url . "&Action=ManageCampaigns",
				"image" => "../addons/edmdesigner/images/m_edmdesigner.gif",
				"show" => array (
					"CheckAccess" => "HasAccess",
					"Permissions" => array("edmdesigner", "ManageCampaigns")
				),
				"description" => GetLang("Addon_edmdesigner_Menu_EDMdesigner_Description")
			));
		//}
	}

	private function renderTemplate($templateName, $templaterUser, $campaignMode) {
		//if (!$templaterUser) {
		//	$this->registerActUserIfNeeded();
		//}
		$user = IEM::getCurrentUser(); //GetUser();
		$this->userId = $user->userid;

		$flashMessages = GetFlashMessages();
		$userId = $this->userId;


		$this->registerUserToEDMdesigner($userId);

		if ($templaterUser) {
			$userId = "templater";
		} else {
			$userId = $this->application_url . " - " . $userId;
		}

		if ($campaignMode) {
			$campaignMode = "yes";
		} else {
			$campaignMode = "no";
		}

		$settings = $this->GetSettings();
		//$this->configureCustomStrings($settings["EDMdesignerApiKey"], $settings["EDMdesignerMagic"]);

		$this->template_system->Assign("FlashMessages", $flashMessages, false);
		$this->template_system->Assign("AdminUrl", $this->admin_url, false);
		$this->template_system->Assign("AddonBaseDirectory", substr($this->template_url, 0, -11), false);
		$this->template_system->Assign("TemplateUrl", $this->template_url, false);
		$this->template_system->Assign("URL", $this->url, false);


		$this->template_system->Assign("TokenUrl", urlencode($this->admin_url . "&Action=Token&Ajax=true"));

		$this->template_system->Assign("UserId", $userId, false);
		$this->template_system->Assign("interspireUserId", str_replace(".","-",trim($user->username)).'-'.$user->userid, false);
		$this->template_system->Assign("FromEmail", $user->emailaddress, false);

		$this->template_system->Assign("CampaignMode", $campaignMode, false);
		$this->template_system->Assign("LangCode", $settings["EDMdesignerLang"], false);
		$this->template_system->Assign("EDMdesignerSpamCheck", $settings["EDMdesignerSpamCheck"], false);
		$this->template_system->Assign("EDMdesignerAutoSave", $settings["EDMdesignerAutoSave"], false);
		$this->template_system->Assign("ImageMaxWidth", SENDSTUDIO_MAX_IMAGEWIDTH, false);

		$this->template_system->ParseTemplate($templateName);
	}

	public function Admin_Action_Default() {
		$this->renderTemplate("default");
	}

	public function Admin_Action_ManageCampaigns() {
		$user = IEM::getCurrentUser(); //GetUser();
		//if (!$user->HasAccess("edmdesigner", "ManageCampaigns")) {
		//	return;
		//}

		$this->renderTemplate("template_manager", false, true);
	}

	public function Admin_Action_ManageTemplates() {
		$user = IEM::getCurrentUser(); //GetUser();
		if (!$user->HasAccess("edmdesigner", "ManageTemplates")) {
			return;
		}

		$this->renderTemplate("template_manager", false, false);
	}

	public function Admin_Action_ManageDefaultTemplates() {
		$user = IEM::getCurrentUser(); //GetUser();

		/*
		if (!$user->Admin()) {
			return;
		}
		*/

		if (!$user->HasAccess("edmdesigner", "ManageDefaultTemplates")) {
			return;
		}

		$this->renderTemplate("template_manager", true, false);
	}

	private function printError($msg) {
		print "{\"err\": \"" . $msg . "\"}";
		exit;
	}

	private function _checkUserId($userId) {
		$postUser = explode(" - ", $userId);

		if (!$postUser) {
			$this->printError("Problem with userId. 0");
		}

		if (count($postUser) < 1) {
			$this->printError("Problem with userId. 1");
		}

		if (count($postUser) < 2) {
			if ($postUser[0] != "templater") {
				$this->printError("Problem with userId. 2");
			}

			return "templater";
		} else {
			$user = IEM::getCurrentUser(); //GetUser();

			if ($user->userid != intval($postUser[1])) {
				$this->printError("Problem with the userId. 3 --- " . $user->userid . " != " . intval($postUser[1]));
			}

			return $user->userid;
		}
	}

	private function checkUserId($userId = null) {
		if ($userId != null) {
			$this->_checkUserId($userId);
			return;
		}

		if (!isset($_REQUEST["userId"])) {
			$this->printError("userId is missing.");
		}

		$this->_checkUserId($_REQUEST["userId"]);
	}

	//The following three functions should be called with &Ajax=true
	public function Admin_Action_Token() {
		header("Content-type: application/json;charset=utf-8");

		$this->checkUserId();

		$settings = getApiKeyAndMagic();

		$publicId = $settings["EDMdesignerApiKey"];
		$magic = $settings["EDMdesignerMagic"];

		$ip = $_SERVER["REMOTE_ADDR"];
		$timestamp = time();

		$hash = md5($publicId . $ip . $timestamp . $magic);

		$data = array(
					"id"	=> $publicId,
					"uid"	=> $_REQUEST["userId"],
					"ip"	=> $ip,
					"ts"	=> $timestamp,
					"hash"	=> $hash
		);

		$tokenResult = sendPostRequest("/api/token", $data);

		print($tokenResult);
	}

	public function Admin_Action_Test() {
		echo ini_get("allow_url_fopen");

		ini_set("allow_url_fopen", 1);

		echo ini_get("allow_url_fopen");

		echo "\nPHP version: \n";

		echo phpversion();
	}
}