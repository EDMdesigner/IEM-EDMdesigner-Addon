<script src="{$ApplicationUrl}includes/js/jquery.js"></script>
<!--<script type="text/javascript">

if(typeof jQuery === 'undefined'){
   document.write('<script src="{$ApplicationUrl}includes/js/jquery.js"></' + 'script>');
}

</script>-->
<script src="{$AddonBaseDirectory}/js/knockout-min.js"></script>

<script src="https://api-static.edmdesigner.com/EDMdesignerAPI.js"></script>
<script>
	var tokenUrl = decodeURIComponent("{$TokenUrl}"); //this variable is used when initEDMdesignerPlugin is called in EntryPoints.js
</script>

<script src="{$AddonBaseDirectory}/js/knockoutPaginationVM.js"></script>
<script src="{$AddonBaseDirectory}/js/ViewModels.js"></script>
<script src="{$AddonBaseDirectory}/js/EntryPoints.js"></script>

<script src="{$ApplicationUrl}includes/js/jquery/plugins/jquery.plugin.js"> </script>
<script src="{$ApplicationUrl}includes/js/jquery/plugins/jquery.window.js"> </script>
<script src="{$ApplicationUrl}includes/js/jquery/plugins/jquery.window-extensions.js"> </script>
<script src="{$ApplicationUrl}includes/js/imodal/imodal.js"></script>

<style>

body {
	min-width: 1090px;
}

.itemSelected {
	background: #abcdef;
}

.list-item {
	cursor: pointer;
}

.list-item:hover {
	background: #eeeeee;
}

.preview-iframe {
	display:block;
	margin: 0 auto 10px;

	border: 1px solid #010101 !important;
}

.preview-iframe.preview-mobile{
	width: 326px;
	height: 581px; /* 568 */

	-ms-transform: scale(0.7);
	-ms-transform-origin: 50% 0%;
	-moz-transform: scale(0.7);
	-moz-transform-origin: 50% 0%;
	-o-transform: scale(0.7);
	-o-transform-origin: 50% 0%;
	-webkit-transform: scale(0.7);
	-webkit-transform-origin: 50% 0%;

	margin-bottom: -50px;
}

.preview-iframe.preview-tablet {
	width:723px;
	height:967px;

	-ms-transform: scale(0.6);
	-ms-transform-origin: 50% 0%;
	-moz-transform: scale(0.6);
	-moz-transform-origin: 50% 0%;
	-o-transform: scale(0.6);
	-o-transform-origin: 50% 0%;
	-webkit-transform: scale(0.6);
	-webkit-transform-origin: 50% 0%;

	margin-bottom: -215px;
}

.preview-iframe.preview-desktop {
	width: 964px;
	height: 592px;

	-ms-transform: scale(0.7);
	-ms-transform-origin: 37% 0%;
	-moz-transform: scale(0.7);
	-moz-transform-origin: 37% 0%;
	-o-transform: scale(0.7);
	-o-transform-origin: 37% 0%;
	-webkit-transform: scale(0.7);
	-webkit-transform-origin: 37% 0%;
}

.preview-iframe-holder.preview-desktop {
	width: 889px;
	height: 593px;
	overflow:hidden;
	margin:0 auto 10px;

	background: url({$AddonBaseDirectory}/images/macbookpro-final2b.png) 50% top no-repeat;
	padding-top:33px;
}

.preview-iframe-holder.preview-tablet {
	background: url({$AddonBaseDirectory}/images/ipad-white-portrait-final2.png) 50% top no-repeat;
	padding-top:63px;
}

.preview-iframe-holder.preview-mobile {
	background: url({$AddonBaseDirectory}/images/iphone5s-white-portrait-final2.png) 50% top no-repeat;
	padding-top:83px;
}

.preview-iframe-left {
	border: 1px solid #212121 !important;
	margin-top:10px;
}

.preview-iframe-left-holder {
	overflow:hidden;
	width: 555px;
	margin: 20px auto 10px;
}

.preview-iframe-left-holder.preview-mobile {
	background: url({$AddonBaseDirectory}/images/iphone5s-white-portrait-final2-mini.png) 50% top no-repeat;
	padding-top:33px;
}

.preview-iframe-left-holder.preview-tablet {
	background: url({$AddonBaseDirectory}/images/ipad-white-portrait-final2-mini.png) 50% top no-repeat;
	padding-top:22px;
}

.preview-iframe-left-holder.preview-desktop {
	background: url({$AddonBaseDirectory}/images/macbookpro-final2-minib.png) 50% top no-repeat;
	padding-top:6px;
}

.preview-iframe-left.preview-mobile {
	width: 378px;
	height:676px;

	-ms-transform: scale(0.3);
	-ms-transform-origin: 83% 0%;
	-moz-transform: scale(0.3);
	-moz-transform-origin: 83% 0%;
	-o-transform: scale(0.3);
	-o-transform-origin: 83% 0%;
	-webkit-transform: scale(0.3);
	-webkit-transform-origin: 83% 0%;

	margin-bottom: -400px;
}

.preview-iframe-left.preview-tablet {
	width: 724px;
	height: 964px;

	-ms-transform: scale(0.3);
	-ms-transform-origin: 33.2% 0%;
	-moz-transform: scale(0.3);
	-moz-transform-origin: 33.2% 0%;
	-o-transform: scale(0.3);
	-o-transform-origin: 33.2% 0%;
	-webkit-transform: scale(0.3);
	-webkit-transform-origin: 33.2% 0%;

	margin-bottom: -600px;
}

