<?php
/**
 * This is the language file for the 'EDMdesigner' addon.
 *
 * @package Interspire_Addons
 * @subpackage Addons_edmdesigner
 */

define("LNG_Addon_edmdesigner_Menu_ManageCampaigns", "Reszponzív kampányok kezelése");
define("LNG_Addon_edmdesigner_Menu_NewCampaign", "Új reszponzív kampány");
define("LNG_Addon_edmdesigner_Menu_ManageTemplates", "Reszponzív sablonok kezelése");
define("LNG_Addon_edmdesigner_Menu_NewTemplate", "Új reszponzív sablon");




//l10n projectListVM
define("LNG_Addon_edmdesigner_projectListVM_Title-Templates", "Sablonok");
define("LNG_Addon_edmdesigner_projectListVM_Title-BuiltInTemplates", "Beépített sablonok");
define("LNG_Addon_edmdesigner_projectListVM_Title-Campaigns", "Kampányok");

define("LNG_Addon_edmdesigner_projectListVM_NewProject-Template", "Új sablon");
define("LNG_Addon_edmdesigner_projectListVM_NewProject-BuiltInTemplate", "Új beépített sablon");
define("LNG_Addon_edmdesigner_projectListVM_NewProject-Campaign", "Új kamány");

define("LNG_Addon_edmdesigner_projectListVM_Headings_Title", "Cím");
define("LNG_Addon_edmdesigner_projectListVM_Headings_Category", "Kategória");
define("LNG_Addon_edmdesigner_projectListVM_Headings_Subject", "Tárgy");
define("LNG_Addon_edmdesigner_projectListVM_Headings_Active", "Aktív");
define("LNG_Addon_edmdesigner_projectListVM_Headings_Archive", "Archív");
define("LNG_Addon_edmdesigner_projectListVM_Headings_CreatedAt", "Létrehozva");
define("LNG_Addon_edmdesigner_projectListVM_Headings_ModifiedAt", "Módosítva");
define("LNG_Addon_edmdesigner_projectListVM_Headings_Actions", "Műveletek");

define("LNG_Addon_edmdesigner_projectListVM_Actions_Open", "Szerkesztés");
define("LNG_Addon_edmdesigner_projectListVM_Actions_EditCampaignInfo", "Kamány info");
define("LNG_Addon_edmdesigner_projectListVM_Actions_SendCampaign", "Küldés");
define("LNG_Addon_edmdesigner_projectListVM_Actions_Preview", "Megtekintés");
define("LNG_Addon_edmdesigner_projectListVM_Actions_Duplicate", "Másolás");
define("LNG_Addon_edmdesigner_projectListVM_Actions_Remove", "Törlés");

define("LNG_Addon_edmdesigner_projectListVM_Pagination_Back", "Előző");
define("LNG_Addon_edmdesigner_projectListVM_Pagination_Next", "Következő");
define("LNG_Addon_edmdesigner_projectListVM_Pagination_ResultsPerPage", "Elem / oldal: ");
define("LNG_Addon_edmdesigner_projectListVM_Pagination_ActPage", "Oldal");




//l10n previewVM
define("LNG_Addon_edmdesigner_previewVM_Title-Template", "Sablon előnézete");
define("LNG_Addon_edmdesigner_previewVM_Title-BuiltInTemplate", "Beépített sablon előnézete");
define("LNG_Addon_edmdesigner_previewVM_Title-Campaign", "Kampány előnézete");

define("LNG_Addon_edmdesigner_previewVM_Mobile", "Mobil");
define("LNG_Addon_edmdesigner_previewVM_Tablet", "Tablet");
define("LNG_Addon_edmdesigner_previewVM_Desktop", "Desktop");
define("LNG_Addon_edmdesigner_previewVM_ButtonDescription", "A következő gombok segítségével megnézheti az emailt különböző eszközökön: ");

define("LNG_Addon_edmdesigner_previewVM_Close", "Bezár");
define("LNG_Addon_edmdesigner_previewVM_Export", "Exportál");

