<link rel="stylesheet" href="{$ApplicationUrl}includes/styles/stylesheet.css" type="text/css">
<script src="{$ApplicationUrl}includes/js/jquery.js"></script>
<div style="padding:0; margin:0;">
    <form name="frmAddonsEDMdesignerSettings" method="post" action="{$SettingsUrl}&SubAction=SaveSettings" target="_parent" style="padding:0; margin:0;">
        <table width="100%" cellspacing="0" cellpadding="2" border="0">
            <tr>
                <td class="FieldLabel" style="width:140px;">
                    {$lang.Addon_edmdesigner_apiKey}
                </td>
                <td>
                    <input type="text" name="EDMdesignerApiKey" value="{$EDMdesignerApiKey}" class="Field250" />
                </td>
            </tr>
            <tr>
                <td class="FieldLabel" style="width:140px;">
                    {$lang.Addon_edmdesigner_magic}
                </td>
                <td>
                    <input type="text" name="EDMdesignerMagic" value="{$EDMdesignerMagic}" class="Field250" />
                </td>
            </tr>
            <tr>
                <td class="FieldLabel" style="width:140px;">
                    {$lang.Addon_edmdesigner_languageCode}
                </td>
                <td>
                    <input type="text" name="EDMdesignerLang" value="{$EDMdesignerLang}" class="Field30" />
                </td>
            </tr>
            <tr>
                <td class="FieldLabel" style="width:140px;">
                    {$lang.Addon_edmdesigner_spamCheck}
                </td>
                <td>
                    <input id="EDMdesignerSpamCheck" type="checkbox" name="EDMdesignerSpamCheck" value="true" />
                </td>
            </tr>
            <tr>
                <td class="FieldLabel" style="width:140px;">
                    {$lang.Addon_edmdesigner_autoSave}
                </td>
                <td>
                    <input id="EDMdesignerAutoSave" type="checkbox" name="EDMdesignerAutoSave" value="true" />
                </td>
            </tr>
            <tr>
                <td class="FieldLabel" style="width:140px;">&nbsp;</td>
                <td>
                    <input class="FormButton SmallButton SubmitButton" type="submit" value="{$lang.Addon_edmdesigner_Save}" />
                </td>
            </tr>
        </table>

        {$lang.Addon_edmdesigner_hostError}
    </form>

    <script>
        if ("{$EDMdesignerSpamCheck}" === "true") {
            $("#EDMdesignerSpamCheck").attr("checked", "checked");
        }

        if ("{$EDMdesignerAutoSave}" === "true") {
            $("#EDMdesignerAutoSave").attr("checked", "checked");
        }

        if ($("#EDMdesignerHostInput").val() === "") {
            $("#EDMdesignerHostInput").val("https://api.edmdesigner.com");
        }
    </script>
</div>