.preview-iframe-left.preview-desktop {
	width: 1120px;
	height:696px;

	-ms-transform: scale(0.3);
	-ms-transform-origin: 14% 0%;
	-moz-transform: scale(0.3);
	-moz-transform-origin: 14% 0%;
	-o-transform: scale(0.3);
	-o-transform-origin: 14% 0%;
	-webkit-transform: scale(0.3);
	-webkit-transform-origin: 14% 0%;

	margin-bottom: -400px;
}

.Panel td {
	padding: 5px;
}

.preview-iframe-holder.preview-export {
	background: none !important;
}

.preview-iframe-holder.preview-test-email {
	background: none !important;
	text-align: center;
}

button.SmallButton {
 width:auto!important;
 padding: 0px 25px;
}

.dynamic-content-panel-link {
	margin-bottom: 8px;
	vertical-align: middle;
}

.dynamic-content-panel-link a {
	vertical-align: top;
	font-size: 17px;
	text-decoration: none;
	margin-left: 20px;
}

.dynamic-content-panel-link img {
	margin-right: 5px;
}

/* spam check*/

#SpamCheck_Container {
margin: 0;
padding: 0;
width: auto;
}
#SpamCheck_Message {
font-family: Tahoma,Arial;
font-size: 11px;
}
div.spamRule_Success {
padding: 4px 3px;
vertical-align: middle;
}
div.spamRule_Success img {
padding-left: 2px;
padding-right: 2px;
vertical-align: middle;
}
div.spamRuleBroken_row {
background-color: #f9f9f9;
clear: both;
display: block;
}
div.spamRuleBroken_row_rulename {
float: left;
padding: 3px 0 3px 5px;
}
div.spamRuleBroken_row_rulescore {
float: right;
padding: 3px 15px 3px 5px;
text-align: right;
width: 80px;
}
div.spamRuleBroken_graph {
background-color: #eeeeee;
border: 1px solid gray;
height: 5px;
}

</style>

<!-- ko if: loading -->
	<img src="images/loading.gif" border="0" width="16" height="16" style="position:absolute;top:300px;left:50%;"/>
<!-- /ko -->