define("LNG_Addon_edmdesigner_previewVM_ExportErrorMessage", "Nem sikerült az exportálás. Kérjük próbálja később!");
define("LNG_Addon_edmdesigner_previewVM_SendTestEmail", "Teszt email küldése");
define("LNG_Addon_edmdesigner_previewVM_SendTestEmailErrorMessage", "A teszt email küldés nem sikerült. Kérjük próbálja később!");
define("LNG_Addon_edmdesigner_previewVM_NotValidEmails", "Kérjük valós email címet adjon meg!");
define("LNG_Addon_edmdesigner_previewVM_NoEmail", "Kérjük adjon meg egy email címet!");
define("LNG_Addon_edmdesigner_previewVM_TestSubject", "Teszt email");

define("LNG_Addon_edmdesigner_previewVM_FromLabel", "Teszt email küldése erről az email címről");
define("LNG_Addon_edmdesigner_previewVM_ToLabel", "Teszt email küldése erre az email címre");
define("LNG_Addon_edmdesigner_previewVM_SubjectLabel", "Tárgy");
define("LNG_Addon_edmdesigner_previewVM_SendButton", "Küldés");

define("LNG_Addon_edmdesigner_previewVM_CheckSpamButton", "Spam pontszám ellenőrzése (generált szöveges verzióval)");



//l10n editorVM
define("LNG_Addon_edmdesigner_editorVM_Title-Template", "Egyedi sablon címe: ");
define("LNG_Addon_edmdesigner_editorVM_Title-BuiltInTemplate", "Beépített sablon címe: ");
define("LNG_Addon_edmdesigner_editorVM_Title-Campaign", "Kampány címe: ");

define("LNG_Addon_edmdesigner_editorVM_Preview", "Előnézet");
define("LNG_Addon_edmdesigner_editorVM_Save", "Mentés");
define("LNG_Addon_edmdesigner_editorVM_Close", "Bezárás");
define("LNG_Addon_edmdesigner_editorVM_SaveAndClose", "Mentés és bezárás");
define("LNG_Addon_edmdesigner_editorVM_Next", "Következő");
define("LNG_Addon_edmdesigner_editorVM_Back", "Előző");


define("LNG_Addon_edmdesigner_editorVM_CancelButton", "Mégsem");
define("LNG_Addon_edmdesigner_editorVM_CancelMessage", "Biztos benne, hogy nem szeretne új email kampányt létrehozni? A nem mentett adatok elvesznek.");

define("LNG_Addon_edmdesigner_editorVM_DefaultSubject", "Alapértelmezett tárgy");

define("LNG_Addon_edmdesigner_editorVM_Dynamic_Content_Label", "Please select what kind of dynamic content do you want to use:");
define("LNG_Addon_edmdesigner_editorVM_CustomFieldButton", "Insert a Custom Field...");
define("LNG_Addon_edmdesigner_editorVM_UnsubscribeButton", "Insert Unsubscribe Link");
define("LNG_Addon_edmdesigner_editorVM_DynamicContentButton", "Insert a Dynamic Content Tag...");
define("LNG_Addon_edmdesigner_editorVM_SurveyLinkButton", "Insert Survey Link");

define("LNG_Addon_edmdesigner_editorVM_SurveyLinkDefaultText", "Click here to take our survey");


//l10n confirmDeleteVM
define("LNG_Addon_edmdesigner_confirmDeleteVM_Title-Template", "Törlés jóváhagyása - Sablon");
define("LNG_Addon_edmdesigner_confirmDeleteVM_Title-BuiltInTemplate", "Törlés jóváhagyása - Beépített sablon");
define("LNG_Addon_edmdesigner_confirmDeleteVM_Title-Campaign", "Törlés jóváhagyása - Kampány");

define("LNG_Addon_edmdesigner_confirmDeleteVM_Description-Template", "Kérjük vegye figyelembe, hogy a sablon végleges törlésre kerül!");
define("LNG_Addon_edmdesigner_confirmDeleteVM_Description-BuiltInTemplate", "Kérjük vegye figyelembe, hogy a beépített sablon végleges törlésre kerül!");
define("LNG_Addon_edmdesigner_confirmDeleteVM_Description-Campaign", "Kérjük vegye figyelembe, hogy a kampány végleges törlésre kerül!");

define("LNG_Addon_edmdesigner_confirmDeleteVM_Details", "Részletek");

