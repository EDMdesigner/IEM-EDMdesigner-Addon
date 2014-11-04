<form name="frmUserEditor" id="frmUserEditor" method="post" action="index.php?Page=Addons&Addon=edmdesigner&Action=Create">
	<table cellspacing="0" cellpadding="0" width="100%" align="center">
		<tr>
			<td class="Heading1">
				{$lang.Addon_edmdesigner_Heading}
			</td>
		</tr>
		<tr>
			<td class="body pageinfo">
				<p>{$lang.Addon_edmdesigner_Intro}</p>
			</td>
		</tr>
		<tr>
			<td>
				<table border="0" cellspacing="0" cellpadding="2" width="100%" class="PanelPlain">
 					<tr>
{if $FormType == 'edit'}
                        <td colspan="2">
                            <input type="hidden" name="edmid" value="{$form.edmid}">
                        </td>
{else}
						<td class="FieldLabel">
							{template="Required"}
							{$lang.Addon_edmdesigner_User}:&nbsp;
						</td>
						<td>
							<select name="userid">
                            {*foreach $users as $user}
                            	<option value="{$user.userid}">{$user.username}</option>
                            {/foreach*}
                            </select>
						</td>
{/if}
					</tr>
					<tr>
						<td class="FieldLabel">
							{template="Required"}
							{$lang.Addon_edmdesigner_APIkey}:&nbsp;
						</td>
						<td>
							<input type="text" name="apikey" class="Field250 form_text" value="{$form.apikey}">
						</td>
					</tr>
					<tr>
						<td class="FieldLabel">
							{template="Required"}
							{$lang.Addon_edmdesigner_Language}:&nbsp;
						</td>
						<td>
							<select name="user_language">
                            	<option value="en"{if $form.user_language == 'en' || $form.user_language == ''} selected="selected"{/if}>{$lang.Addon_edmdesigner_LangEnglish}</option>
                            	<option value="nl"{if $form.user_language == 'nl'} selected="selected"{/if}>{$lang.Addon_edmdesigner_LangDutch}</option>
                            	<option value="de"{if $form.user_language == 'de'} selected="selected"{/if}>{$lang.Addon_edmdesigner_LangGerman}</option>
                            	<option value="es"{if $form.user_language == 'es'} selected="selected"{/if}>{$lang.Addon_edmdesigner_LangSpanish}</option>
                            </select>
						</td>
					</tr>
					<tr>
						<td width="200" class="FieldLabel">&nbsp;
							
						</td>
						<td height="30" valign="top">
							<input class="FormButton" type="submit" value="{$lang.Addon_edmdesigner_SaveButton}"/>
							<input class="FormButton CancelButton" type="button" value="{$lang.Addon_edmdesigner_CancelButton}"/>
						</td>
					</tr>
				</table>
			</td>
		</tr>
    </table>
</form>