<!-- ko ifnot: loading -->
	<!-- ko if: pages.preview -->
		<div id="preview" data-bind="with: pages.preview">
			<div class="Heading1" style="float:left;" data-bind="text: l10n.title"></div>
			<button style="float:right;" class="SmallButton" data-bind="click: close, text: l10n.close"></button>
			<button style="float:right;" class="SmallButton" data-bind="click: templateExport, text: l10n.exportButton"></button>
			<button style="float:right;" class="SmallButton" data-bind="click: changeToSendEmailMode, text: l10n.sendTestEmail"></button>
			<!-- ko if: addonConfig.spamCheck -->
			<button style="float:right;" class="SmallButton" data-bind="click: checkSpam, text: l10n.checkSpamButton"></button>
			<!-- /ko -->

			<div style="clear:both;"></div>

			<table border="0" cellspacing="0" cellpadding="0" width="100%" style="margin-top:10px;margin-bottom:10px;">
				<tr>
					<td valign="middle" align="right">
						<p style="margin:0;" data-bind="text: l10n.buttonDescription"></p>
					</td>
					<td align="right" width="400">
						<button class="SmallButton" data-bind="click: width.setDesktop, text: l10n.desktop"></button>
						<button class="SmallButton" data-bind="click: width.setTablet, text: l10n.tablet"></button>
						<button class="SmallButton" data-bind="click: width.setMobile, text: l10n.mobile"></button>
					</td>
				</tr>
			</table>

			<div style="clear:both;"></div>
			<div class="preview-iframe-holder" data-bind="css: {'preview-desktop': iframeClass() === 'preview-desktop', 'preview-tablet': iframeClass() === 'preview-tablet', 'preview-mobile': iframeClass() === 'preview-mobile', 'preview-export': exportMode(), 'preview-test-email': sendEmailMode()}">
				<!-- ko ifnot: exportMode() || sendEmailMode() -->
				<iframe class="preview-iframe" data-bind="attr: {src: src, width: width}, css: iframeClass"></iframe>
				<!-- /ko -->
				<!-- ko if: exportMode -->
				<textarea data-bind="value: html" style="width: 883px;" rows="30" disabled></textarea>
				<!-- /ko -->
				<!-- ko if: sendEmailMode -->
					<!-- ko ifnot: working -->
						<!-- ko ifnot: htmlResult() -->
						<table width="40%" cellspacing="0" cellpadding="2" border="0">
							<tr>
								<td class="FieldLabel" style="width:140px;">
									<span data-bind="text: l10n.fromLabel"></span>:
								</td>
								<td>
									<input type="text" data-bind="value: fromEmail"/>
								</td>
							</tr>
							<tr>
								<td class="FieldLabel" style="width:140px;">
									<span data-bind="text: l10n.toLabel"></span>:
								</td>
								<td>
									<input type="text" data-bind="value: toEmail"/>
								</td>
							</tr>
							<tr>
								<td class="FieldLabel" style="width:140px;">
									<span data-bind="text: l10n.subjectLabel"></span>:
								</td>
								<td>
									<input type="text" data-bind="value: testSubject"/>
								</td>
							</tr>
							<tr>
								<td class="FieldLabel" style="width:140px;">&nbsp;</td>
								<td>
									<button class="SmallButton" data-bind="click: sendTestEmail,text: l10n.sendButton"/>
								</td>
							</tr>
						</table>
						<!-- /ko -->
						<!-- ko if: htmlResult() -->
						<div style="width:500px;margin:0 auto;padding:20px;border:1px solid #cac7bd;" data-bind="html: htmlResult"></div>
						<!-- /ko -->
					<!-- /ko -->
					<!-- ko if: working -->
					<img src="images/loading.gif" border="0" width="16" height="16" style="position:absolute;top:300px;left:50%;"/>
					<!-- /ko -->
				<!-- /ko -->
				
			</div>
		</div>
	<!-- /ko -->

	<!-- ko ifnot: pages.preview -->
		<!-- ko if: pages.confirmDelete -->
			<div id="confirmDelete" data-bind="with: pages.confirmDelete">
				<h1 data-bind="text: l10n.title"></h1>
				<div data-bind="text: l10n.description"></div>
				<h2 data-bind="text: l10n.details"></h2>

				<table>
					<tr>
						<td data-bind="text: l10n.project.title"></td>
						<td data-bind="text: projectVM.title"></td>
					</tr>
					<tr>
						<td data-bind="text: l10n.project.category"></td>
						<td data-bind="text: projectVM.category"></td>
					</tr>
					<tr>
						<td data-bind="text: l10n.project.active"></td>
						<td>
							<!-- ko if: projectVM.active -->
								<img src="images/tick.gif" border="0" />
							<!-- /ko -->
							<!-- ko ifnot: projectVM.active -->
								<img src="images/cross.gif" border="0" />
							<!-- /ko -->
						</td>
					</tr>
					<tr>
						<td data-bind="text: l10n.project.createdAt"></td>
						<td data-bind="text: projectVM.createdAt"></td>
					</tr>
					<tr>
						<td data-bind="text: l10n.project.modifiedAt"></td>
						<td data-bind="text: projectVM.modifiedAt"></td>
					</tr>
				</table>

				<button class="SmallButton" data-bind="click: confirm, text: l10n.yes"></button>
				<button class="SmallButton" data-bind="click: cancel, text: l10n.no"></button>
			</div>
		<!-- /ko -->

		<!-- ko ifnot: pages.confirmDelete -->
			<!-- ko if: pages.projectList -->
				<div id="projectList" data-bind="with: pages.projectList">
					<div class="Heading1" data-bind="text: l10n.title"></div>

					<div align="right" style="float:right;">
						<span data-bind="text: l10n.pagination.resultsPerPage"></span>&nbsp;

						<select style="margin-bottom: 4px; width: 55px;" id="PerPageDisplay" name="PerPageDisplay" data-bind="value: pageSize, options: pageSizes">
						</select>

						&nbsp;&nbsp;&nbsp;&nbsp;

						(<span data-bind="text: l10n.pagination.actPage"></span> <span data-bind="text: pageIndex() + 1"></span> / <span data-bind="text: Math.ceil(totalCount() / pageSize())"></span>)&nbsp;&nbsp;&nbsp;&nbsp;
						<!-- ko if: pages -->
							<a title="Go To First Page" href="#" data-bind="click: paginator.goToFirstPage">&laquo;</a>
							&nbsp;|&nbsp;
							<a href="#" data-bind="click: paginator.goToPrevPage, text: l10n.pagination.back">Back</a>
							&nbsp;|&nbsp;
							<!-- ko foreach: pages-->
								<!-- ko if: ((value > $parent.minDisplayedPageIndex() - 1) && (value < $parent.maxDisplayedPageIndex() + 1)) -->
									<!-- ko if: value == $parent.pageIndex() -->
										<b data-bind="text: display"></b>
									<!-- /ko -->
									<!-- ko if: value != $parent.pageIndex() -->
									<a href="#" data-bind="text: display, css: {selected: value === $parent.pageIndex(), active: value !== $parent.pageIndex()}, click: $parent.paginator.goToThisPage"></a>
									<!-- /ko -->
									&nbsp;|&nbsp;
								<!-- /ko -->
							<!-- /ko -->
							<a href="#" data-bind="click: paginator.goToNextPage, text: l10n.pagination.next"></a>
							&nbsp;|&nbsp;
							<a title="Go To Last Page" href="#" data-bind="click: paginator.goToLastPage">&raquo;</a>
						<!-- /ko -->
					</div>

					<button class="SmallButton" data-bind="click: createProject, text: l10n.newProject"></button>

					<table border="0" cellspacing="0" cellpadding="0" width="100%" class="Text">
						<thead>
							<tr class="Heading3">
								<td align="">
									<span data-bind="text: l10n.headings.title"></span>
									<img src="images/sortup.gif" border="0" data-bind="click: sortBy.title.asc">
									<img src="images/sortdown.gif" border="0" data-bind="click: sortBy.title.desc">
								</td>
								<!-- ko if: $root.campaignMode -->
									<td align="">
										<span data-bind="text: l10n.headings.subject"></span>
										<img src="images/sortup.gif" border="0" data-bind="click: sortBy.subject.asc">
										<img src="images/sortdown.gif" border="0"data-bind="click: sortBy.subject.desc">
									</td>
									<td align="50" data-bind="text: l10n.headings.archive"></td>
								<!-- /ko -->
								<!-- ko ifnot: $root.campaignMode -->
								<!--
									<td align="center" data-bind="text: l10n.headings.category"></td>
								-->
								<!-- /ko -->
								<td align="50" data-bind="text: l10n.headings.active"></td>
								<td width="130">
									<span data-bind="text: l10n.headings.createdAt"></span>
									<img src="images/sortup.gif" border="0" data-bind="click: sortBy.createdAt.asc">
									<img src="images/sortdown.gif" border="0" data-bind="click: sortBy.createdAt.desc">
								</td>
								<td width="130">
									<span data-bind="text: l10n.headings.modifiedAt"></span>
									<img src="images/sortup.gif" border="0" data-bind="click: sortBy.modifiedAt.asc">
									<img src="images/sortdown.gif" border="0" data-bind="click: sortBy.modifiedAt.desc">
								</td>
								<td  width="250" data-bind="text: l10n.headings.actions"></td>
							</tr>
						</thead>
						<tbody data-bind="foreach: displayedItems">
							<tr class="GridRow">
								<td data-bind="text: title" nowrap="nowrap">
								</td>
								<!-- ko if: $root.campaignMode -->
									<td data-bind="text: subject" align="">
									</td>
									<td align="center" nowrap="nowrap" width="25">
										<!-- ko if: archive.loading -->
											<img src="images/loading.gif" border="0" />
										<!-- /ko -->
										<!-- ko ifnot: archive.loading -->
											<!-- ko if: archive -->
												<img src="images/tick.gif" border="0" data-bind="click: archive.toggle" />
											<!-- /ko -->
											<!-- ko ifnot: archive -->
												<img src="images/cross.gif" border="0" data-bind="click: archive.toggle" />
											<!-- /ko -->
										<!-- /ko -->
									</td>
								<!-- /ko -->
								<!-- ko ifnot: $root.campaignMode -->
									<!--
									<td data-bind="text: category" align="center">
									</td>
									-->
								<!-- /ko -->
								<td align="center" nowrap="nowrap" width="25">
									<!-- ko if: active.loading -->
										<img src="images/loading.gif" border="0" />
									<!-- /ko -->
									<!-- ko ifnot: active.loading -->
										<!-- ko if: active -->
											<img src="images/tick.gif" border="0" data-bind="click: active.toggle" />
										<!-- /ko -->
										<!-- ko ifnot: active -->
											<img src="images/cross.gif" border="0" data-bind="click: active.toggle" />
										<!-- /ko -->
									<!-- /ko -->
								</td>
								<td data-bind="text: createdAt" align="" nowrap="nowrap">
								</td>
								<td data-bind="text: modifiedAt" align="" nowrap="nowrap">
								</td>
								<td align="">
									<a href="#" data-bind="click: preview, text: $parent.l10n.actions.preview">Preview</a>

									<!-- ko if: $root.campaignMode -->
										<!-- ko if: active -->
											<a href="#" data-bind="click: sendCampaign, text: $parent.l10n.actions.sendCampaign"></a>
										<!-- /ko -->
										<!-- ko ifnot: active -->
											<span data-bind="text: $parent.l10n.actions.sendCampaign"></span>
										<!-- /ko -->
									<!-- /ko -->

									<a href="#" data-bind="click: open, text: $parent.l10n.actions.open">Open</a>
									
									<a href="#" data-bind="click: duplicate, text: $parent.l10n.actions.duplicate">Duplicate</a>
									<a href="#" data-bind="click: remove, text: $parent.l10n.actions.remove">Delete</a>
								</td>
							</tr>
						</tbody>
					</table>

					<div align="right" style="padding-bottom:5px"></div>

					<div align="right" style="float:right;">
						(<span data-bind="text: l10n.pagination.actPage"></span> <span data-bind="text: pageIndex() + 1"></span> / <span data-bind="text: Math.ceil(totalCount() / pageSize())"></span>)&nbsp;&nbsp;&nbsp;&nbsp;
						<!-- ko if: pages -->
							<a title="Go To First Page" href="#" data-bind="click: paginator.goToFirstPage">&laquo;</a>
							&nbsp;|&nbsp;
							<a href="#" data-bind="click: paginator.goToPrevPage, text: l10n.pagination.back"></a>
							&nbsp;|&nbsp;
							<!-- ko foreach: pages-->
								<!-- ko if: ((value > $parent.minDisplayedPageIndex() - 1) && (value < $parent.maxDisplayedPageIndex() + 1)) -->
									<!-- ko if: value == $parent.pageIndex() -->
										<b data-bind="text: display"></b>
									<!-- /ko -->
									<!-- ko if: value != $parent.pageIndex() -->
									<a href="#" data-bind="text: display, css: {selected: value === $parent.pageIndex(), active: value !== $parent.pageIndex()}, click: $parent.paginator.goToThisPage"></a>
									<!-- /ko -->
									&nbsp;|&nbsp;
								<!-- /ko -->
							<!-- /ko -->
							<a href="#" data-bind="click: paginator.goToNextPage, text: l10n.pagination.next">Next</a>
							&nbsp;|&nbsp;
							<a title="Go To Last Page" href="#" data-bind="click: paginator.goToLastPage">&raquo;</a>
						<!-- /ko -->
					</div>

					<!--
					<div align="right" style="padding-bottom:5px" class="Text">
						(Page 1 of 5)&nbsp;&nbsp;&nbsp;&nbsp;
						<a title="Go To First Page" href="">«</a>
						&nbsp;|&nbsp;
						<a href="">Back</a>
						&nbsp;|&nbsp;
						<b>1</b>
						&nbsp;|&nbsp;
						<a href="">2</a>
						&nbsp;|&nbsp;
						<a href="">3</a>
						&nbsp;|&nbsp;
						<a href="">4</a>
						&nbsp;|&nbsp;
						<a href="">5</a>
						&nbsp;|&nbsp;
						<a href="">Next</a>
						&nbsp;|&nbsp;
						<a title="Go To Last Page" href="">»</a>
					</div>
					-->
				</div>
			<!-- /ko -->

			<!-- ko if: pages.editor -->
				<div id="openProject" data-bind="with: pages.editor">
					<div>
						<div class="Heading1" data-bind="text: l10n.title" style="float:left;"></div>
						<input class="Field250" data-bind="value: projectVM.title" style="margin-left: 20px;" />
						<div style="float:right;">
							<!-- ko if: loaded -->
								<!-- ko ifnot: saveInProgress -->
									<button class="SmallButton" data-bind="click: save, text: l10n.save"></button>

									<!-- ko if: $root.campaignMode -->
										<button class="SmallButton" data-bind="click: saveAndClose, text: l10n.next"></button>
									<!-- /ko -->

									<!-- ko ifnot: $root.campaignMode -->
										<button class="SmallButton" data-bind="click: saveAndClose, text: l10n.saveAndClose"></button>
									<!-- /ko -->

									<button class="SmallButton" data-bind="click: preview, text: l10n.preview"></button>

									<button class="SmallButton" data-bind="click: cancel, text: l10n.cancel"></button>
								<!-- /ko -->

								<!-- ko if: saveInProgress -->
									<img src="images/loading.gif" border="0" />
								<!-- /ko -->
							<!-- /ko -->
						</div>
						<div style="clear:both;"></div>
						<div>
							<iframe id="EDMdesigner-editor" style="border-width: 0;margin: 0 auto;min-width: 996px;display:block;" data-bind="attr: {src: src, width: width, height: height}"></iframe>
						</div>
							<!--<div>
								<label data-bind="text: l10n.dynamicContentLabel"></label>
								<a href="#" title="Insert a Custom Field...">
                                	<img src="images/mce_customfields.gif" alt="icon"><span data-bind="text: l10n.customFieldButton, click: dynamicContentHandler.openCustomFieldsPanel"></span>
                            	</a>
                            	<a href="#" title="Insert Unsubscribe Link">
                                	<img src="images/mce_unsubscribelink.gif" alt="icon"><span data-bind="text: l10n.unsubscribeButton, click: dynamicContentHandler.insertUnsubscribeLink"></span>
                            	</a>
                            	<a href="#" title="Insert a Dynamic Content Tag...">
                                	<img src="images/mce_dct_add.gif" alt="icon"><span data-bind="text: l10n.dynamicContentTagButton, click: dynamicContentHandler.openDCTagPanel"></span>
                            	</a>
                            	<a href="#" title="Insert Survey Link">
                                	<img src="images/mnu_surveys_button.gif" alt="icon"><span data-bind="text: l10n.surveyLinkButton, click: dynamicContentHandler.openSurveyLinkPanel"></span>
                            	</a>
                            	<button class="SmallButton" data-bind="click: dynamicContentHandler.cancel, text: l10n.cancel"></button>
							</div>-->
					</div>
				</div>
			<!-- /ko -->

			<!-- ko if: pages.creator -->
				<div data-bind="with: pages.creator">
					<div>
						<div class="Heading1" data-bind="text: l10n.title"></div>
					</div>
					<div>
					<!--
						<span class="required">*</span><span data-bind="text: l10n.templateName"></span> <input class="Field250" data-bind="value: title, valueUpdate: 'afterkeydown'"/>
					-->

						<!-- ko if: selectedTemplate -->
						<button class="SmallButton" data-bind="click: createFromSelected, text: l10n.createFromSelected"></button>
						<!-- /ko -->
						<button class="SmallButton" data-bind="click: createFromScratch, text: l10n.createFromScratch"></button>
						
						<button class="SmallButton" data-bind="click: cancel, text: l10n.cancel"></button>
						
					</div>


					<table border="0" cellspacing="0" cellpadding="0" width="100%" class="Panel" style="margin-top:10px;">
						<thead>
							<tr class="Heading3">
								<td></td>
								<td data-bind="text: l10n.preview.title"></td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td valign="top" width="400">

									<table border="0" cellspacing="0" cellpadding="0" width="100%" style="margin-top:10px;">
										<tr>
											<td width="200" class="FieldLabel">
												<span class="required">*</span> <span data-bind="text: l10n.templateName"></span>
											</td>
											<td width="200" class="FieldLabel">
												<input class="Field250" data-bind="value: title, valueUpdate: 'afterkeydown'"/>
											</td>
										</tr>
										<tr>
											<td width="200" class="FieldLabel">
												<span class="required">*</span> Email Template:
											</td>
											<td>
												<select size="10" id="TemplateSelector" name="TemplateID" data-bind="event: {change: selectTemplateIEHack}">
													<optgroup class="templategroup" data-bind="attr: {'label' : l10n.builtInTemplates}, foreach: defaultTemplates">
														<option data-bind="text: title, css: {'itemSelected': _id === $parent.selectedTemplate()._id}, attr: {'id': _id}"></option>
													</optgroup>
													<!-- ko if: $root.userId !== "templater" -->
													<optgroup class="templategroup" data-bind="attr: {'label' : l10n.customTemplates}, foreach: userTemplates">
														<option data-bind="text: title, css: {'itemSelected': _id === $parent.selectedTemplate()._id},  attr: {'id': _id}"></option>
													</optgroup>
													<!-- /ko -->
												</select>
											</td>
										</tr>
									</table>
								</td>
								<td valign="top">
									<div id="new-template-preview">
										<div id="preview" data-bind="with: preview">
											<table border="0" cellspacing="0" cellpadding="0" width="100%">
												<tr>
													<td valign="middle" align="right">
														<p style="margin:0;" data-bind="text: $parent.l10n.preview.buttonDescription"></p>
													</td>
													<td align="right" width="400">
														<button class="SmallButton" data-bind="click: width.setDesktop, text: $parent.l10n.preview.desktop"></button>
														<button class="SmallButton" data-bind="click: width.setTablet, text: $parent.l10n.preview.tablet"></button>
														<button class="SmallButton" data-bind="click: width.setMobile, text: $parent.l10n.preview.mobile"></button>
													</td>
												</tr>
											</table>
											<div style="clear:both;"></div>
											<div class="preview-iframe-left-holder" data-bind="css: iframeClass, html: iframeHtml">
											</div>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>

				</div>
			<!-- /ko -->

			<!-- ko if: pages.campaignInfo -->
				<div id="campaign-info-editor" data-bind="with: pages.campaignInfo">
					<!-- ko if: working -->
						<img src="images/loading.gif" border="0" width="16" height="16" style="position:absolute;top:300px;left:50%;"/>
					<!-- /ko -->
					<!-- ko ifnot: working -->
						<!-- ko ifnot: htmlResult() -->
						<div class="Heading1" data-bind="text: l10n.title"></div>

						<h2 data-bind="text: l10n.subjectLabel"></h2>
						<input class="Field250" data-bind="value: subject, valueUpdate: 'afterkeydown'" />

						<h2 data-bind="text: l10n.textBodyLabel"></h2>
						<textarea class="Field250" data-bind="value: textBody" rows="25" style="width: 560px;"></textarea>

						<div>
							<!-- ko if: save.allowed -->
							<button class="SmallButton" data-bind="click: save, text: l10n.save"></button>
							<!-- /ko -->
							<button class="SmallButton" data-bind="click: regenerateTextVersion, text: l10n.regenerateTextVersionButton"></button>

							<!-- ko if: addonConfig.spamCheck -->
							<button class="SmallButton" data-bind="click: checkSpam, text: l10n.checkSpamButton"></button>
							<!-- /ko -->
							<button class="SmallButton" data-bind="click: cancel, text: l10n.cancel"></button>
						</div>
						<!-- /ko -->
						<!-- ko if: htmlResult() -->
						<div>
							<button style="float:right;" class="SmallButton" data-bind="click: htmlResult.bind($data, null), text: l10n.close"></button>
							<div style="clear:both;height:0;"></div>
						</div>
						<div style="width:500px;margin:0 auto;padding:10px 20px;border:1px solid #cac7bd;" data-bind="html: htmlResult"></div>

						<!-- /ko -->
					<!-- /ko -->
				</div>
			<!-- /ko -->
		<!-- /ko -->
	<!-- /ko -->