define("LNG_Addon_edmdesigner_confirmDeleteVM_Project_Title", "Cím");
define("LNG_Addon_edmdesigner_confirmDeleteVM_Project_Category", "Kategória");
define("LNG_Addon_edmdesigner_confirmDeleteVM_Project_Active", "Aktív");
define("LNG_Addon_edmdesigner_confirmDeleteVM_Project_CreatedAt", "Létrehozva");
define("LNG_Addon_edmdesigner_confirmDeleteVM_Project_ModifiedAt", "Módosítva");

define("LNG_Addon_edmdesigner_confirmDeleteVM_Yes", "Igen");
define("LNG_Addon_edmdesigner_confirmDeleteVM_No", "Nem");




//l10n templateSelectorWithPreviewVM
define("LNG_Addon_edmdesigner_templateSelectorWithPreviewVM_Title-Template", "Új sablon");
define("LNG_Addon_edmdesigner_templateSelectorWithPreviewVM_Title-BuiltInTemplate", "Új beépített sablon");
define("LNG_Addon_edmdesigner_templateSelectorWithPreviewVM_Title-Campaign", "Új kampány");

define("LNG_Addon_edmdesigner_templateSelectorWithPreviewVM_Name-Template", "Sablon neve: ");
define("LNG_Addon_edmdesigner_templateSelectorWithPreviewVM_Name-BuiltInTemplate", "Beépített sablon neve: ");
define("LNG_Addon_edmdesigner_templateSelectorWithPreviewVM_Name-Campaign", "Kampány neve: ");

define("LNG_Addon_edmdesigner_templateSelectorWithPreviewVM_CreateFromSelected", "Létrehozás a kiválasztott template alapján");
define("LNG_Addon_edmdesigner_templateSelectorWithPreviewVM_CreateFromScratch", "Létrehozás nulláról");

define("LNG_Addon_edmdesigner_templateSelectorWithPreviewVM_BuiltInTemplates", "Beépített sablonok");
define("LNG_Addon_edmdesigner_templateSelectorWithPreviewVM_CustomTemplates", "Egyedi sablonok");

define("LNG_Addon_edmdesigner_templateSelectorWithPreviewVM_Preview_Title", "Előnézet");
define("LNG_Addon_edmdesigner_templateSelectorWithPreviewVM_Preview_Mobile", "Mobil");
define("LNG_Addon_edmdesigner_templateSelectorWithPreviewVM_Preview_Tablet", "Tablet");
define("LNG_Addon_edmdesigner_templateSelectorWithPreviewVM_Preview_Desktop", "Desktop");
define("LNG_Addon_edmdesigner_templateSelectorWithPreviewVM_Preview_ButtonDescription", "A következő gombok segítségével megnézheti az emailt különböző eszközökön: ");

define("LNG_Addon_edmdesigner_templateSelectorWithPreviewVM_CancelButton", "Mégsem");
define("LNG_Addon_edmdesigner_templateSelectorWithPreviewVM_CancelMessage", "Biztos benne, hogy nem szeretne új email kampányt létrehozni?");

define("LNG_Addon_edmdesigner_templateSelectorWithPreviewVM_NoNameMessage", "Kérjük nevezze el az email kampányt!");



//l10n subjectAndTextVM
define("LNG_Addon_edmdesigner_subjectAndTextVM_Title", "Tárgy és szöveges verzió");
define("LNG_Addon_edmdesigner_subjectAndTextVM_SubjectLabel", "Tárgy");
define("LNG_Addon_edmdesigner_subjectAndTextVM_TextBodyLabel", "Szöveges verzió");

define("LNG_Addon_edmdesigner_subjectAndTextVM_Save", "Mentés");
define("LNG_Addon_edmdesigner_subjectAndTextVM_Cancel", "Mégsem");
define("LNG_Addon_edmdesigner_subjectAndTextVM_CancelMessage", "Biztos benne, hogy nem szeretne új email kampányt létrehozni? A nem mentett adatok elvesznek.");

define("LNG_Addon_edmdesigner_subjectAndTextVM_Close", "Bezár");
define("LNG_Addon_edmdesigner_subjectAndTextVM_CheckSpamButton", "Spam pontszám ellenőrzése");
define("LNG_Addon_edmdesigner_subjectAndTextVM_RegenerateTextVersionButton", "Szöveges verzió újragenerálása");



//l10n settings
define("LNG_Addon_edmdesigner_Permissions_Header", "EDMdesigner");

define("LNG_Addon_edmdesigner_Permissions_Templates", "Sablonok");
define("LNG_Addon_edmdesigner_Permissions_BuiltInTemplates", "Beépített sablonok");
define("LNG_Addon_edmdesigner_Permissions_Campaigns", "Kampányok");
define("LNG_Addon_edmdesigner_Permissions_Token", "Token - ki kell pipálni");
define("LNG_Addon_edmdesigner_Permissions_Settings", "EDMdesigner beállítások");





define("LNG_Addon_edmdesigner_Menu_EDMdesigner_Description", "Stílusos mobilbarát kampányok létrehozása percek alatt.");

define("LNG_Addon_edmdesigner_apiKey", "API Key");
define("LNG_Addon_edmdesigner_magic", "Magic");
define("LNG_Addon_edmdesigner_languageCode", "Editor's language code");
define("LNG_Addon_edmdesigner_host", "Host");
define("LNG_Addon_edmdesigner_spamCheck", "Spam check");
define("LNG_Addon_edmdesigner_autoSave", "Auto save");

define("LNG_Addon_edmdesigner_hostError", "Host should start with http:// or https://");

define('LNG_Addon_edmdesigner_Menu_Text', 'Beépített reszponzív sablonok kezelése');
define('LNG_Addon_edmdesigner_Menu_Description', 'Egyedi reszponzív email sablonok létrehozása kódolás nélkül.');

define('LNG_Addon_edmdesigner_Heading', 'EDMdesigner');
define('LNG_Addon_edmdesigner_Save', 'Save');
define('LNG_Addon_edmdesigner_UserCreated', 'EDMdesigner user successfully created.');

define('LNG_Addon_edmdesigner_Users_Empty', 'There are no EDMdesigner users at this point.');

define('LNG_Addon_edmdesigner_Users', 'EDMdesiger users');
define('LNG_Addon_edmdesigner_Users_Introduction', 'On this page you can configure the API keys for the EDMdesigner per user.');
define('LNG_Addon_edmdesigner_CreateButton', 'Create EDMdesigner User');
define('LNG_Addon_edmdesigner_DeleteButton', 'Delete Selected Users');
define('LNG_Addon_edmdesigner_DeleteAllButton', 'Delete All Users');
define('LNG_Addon_edmdesigner_logsdeleted', 'Selected log entries have been deleted.');
define('LNG_Addon_edmdesigner_all_logsdeleted', 'All log entries have been deleted.');
define('LNG_Addon_edmdesigner_ChooseUsersToDelete_Alert', 'Please choose at least one entry to delete.');
define('LNG_Addon_edmdesigner_APIkey', 'API key');
define('LNG_Addon_edmdesigner_LangEnglish', 'English');
define('LNG_Addon_edmdesigner_LangDutch', 'Dutch');
define('LNG_Addon_edmdesigner_LangGerman', 'German');
define('LNG_Addon_edmdesigner_LangSpanish', 'Spanish');

define('LNG_Addon_edmdesigner_Username', 'Username');
define('LNG_Addon_edmdesigner_Fullname', 'Full name');
define('LNG_Addon_edmdesigner_Language', 'Language');
define('LNG_Addon_edmdesigner_Date', 'Date');
define('LNG_Addon_edmdesigner_Action', 'Action');

define('LNG_Addon_edmdesigner_Manage_Edit', 'Edit');
define('LNG_Addon_edmdesigner_Manage_Delete', 'Delete');
define('LNG_Addon_edmdesigner_SaveButton', 'Save User');
define('LNG_Addon_edmdesigner_CancelButton', 'Cancel');

define('LNG_Addon_edmdesigner_Alert_DeleteSelected', 'Are you sure you want to delete selected EDMdesigner users? This cannot be undone.');
define('LNG_Addon_edmdesigner_Alert_DeleteAll', 'Are you sure you want to delete all EDMdesigner users? This cannot be undone.');