<!-- /ko -->

<script>
	var campaignMode = "{$CampaignMode}";
	campaignMode = campaignMode === "yes";

	var userId = "{$UserId}";
	var langCode = "{$LangCode}";

	var interspireUserId = "{$interspireUserId}";
	var fromEmail = "{$FromEmail}";

	var callbacks = {};

	if (campaignMode) {
		callbacks.insert = function(name, subject, textBody, htmlBody) {

		};

		callbacks.update = function(id, name, subject, textBody, htmlBody) {

		};
	}

	var i18n = {
		projectListVM: {
			title: (function() {
				if (userId === "templater") {
					return "{$lang.Addon_edmdesigner_projectListVM_Title-BuiltInTemplates}";
				}

				if (campaignMode) {
					return "{$lang.Addon_edmdesigner_projectListVM_Title-Campaigns}";
				}

				return "{$lang.Addon_edmdesigner_projectListVM_Title-Templates}";
			}()),
			newProject: (function() {
				if (userId === "templater") {
					return "{$lang.Addon_edmdesigner_projectListVM_NewProject-BuiltInTemplate}";
				}

				if (campaignMode) {
					return "{$lang.Addon_edmdesigner_projectListVM_NewProject-Campaign}";
				}

				return "{$lang.Addon_edmdesigner_projectListVM_NewProject-Template}";
			}()),
			headings: {
				title: "{$lang.Addon_edmdesigner_projectListVM_Headings_Title}",
				category: "{$lang.Addon_edmdesigner_projectListVM_Headings_Category}",
				subject: "{$lang.Addon_edmdesigner_projectListVM_Headings_Subject}",
				active: "{$lang.Addon_edmdesigner_projectListVM_Headings_Active}",
				createdAt: "{$lang.Addon_edmdesigner_projectListVM_Headings_CreatedAt}",
				modifiedAt: "{$lang.Addon_edmdesigner_projectListVM_Headings_ModifiedAt}",
				actions: "{$lang.Addon_edmdesigner_projectListVM_Headings_Actions}",
				archive: "{$lang.Addon_edmdesigner_projectListVM_Headings_Archive}"
			},
			actions: {
				open: "{$lang.Addon_edmdesigner_projectListVM_Actions_Open}",
				editCampaignInfo: "{$lang.Addon_edmdesigner_projectListVM_Actions_EditCampaignInfo}",
				sendCampaign: "{$lang.Addon_edmdesigner_projectListVM_Actions_SendCampaign}",
				preview: "{$lang.Addon_edmdesigner_projectListVM_Actions_Preview}",
				duplicate: "{$lang.Addon_edmdesigner_projectListVM_Actions_Duplicate}",
				remove: "{$lang.Addon_edmdesigner_projectListVM_Actions_Remove}"
			},
			pagination: {
				back: "{$lang.Addon_edmdesigner_projectListVM_Pagination_Back}",
				next: "{$lang.Addon_edmdesigner_projectListVM_Pagination_Next}",

				resultsPerPage: "{$lang.Addon_edmdesigner_projectListVM_Pagination_ResultsPerPage}",
				actPage: "{$lang.Addon_edmdesigner_projectListVM_Pagination_ActPage}"
			}
		},
		previewVM: {
			title: (function() {
				if (userId === "templater") {
					return "{$lang.Addon_edmdesigner_previewVM_Title-BuiltInTemplate}";
				}

				if (campaignMode) {
					return "{$lang.Addon_edmdesigner_previewVM_Title-Campaign}";
				}

				return "{$lang.Addon_edmdesigner_previewVM_Title-Template}";
			}()),

			mobile: "{$lang.Addon_edmdesigner_previewVM_Mobile}",
			tablet: "{$lang.Addon_edmdesigner_previewVM_Tablet}",
			desktop: "{$lang.Addon_edmdesigner_previewVM_Desktop}",

			buttonDescription: "{$lang.Addon_edmdesigner_previewVM_ButtonDescription}",

			close: "{$lang.Addon_edmdesigner_previewVM_Close}",
			exportButton: "{$lang.Addon_edmdesigner_previewVM_Export}",
			exportErrorMessage: "{$lang.Addon_edmdesigner_previewVM_ExportErrorMessage}",
			sendTestEmail: "{$lang.Addon_edmdesigner_previewVM_SendTestEmail}",
			notValidEmails: "{$lang.Addon_edmdesigner_previewVM_NotValidEmails}",
			noEmail: "{$lang.Addon_edmdesigner_previewVM_NoEmail}",
			testSubject: "{$lang.Addon_edmdesigner_previewVM_TestSubject}",
			fromLabel: "{$lang.Addon_edmdesigner_previewVM_FromLabel}",
			toLabel: "{$lang.Addon_edmdesigner_previewVM_ToLabel}",
			subjectLabel: "{$lang.Addon_edmdesigner_previewVM_SubjectLabel}",
			sendButton: "{$lang.Addon_edmdesigner_previewVM_SendButton}",
			checkSpamButton: "{$lang.Addon_edmdesigner_previewVM_CheckSpamButton}"
		},
		editorVM: {
			title: (function() {
				if (userId === "templater") {
					return "{$lang.Addon_edmdesigner_editorVM_Title-BuiltInTemplate}";
				}

				if (campaignMode) {
					return "{$lang.Addon_edmdesigner_editorVM_Title-Campaign}";
				}

				return "{$lang.Addon_edmdesigner_editorVM_Title-Template}";
			}()),
			preview: "{$lang.Addon_edmdesigner_editorVM_Preview}",

			save: "{$lang.Addon_edmdesigner_editorVM_Save}",
			close: "{$lang.Addon_edmdesigner_editorVM_Close}",
			saveAndClose: "{$lang.Addon_edmdesigner_editorVM_SaveAndClose}",
			next: "{$lang.Addon_edmdesigner_editorVM_Next}",
			cancel: "{$lang.Addon_edmdesigner_editorVM_CancelButton}",
			cancelConfirmMessage: "{$lang.Addon_edmdesigner_editorVM_CancelMessage}",
			defaultSubject: "{$lang.Addon_edmdesigner_editorVM_DefaultSubject}",
			back: "{$lang.Addon_edmdesigner_editorVM_Back}",

			dynamicContentLabel: "{$lang.Addon_edmdesigner_editorVM_Dynamic_Content_Label}",
			customFieldButton: "{$lang.Addon_edmdesigner_editorVM_CustomFieldButton}",
			unsubscribeButton: "{$lang.Addon_edmdesigner_editorVM_UnsubscribeButton}",
			dynamicContentTagButton: "{$lang.Addon_edmdesigner_editorVM_DynamicContentButton}",
			surveyLinkButton: "{$lang.Addon_edmdesigner_editorVM_SurveyLinkButton}",
			surveyLinkText: "{$lang.Addon_edmdesigner_editorVM_SurveyLinkDefaultText}"
		},
		confirmDeleteVM: {
			title: (function() {
				if (userId === "templater") {
					return "{$lang.Addon_edmdesigner_confirmDeleteVM_Title-BuiltInTemplate}";
				}

				if (campaignMode) {
					return "{$lang.Addon_edmdesigner_confirmDeleteVM_Title-Campaign}";
				}

				return "{$lang.Addon_edmdesigner_confirmDeleteVM_Title-Template}";
			}()),
			description: (function() {
				if (userId === "templater") {
					return "{$lang.Addon_edmdesigner_confirmDeleteVM_Description-BuiltInTemplate}";
				}

				if (campaignMode) {
					return "{$lang.Addon_edmdesigner_confirmDeleteVM_Description-Campaign}";
				}

				return "{$lang.Addon_edmdesigner_confirmDeleteVM_Description-Template}";
			}()),
			details: "{$lang.Addon_edmdesigner_confirmDeleteVM_Details}",

			project: {
				title: "{$lang.Addon_edmdesigner_confirmDeleteVM_Project_Title}",
				category: "{$lang.Addon_edmdesigner_confirmDeleteVM_Project_Category}",
				active: "{$lang.Addon_edmdesigner_confirmDeleteVM_Project_Active}",
				createdAt: "{$lang.Addon_edmdesigner_confirmDeleteVM_Project_CreatedAt}",
				modifiedAt: "{$lang.Addon_edmdesigner_confirmDeleteVM_Project_ModifiedAt}"
			},

			yes: "{$lang.Addon_edmdesigner_confirmDeleteVM_Yes}",
			no: "{$lang.Addon_edmdesigner_confirmDeleteVM_No}"
		},
		templateSelectorWithPreviewVM: {
			title: (function() {
				if (userId === "templater") {
					return "{$lang.Addon_edmdesigner_templateSelectorWithPreviewVM_Title-BuiltInTemplate}";
				}

				if (campaignMode) {
					return "{$lang.Addon_edmdesigner_templateSelectorWithPreviewVM_Title-Campaign}";
				}

				return "{$lang.Addon_edmdesigner_templateSelectorWithPreviewVM_Title-Template}";
			}()),

			templateName: (function() {
				if (userId === "templater") {
					return "{$lang.Addon_edmdesigner_templateSelectorWithPreviewVM_Name-BuiltInTemplate}";
				}

				if (campaignMode) {
					return "{$lang.Addon_edmdesigner_templateSelectorWithPreviewVM_Name-Campaign}";
				}

				return "{$lang.Addon_edmdesigner_templateSelectorWithPreviewVM_Name-Template}";
			}()),
			createFromSelected: "{$lang.Addon_edmdesigner_templateSelectorWithPreviewVM_CreateFromSelected}",
			createFromScratch: "{$lang.Addon_edmdesigner_templateSelectorWithPreviewVM_CreateFromScratch}",

			builtInTemplates: "{$lang.Addon_edmdesigner_templateSelectorWithPreviewVM_BuiltInTemplates}",
			customTemplates: "{$lang.Addon_edmdesigner_templateSelectorWithPreviewVM_CustomTemplates}",

			cancel: "{$lang.Addon_edmdesigner_templateSelectorWithPreviewVM_CancelButton}",
			cancelConfirmMessage: "{$lang.Addon_edmdesigner_templateSelectorWithPreviewVM_CancelMessage}",
			noNameMessage: "{$lang.Addon_edmdesigner_templateSelectorWithPreviewVM_NoNameMessage}",

			preview: {
				title: "{$lang.Addon_edmdesigner_templateSelectorWithPreviewVM_Preview_Title}",

				mobile: "{$lang.Addon_edmdesigner_templateSelectorWithPreviewVM_Preview_Mobile}",
				tablet: "{$lang.Addon_edmdesigner_templateSelectorWithPreviewVM_Preview_Tablet}",
				desktop: "{$lang.Addon_edmdesigner_templateSelectorWithPreviewVM_Preview_Desktop}",
				buttonDescription: "{$lang.Addon_edmdesigner_templateSelectorWithPreviewVM_Preview_ButtonDescription}"
			}
		},
		subjectAndTextBodyVM: {
			title: "{$lang.Addon_edmdesigner_subjectAndTextVM_Title}",

			subjectLabel: "{$lang.Addon_edmdesigner_subjectAndTextVM_SubjectLabel}",
			textBodyLabel: "{$lang.Addon_edmdesigner_subjectAndTextVM_TextBodyLabel}",

			close: "{$lang.Addon_edmdesigner_subjectAndTextVM_Close}",
			checkSpamButton: "{$lang.Addon_edmdesigner_subjectAndTextVM_CheckSpamButton}",

			regenerateTextVersionButton: "{$lang.Addon_edmdesigner_subjectAndTextVM_RegenerateTextVersionButton}",

			save: "{$lang.Addon_edmdesigner_subjectAndTextVM_Save}",
			cancel: "{$lang.Addon_edmdesigner_subjectAndTextVM_Cancel}",
			cancelConfirmMessage: "{$lang.Addon_edmdesigner_subjectAndTextVM_CancelMessage}"
		}
	};

	var addonConfig = {
		spamCheck: "{$EDMdesignerSpamCheck}" === "true"
	};

	var urls = {
		saveUrl: "{$AddonBaseDirectory}/SaveCampaign.php",
		baseUrl: "{$URL}"
	};

	edmDesignerEntryPoints.projectManager(userId, interspireUserId, fromEmail, i18n, campaignMode, langCode, urls, callbacks);
</script>
