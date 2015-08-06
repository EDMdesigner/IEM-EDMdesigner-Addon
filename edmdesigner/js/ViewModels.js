var initEDMdesignerViewModels = (function($, ko) {
	return function init(edmPlugin, fromEmailAddress, i18n, langCode, loading, campaignMode) {
		var iframeId = "#EDMdesigner-editor";

		if (langCode === "") {
			langCode = "en";
		}

		function dateToLocaleString(dateString) {
			var m_names = new Array("Jan", "Feb", "Mar",
			"Apr", "May", "Jun", "Jul", "Aug", "Sep",
			"Oct", "Nov", "Dec");

			var d = new Date(dateString);
			var curr_date = d.getDate();
			var curr_month = d.getMonth();
			var curr_year = d.getFullYear();

			return curr_date + " " + m_names[curr_month] + " " + curr_year;
		}

		function projectVM(json, callbacks) {
			if (!json) {
				throw "No input data - projectVM";
			}

			var _id = json._id;

			var title = ko.observable(json.title);
			var description = ko.observable(json.description);

			var createdAt = json.createdOn ? dateToLocaleString(json.createdOn) : "-";
			var modifiedAt = json.lastModified ? dateToLocaleString(json.lastModified) : "-";

			var category = ko.observable("-");
			var active = ko.observable(false);
			var archive = ko.observable(false);
			active.loading = ko.observable(false);
			archive.loading = ko.observable(false);


			//These two variables needed only when it's a campaign
			var subject = ko.observable("");
			var textBody = ko.observable("");

			var isCampaign = false;

			if (json.customData) {
				if (json.customData.category) {
					category(json.customData.category);
				}

				if (json.customData.active) {
					active(json.customData.active);
				}

				if (json.customData.archive) {
					archive(json.customData.archive);
				}

				if (json.customData.campaign) {
					isCampaign = json.customData.campaign;

					if (json.customData.subject) {
						subject(json.customData.subject);
					}

					if (json.customData.textBody) {
						textBody(json.customData.textBody);
					}
				}
			}

			active.toggle = function() {
				var customData = {
					category: category(),
					active: !active(),
					campaign: isCampaign
				};

				if (isCampaign) {
					customData.subject = subject();
					customData.textBody = textBody();
					customData.archive = archive();
				}

				active.loading(true);
				edmPlugin.updateProjectInfo(_id, {customData: customData}, function(result) {
					if (isCampaign && callbacks && typeof callbacks.setCampaignActivated) {
						callbacks.setCampaignActivated(vm, function() {
							active(!active());
							active.loading(false);
						});
					} else {
						active(!active());
						active.loading(false);
					}
				});
			};

			archive.toggle = function() {
				var customData = {
					category: category(),
					active: active(),
					campaign: isCampaign,
				};

				if (isCampaign) {
					customData.subject = subject();
					customData.textBody = textBody();
					customData.archive = !archive();
				}

				archive.loading(true);
				edmPlugin.updateProjectInfo(_id, {customData: customData}, function(result) {
					if (isCampaign && callbacks && typeof callbacks.setCampaignArchivated) {
						callbacks.setCampaignArchivated(vm, function() {
							archive(!archive());
							archive.loading(false);
						});
					} else {
						archive(!archive());
						archive.loading(false);
					}
				});
			};

			var vm = {
				_id: _id,

				title: title,
				description: description,

				createdAt: createdAt,
				modifiedAt: modifiedAt,

				category: category,
				active: active,
				archive: archive,

				customData: json.customData
			};

			vm.open = function open() {
				if (callbacks && typeof callbacks.editProject === "function") {
					callbacks.editProject(vm);
				}
			};

			vm.preview = function preview() {
				if (callbacks && typeof callbacks.previewProject === "function") {
					callbacks.previewProject(vm);
				}
			};

			vm.remove = function remove() {
				if (callbacks && typeof callbacks.removeProject === "function") {
					callbacks.removeProject(vm);
				}
			};

			vm.duplicate = function duplicate() {
				if (callbacks && typeof callbacks.duplicateProject === "function") {
					callbacks.duplicateProject(vm);
				}
			};

			if (isCampaign) {
				vm.subject = subject;
				vm.textBody = textBody;

				vm.editCampaignInfo = function editCampaignInfo() {
					if (callbacks && typeof callbacks.editCampaignInfo === "function") {
						callbacks.editCampaignInfo(vm);
					}
				};

				vm.sendCampaign = function sendCampaign() {
					if (callbacks && typeof callbacks.sendCampaign === "function") {
						callbacks.sendCampaign(vm);
					}
				};
			}

			return vm;
		}

		function previewVM(project, callbacks, isDefaultTemplate) {
			var l10n = {
				title: "Title",

				mobile: "Mobile",
				tablet: "Tablet",
				desktop: "Desktop",

				close: "Close",
				exportButton: "Export",
				exportErrorMessage: "Export failed. Please try again later!",
				sendTestEmail: "Send test email",
				notValidEmails: "Please enter a valid email address",
				noEmail: "Please enter an email address",
				testSubject: "Test email",
				fromLabel: "From",
				toLabel: "To",
				subjectLabel: "Subject",
				sendButton: "Send",
				checkSpamButton: "Check your email for spam"
			};

			if (i18n && i18n.previewVM) {
				l10n = i18n.previewVM;
			}

			var widths = {
				mobile: 480,
				tablet: 800,
				desktop: 889
			};

			var width = ko.observable(widths.desktop);
			width.setMobile = function() {
				exportMode(false);
				sendEmailMode(false);
				htmlResult(null);
				width(widths.mobile);
			};
			width.setTablet = function() {
				exportMode(false);
				sendEmailMode(false);
				htmlResult(null);
				width(widths.tablet);
			};
			width.setDesktop = function() {
				exportMode(false);
				sendEmailMode(false);
				htmlResult(null);
				width(widths.desktop);
			};

			var exportMode = ko.observable(false);
			var html = ko.observable(null);

			function templateExport() {
				exportMode(true);
				sendEmailMode(false);
				htmlResult(null);
				width(widths.desktop);
				if(html() && html() !== l10n.exportErrorMessage) {
					return;
				}
				edmPlugin.generateProject(project._id, function(generatedHtml) {
					console.log("Generated!");
					if(generatedHtml.err) {
						return html(l10n.exportErrorMessage);
					}
					html(generatedHtml);
				});
			}

			var sendEmailMode = ko.observable(false);
			var fromEmail = ko.observable(fromEmailAddress);
			var toEmail = ko.observable("");
			var testSubject = ko.observable(l10n.testSubject);

			var htmlResult = ko.observable(null);
			var working = ko.observable(false);

			function changeToSendEmailMode() {
				exportMode(false);
				sendEmailMode(true);
				width(widths.desktop);
				htmlResult(null);
			}

			function sendTestEmail() {
				var from = fromEmail();
				var to = toEmail();
				to = to.trim();
				var subject = testSubject();
				if(from === "" ||  to === "") {
					return alert(l10n.noEmail);
				}
				if(!validateEmail(from) || !validateEmail(to)) {
					return alert(l10n.notValidEmails);
				}
				if(subject === "") {
					subject = l10n.testSubject;
				}
				if(callbacks && typeof callbacks.sendTestEmail === "function") {
					working(true);
					callbacks.sendTestEmail(from, to, subject, function(result) {
						htmlResult(result);
						working(false);
					});
				}
			}

			function validateEmail(email) {
				var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(email);
			}

			function checkSpam() {
				if(callbacks && typeof callbacks.checkSpam === "function") {
					exportMode(false);
					sendEmailMode(true);
					width(widths.desktop);
					working(true);
					callbacks.checkSpam(function(result) {
						htmlResult(result);
						working(false);
					});
				}
			}

			var src = ko.observable("");

			var iframeClass  = ko.computed(function(){
				if(width() === widths.mobile){
					return "preview-mobile";
				} else if(width() === widths.tablet){
					return "preview-tablet";
				} else {
					return "preview-desktop";
				}
			});

			//should be used only in the creator view
			var iframeHtml = ko.computed(function() {
				var iSrc = src();
				var iClass = iframeClass();

				if (iSrc === "") {
					return "";
				}

				return "<iframe src=\"" + iSrc + "\" class=\"preview-iframe-left " + iClass + "\"></iframe>";
			});

			if (isDefaultTemplate) {
				edmPlugin.previewDefaultProject(project._id, function(result) {
					src(result.src);
				});
			} else {
				edmPlugin.previewProject(project._id, function(result) {
					src(result.src);
				});
			}

			function close() {
				exportMode(false);
				html(null);
				if (callbacks && typeof callbacks.close === "function") {
					callbacks.close();
				}
			}


			loading(false);

			return {
				l10n: l10n,

				width: width,
				src: src,
				iframeClass: iframeClass,
				iframeHtml: iframeHtml,

				html: html,
				exportMode: exportMode,
				templateExport: templateExport,

				sendEmailMode: sendEmailMode,
				sendTestEmail: sendTestEmail,
				changeToSendEmailMode: changeToSendEmailMode,
				fromEmail: fromEmail,
				toEmail: toEmail,
				testSubject: testSubject,
				htmlResult: htmlResult,

				checkSpam: checkSpam,
				working: working,

				close: close
			};
		}

		function editorVM(projectVM, callbacks) {
			var loaded = ko.observable(false);

			window.dynamicContentHandler = {
				basePanel: null,
				selectedText: null,

				oldInsertLinkFunction: null,
				oldInsertAndCloseFunction: null,

				openCustomFieldsPanel: openCustomFieldsPanel,
				openDCTagPanel: openDCTagPanel,
				openSurveyLinkPanel: openSurveyLinkPanel,

				insertUnsubscribeLink: insertUnsubscribeLink,
				insertSurveyLink: insertSurveyLink
			};

			function createContent() {
				return "<div class=\"dynamic-content-panel-link\"><a href=\"#\" title=\"" + l10n.customFieldButton + "\" id=\"edm-dynamic-content-cf\">" +
				"<img src=\"images/mce_customfields.gif\" alt=\"icon\">" + l10n.customFieldButton +
				"</a></div>" +
				"<div class=\"dynamic-content-panel-link\"><a href=\"#\" title=\"" + l10n.unsubscribeButton + "\" id=\"edm-dynamic-content-uns\">" +
				"<img src=\"images/mce_unsubscribelink.gif\" alt=\"icon\">" + l10n.unsubscribeButton +
				"</a></div>" +
				"<div class=\"dynamic-content-panel-link\"><a href=\"#\" title=\"" + l10n.dynamicContentTagButton + "\" id=\"edm-dynamic-content-dct\">" +
				"<img src=\"images/mce_dct_add.gif\" alt=\"icon\">" + l10n.dynamicContentTagButton +
				"</a></div>" +
				"<div class=\"dynamic-content-panel-link\"><a href=\"#\" title=\"" + l10n.surveyLinkButton + "\" id=\"edm-dynamic-content-sl\">" +
				"<img src=\"images/mnu_surveys_button.gif\" alt=\"icon\">" + l10n.surveyLinkButton +
				"</a></div>" +
				"<script>" +
				"	$(\"#edm-dynamic-content-cf\").click(function() {" +
				"		window.dynamicContentHandler.openCustomFieldsPanel();" +
				"	});" +
				"	$(\"#edm-dynamic-content-uns\").click(function() {" +
				"		window.dynamicContentHandler.insertUnsubscribeLink();" +
				"	});" +
				"	$(\"#edm-dynamic-content-dct\").click(function() {" +
				"		window.dynamicContentHandler.openDCTagPanel();" +
				"	});" +
				"	$(\"#edm-dynamic-content-sl\").click(function() {" +
				"		window.dynamicContentHandler.openSurveyLinkPanel();" +
				"	});" +
				"</script>";
			}

			function openCustomFieldsPanel() {
				dynamicContentHandler.oldInsertLinkFunction = window.InsertLink;
				window.InsertLink = _insertPlaceholder;
				ShowCustomFields("html", "myDevEditControl", "Newsletters");
				if(window.dynamicContentHandler.basePanel) {
					window.dynamicContentHandler.basePanel.close();
				}
			}
			
			function openDCTagPanel() {
				dynamicContentHandler.oldInsertLinkFunction = window.InsertLink;
				window.InsertLink = _insertPlaceholder;
				ShowDynamicContentTag("html", "myDevEditControl", "%%PAGE%%");
				if(window.dynamicContentHandler.basePanel) {
					window.dynamicContentHandler.basePanel.close();
				}
			}

			function openSurveyLinkPanel() {
				dynamicContentHandler.oldInsertAndCloseFunction = window._insertAndClose;
				window._insertAndClose = insertSurveyLink;
				window.InsertSurveyLink();
				if(window.dynamicContentHandler.basePanel) {
					window.dynamicContentHandler.basePanel.close();
				}
			}

			function _insertToCursor(content) {
				var iframe = $(iframeId);
				var win = iframe[0].contentWindow;
				var iframeSrc = iframe.attr("src");
				var host = location.protocol + iframeSrc.split("?")[0];

				var message = {
					action: "InsertToCursor",
					content: content
				};

				try {
					win.postMessage(JSON.stringify(message), host);
				} catch(e) {
					console.log("Error, the data is not a correct json");
				}

				if(window.dynamicContentHandler.oldInsertLinkFunction) {
					window.InsertLink = dynamicContentHandler.oldInsertLinkFunction;
					dynamicContentHandler.oldInsertLinkFunction = null;
				}

				if(window.dynamicContentHandler.oldInsertAndCloseFunction) {
					window._insertAndClose = window.dynamicContentHandler.oldInsertAndCloseFunction;
					dynamicContentHandler.oldInsertAndCloseFunction = null;
				}

				if(window.dynamicContentHandler.selectedText) {
					window.dynamicContentHandler.selectedText = null;
				}

				if($.fn.window) {
					$.fn.window.closeAll();
				}
			}

			function insertUnsubscribeLink() {
				_insertPlaceholder("unsubscribelink");
			}

			function _insertPlaceholder(placeholder) {

				placeholder = '%%' + placeholder + '%%';

				if (placeholder == '%%unsubscribelink%%')
				{
					placeholder = "<a href='%%unsubscribelink%%'>" + UnsubLinkPlaceholder + "</a>";
				}
				if (placeholder == '%%facebookshare%%')
				{
					placeholder = "<a href='%%facebookshare%%'>" + FacebookSharePlaceholder + "</a>";
				}
				if (placeholder == '%%twittershare%%')
				{
					placeholder = "<a href='%%twittershare%%'>" + TwitterSharePlaceholder + "</a>";
				}
				if (placeholder == '%%hyvesshare%%')
				{
					placeholder = "<a href='%%hyvesshare%%'>" + HyvesSharePlaceholder + "</a>";
				}
				if (placeholder == '%%linkedinshare%%')
				{
					placeholder = "<a href='%%linkedinshare%%'>" + LinkedinSharePlaceholder + "</a>";
				}

				modcheck_regex = new RegExp("%%modifydetails_(.*?)%%", "i");
				modcheck = modcheck_regex.exec(placeholder);

				if (modcheck)
				{
					placeholder = "<a href='http://%%modifydetails_" + modcheck[1] + "%%/'>" + placeholder + "</a>";
				}

				modcheck_regex = new RegExp("%%sendfriend_(.*?)%%", "i");
				modcheck = modcheck_regex.exec(placeholder);

				if (modcheck)
				{
					placeholder = "<a href='http://%%sendfriend_" + modcheck[1] + "%%/'>" + placeholder + "</a>";
				}

				_insertToCursor(placeholder);
			}

			function insertSurveyLink() {
				var radio = $('#tinymce-module-form-list').find(':radio:checked');
				if(!radio) {
					return;
				}
				var id = radio.val();
				var surveyname = $('input[name=surveyId]:checked + label').text();
				var placeholder = '%%SURVEY_' + id + '_LINK%%';
				
				var selectedText = dynamicContentHandler.selectedText;
				if (selectedText && selectedText !== "") {
					placeholder = '<a href=\"' + placeholder + '\">' + dynamicContentHandler.selectedText + '</a>';
				} else {
					placeholder = '<a href=\"' + placeholder + '\">' + l10n.surveyLinkText + '</a>';
				}

				_insertToCursor(placeholder);
			}

			function listenForLoaded(event) {
				console.log(event);

				if (event.data === "ProjectLoadingSuccess") {
					loaded(true);
					save();
				} else {
					var message = {};
					try {
						message = JSON.parse(event.data);
					} catch(e) {
						console.log("Not json message!");
					}
					if(message.action === "setDynamicContent") {
						window.dynamicContentHandler.basePanel = $.fn.window.create({
							title: l10n.dynamicContentLabel,
							height: 180,
							width: 450,
							content: createContent()
						});
						window.dynamicContentHandler.basePanel.open();
						if(message.content) {
							dynamicContentHandler.selectedText = message.content;
						}
					}
				}
			}

			if (window.addEventListener){
				removeEventListener("message", listenForLoaded);
				addEventListener("message", listenForLoaded, false);
			} else {
				detachEvent("onmessage", listenForLoaded);
				attachEvent("onmessage", listenForLoaded);
			}

			var src = ko.observable("");

			var width = ko.observable(996);
			var height = ko.observable(0);

			var marginLeft = ko.observable();

			var l10n = {
				title: "Edit template",
				preview: "Preview",
				lightBox: "Lightbox",
				save: "Save",
				close: "Close",
				saveAndClose: "Save and close",
				cancel: "Cancel",
				next: "Next",
				back: "Back",
				defaultSubject: "Default subject",
				cancelConfirmMessage: "Are you sure you want to cancel? Your unsaved data will be lost",

				dynamicContentLabel: "Please select what kind of dynamic content do you want to use:",
				customFieldButton: "Insert a Custom Field...",
				unsubscribeButton: "Insert Unsubscribe Link",
				dynamicContentTagButton: "Insert a Dynamic Content Tag...",
				surveyLinkButton: "Insert Survey Link",
				surveyLinkText: "Survey Link"
			};

			if (i18n && i18n.editorVM) {
				l10n = i18n.editorVM;
			}

			function setEditorHeight() {
				var windowHeight = $(window).height();
				var headerHeight = $(".Header").height();
				var menuBarHeight = $(".menuBar").height();

				height(windowHeight - headerHeight - menuBarHeight - 150);

				marginLeft(Math.floor(($(".BodyContainer").width() - width()) / 2) + "px");
			}
			setEditorHeight();

			var saveInProgress = ko.observable(false);

			function saveDoc(callback, noDeselect) {
				var iframe = $(iframeId);
				var win = iframe[0].contentWindow;
				var iframeSrc = iframe.attr("src");
				var host = location.protocol + iframeSrc.split("?")[0];

				saveInProgress(true);

				function savingResult(event) {
					var origin = location.protocol + iframeSrc.split("?")[0];

					if(event.origin !== origin) {
						console.log("Unknown origin!");
						saveInProgress(false);
						return;
					}

					console.log(event.data);
					if(event.data === "Save result: success") {
						console.log("Save success...");
					} else if (event.data === "Save result: failed") {
						console.log("Save failed...");
					} else {
						return;
					}
					saveInProgress(false);

					if (typeof callback === "function") {
						callback(event.data === "Save result: success", projectVM);
					}
					//$(window).off("message");

					if (window.removeEventListener) {
						removeEventListener("message", savingResult);
					} else {
						detachEvent("onmessage", savingResult);
					}
				}

				//*
				if (window.addEventListener){
					addEventListener("message", savingResult, false);
				} else {
					attachEvent("onmessage", savingResult);
				}
				//*/

				if (typeof noDeselect === "boolean" && noDeselect) {
					win.postMessage("saveProjectNoDeselect", host);
				} else {
					win.postMessage("saveProject", host);
				}
				//$(window).on("message", savingResult);
			}

			function save (noDeselect) {
				if(campaignMode) {
					var subject = projectVM.subject();

					if(subject === "") {
						projectVM.subject(projectVM.title() || (i18n && i18n.editorVM && i18n.editorVM.defaultSubject) ? i18n.editorVM.defaultSubject : "default subject");
					}
				}

				saveDoc(callbacks.save, noDeselect);
			}

			if (addonConfig.autoSave) {
				var timeoutId;
				window.addEventListener("message", function(event) {
					if (event.data === "JsonChanged") {
						if (timeoutId) {
							clearTimeout(timeoutId);
						}

						console.log("Autosaving in 5s.");

						timeoutId = setTimeout(function() {
							var iframe = $(iframeId);
							if (iframe.length > 0) {
								save(true);
								timoutId = null;
							}
						}, 5000);
					}
				});
			}

			function close() {
				if (callbacks && typeof callbacks.close === "function") {
					callbacks.close(projectVM);
				}
			}
			
			function cancel() {
				if(callbacks && typeof callbacks.cancel === "function") {
					callbacks.cancel();
				}
			}

			function saveAndClose() {
				saveDoc(callbacks.saveAndClose);
			}

			function preview() {
				saveDoc(callbacks.preview);
			}

			edmPlugin.openProject(projectVM._id, langCode, {autosave: 0}, function(result) {
				src(result.url + "&consoleLog=on&imageMaxWidth=" + addonConfig.imageMaxWidth);
				loading(false);
			});


			function openLightBox() {
				$("#EDMdesigner-editor-wrapper").addClass("lightBoxWrapper");
			}

			function closeLightBox() {
				$("#EDMdesigner-editor-wrapper").removeClass("lightBoxWrapper");
			}

			return {
				l10n: l10n,

				width: width,
				height: height,

				marginLeft: marginLeft,

				projectVM: projectVM,
				src: src,

				saveInProgress: saveInProgress,

				openLightBox: openLightBox,
				closeLightBox: closeLightBox,

				save: save,
				close: close,
				cancel: cancel,
				saveAndClose: saveAndClose,

				//showDynamicContentModal: showDynamicContentModal,
				dynamicContentHandler: dynamicContentHandler,

				preview: preview,

				loaded: loaded
			};
		}

		function confirmDeleteVM(projectVM, callbacks) {
			function confirm() {
				if (callbacks && typeof callbacks.confirm === "function") {
					callbacks.confirm(projectVM);
				}
			}

			var l10n = {
				title: "Confirm delete",
				description: "Be careful, you can't undo it!",
				details: "Details",

				project: {
					title: "Title",
					category: "Category",
					active: "Active",
					createdAt: "Created at",
					modifiedAt: "Modified at"
				},

				yes: "Yes, delete!",
				no: "No way!"
			};

			if (i18n && i18n.confirmDeleteVM) {
				l10n = i18n.confirmDeleteVM;
			}

			function cancel() {
				if (callbacks && typeof callbacks.cancel === "function") {
					callbacks.cancel(projectVM);
				}
			}

			loading(false);

			return {
				l10n: l10n,

				projectVM: projectVM,

				confirm: confirm,
				cancel: cancel
			};
		}

		//this view model can be an entry point to the application
		function projectListVM(projects, callbacks) {
			function doNothing () {}

			var l10n = {
				title: "Templates",
				newProject: "New template",
				headings: {
					title: "Title",
					description: "Description",
					subject: "Subject",
					category: "Category",
					active: "Active",
					createdAt: "Created at",
					modifiedAt: "Modified at",
					actions: "Actions"
				},
				actions: {
					open: "Open",
					editCampaignInfo: "Edit info",
					sendCampaign: "Send",
					preview: "Preview",
					duplicate: "Duplicate",
					remove: "Delete"
				}
			};

			if (i18n && i18n.projectListVM) {
				l10n = i18n.projectListVM;
			}

			var editProject			= doNothing,
				previewProject		= doNothing,
				removeProject		= doNothing,
				duplicateProject	= doNothing,

				createProject		= doNothing,

				editCampaignInfo	= doNothing,
				sendCampaign		= doNothing,
				setCampaignActivated = doNothing;

			if (typeof callbacks === "object") {
				if (callbacks.editProject) {
					editProject = callbacks.editProject;
				}

				if (typeof callbacks.previewProject === "function") {
					previewProject = callbacks.previewProject;
				}

				if (typeof callbacks.removeProject === "function") {
					removeProject = callbacks.removeProject;
				}

				if (typeof callbacks.duplicateProject === "function") {
					duplicateProject = callbacks.duplicateProject;
				}

				if (typeof callbacks.createProject === "function") {
					createProject = callbacks.createProject;
				}

				if (typeof callbacks.editCampaignInfo === "function") {
					editCampaignInfo = callbacks.editCampaignInfo;
				}

				if (typeof callbacks.sendCampaign === "function") {
					sendCampaign = callbacks.sendCampaign;
				}

				if (typeof callbacks.setCampaignActivated === "function") {
					setCampaignActivated = callbacks.setCampaignActivated;
				}
			}


			var projectList = [];
			for (var idx = 0; idx < projects.length; idx += 1) {
				projectList.push(projectVM(projects[idx], {
					editProject: editProject,
					previewProject: previewProject,
					removeProject: removeProject,
					duplicateProject: duplicateProject,

					editCampaignInfo: editCampaignInfo,
					sendCampaign: sendCampaign,

					setCampaignActivated: setCampaignActivated
				}));
			}

			loading(false);

			return {
				l10n: l10n,

				//filter: filter,

				//itemsPerPage: itemsPerPage,
				//actPageNum: actPageNum,
				//totalNumOfItems: totalNumOfItems,

				//select: select,
				//sort: sort,

				projects: projectList,

				createProject: createProject
			};
		}

		function projectListVM2(callbacks) {
			function doNothing () {}

			var l10n = {
				title: "Templates",
				newProject: "New template",
				headings: {
					title: "Title",
					description: "Description",
					subject: "Subject",
					category: "Category",
					active: "Active",
					archive: "Archive",
					createdAt: "Created at",
					modifiedAt: "Modified at",
					actions: "Actions"
				},
				actions: {
					open: "Open",
					editCampaignInfo: "Edit info",
					preview: "Preview",
					duplicate: "Duplicate",
					remove: "Delete"
				}
			};

			if (i18n && i18n.projectListVM) {
				l10n = i18n.projectListVM;
			}

			var editProject			= doNothing,
				previewProject		= doNothing,
				removeProject		= doNothing,
				duplicateProject	= doNothing,

				createProject		= doNothing,

				editCampaignInfo	= doNothing,
				sendCampaign		= doNothing,
				setCampaignActivated = doNothing;
				setCampaignArchivated = doNothing;

			if (typeof callbacks === "object") {
				if (callbacks.editProject) {
					editProject = callbacks.editProject;
				}

				if (typeof callbacks.previewProject === "function") {
					previewProject = callbacks.previewProject;
				}

				if (typeof callbacks.removeProject === "function") {
					removeProject = callbacks.removeProject;
				}

				if (typeof callbacks.duplicateProject === "function") {
					duplicateProject = callbacks.duplicateProject;
				}

				if (typeof callbacks.createProject === "function") {
					createProject = callbacks.createProject;
				}

				if (typeof callbacks.editCampaignInfo === "function") {
					editCampaignInfo = callbacks.editCampaignInfo;
				}

				if (typeof callbacks.sendCampaign === "function") {
					sendCampaign = callbacks.sendCampaign;
				}

				if (typeof callbacks.setCampaignActivated === "function") {
					setCampaignActivated = callbacks.setCampaignActivated;
				}

				if (typeof callbacks.setCampaignArchivated === "function") {
					setCampaignArchivated = callbacks.setCampaignArchivated;
				}
			}


			function searchApplyFunction(options, done) {
				loading(true);
				var findObject = {};
				if (campaignMode) {
					findObject["customData.campaignId"] = {"$exists": true};
				} else {
					findObject["customData.campaignId"] = {"$exists": false};
				}

				var queryParams = {
					settings: {
						find: findObject,
						limit: options.pageSize,
						skip: options.pageIndex * options.pageSize,
						sort: sortObj()
					}
				};

				edmPlugin.listAndCountProjects(queryParams, function(result) {
					var projects = [];
					//It's possible to filter the result here.
					//Without modifying the api, this is the only place to do it
					/*
					if (campaignMode) {
						projects = result.filter(function(element) {
							return element.customData && element.customData.campaign;
						});
					} else {
						projects = result.filter(function(element) {
							return !element.customData || !element.customData.campaign;
						});
					}
					*/

					projects = result.result;

					var projectVMs = [];

					for (var idx = 0; idx < projects.length; idx += 1) {
						projectVMs.push(projectVM(projects[idx], {
							editProject: editProject,
							previewProject: previewProject,
							removeProject: removeProject,
							duplicateProject: duplicateProject,

							editCampaignInfo: editCampaignInfo,
							sendCampaign: sendCampaign,

							setCampaignActivated: setCampaignActivated,
							setCampaignArchivated: setCampaignArchivated
						}));
					}

					loading(false);
					done(projectVMs, result.totalCount);
				});
			}

			var findObject = ko.observable({});

			var fieldObjects = [
				{
					value: "title",
					display: l10n.headings.title,
					asc: 1,
					sorter: true
				},
				{
					value: "subject",
					display: l10n.headings.subject,
					asc: 1,
					sorter: true
				},
				{
					value: "active",
					display: l10n.headings.active,
					asc: 1,
					sorter: false
				},
				{
					value: "archive",
					display: l10n.headings.archive,
					asc: 1,
					sorter: false
				},
				{
					value: "createdOn",
					display: l10n.headings.createdAt,
					asc: -1,
					sorter: true,
					selected: true
				},
				{
					value: "lastModified",
					display: l10n.headings.modifiedAt,
					asc: 1
				}
			];

			var sortObj = ko.observable({
				lastModified: -1
			});

			function ascDescSorter(propertyName) {
				function asc() {
					var obj = {};
					obj[propertyName] = 1;
					sortObj(obj);
				}

				function desc() {
					var obj = {};
					obj[propertyName] = -1;
					sortObj(obj);
				}

				return {
					asc: asc,
					desc: desc
				};
			}

			var sortBy = {
				title: ascDescSorter("title"),
				subject: ascDescSorter("customData.subject"),
				createdAt: ascDescSorter("createdOn"),
				modifiedAt: ascDescSorter("lastModified")
			};



			var configObject = {
				clickingOnRowEnabled: false,
				pageSizes: [5, 10, 20, 30, 50, 100],
				defaultPageSize: 10
			};



			var list = ListUtilVM(searchApplyFunction, findObject, fieldObjects, configObject);

			list.l10n = l10n;
			list.createProject = createProject;

			list.sortBy = sortBy;

			return list;
		}

		//this view model can be an entry point
		//createFromTemplate, createFromScratch, cancel.
		function templateSelectorWithPreviewVM(withUserTemplates, callbacks) {
			loading(true);

			var l10n = {
				title: "New template",

				templateName: "Template name",
				createFromSelected: "Create from selected template",

				builtInTemplates: "Built-in templates",
				customTemplates: "Your templates",

				noNameMessage: "Please enter a name for your email campaign",

				cancel: "Cancel",

				preview: {
					title: "Preview",

					mobile: "Mobile",
					tablet: "Tablet",
					desktop: "Desktop"
				}
			};

			if (i18n && i18n.templateSelectorWithPreviewVM) {
				l10n = i18n.templateSelectorWithPreviewVM;
			}

			var title = ko.observable("");

			var selectedTemplate = ko.observable(null);

			var defaultTemplates = ko.observableArray([]);
			var userTemplates = ko.observableArray([]);

			var preview = ko.computed(function() {
				var sel = selectedTemplate();

				if (!sel) {
					return null;
				}

				var defIdx = defaultTemplates.indexOf(sel);

				return previewVM(sel, {}, defIdx > -1);
			});

			var createEnabled = ko.computed(function() {
				return title() !== "";
			});

			function createFromSelected() {
				if(!createFromSelected.enabled()) {
					return alert(l10n.noNameMessage);
				}
				if (callbacks && typeof callbacks.createFromSelected === "function") {
					callbacks.createFromSelected(selectedTemplate(), title(), defaultTemplates.indexOf(selectedTemplate()) > -1);
				}
			}
			createFromSelected.enabled = createEnabled;

			function createFromScratch() {
				if(!createFromScratch.enabled()) {
					return alert(l10n.noNameMessage);
				}
				if (callbacks && typeof callbacks.createFromScratch === "function") {
					callbacks.createFromScratch(title());
				}
			}
			createFromScratch.enabled = createEnabled;

			function cancel() {
				if (callbacks && typeof callbacks.cancel === "function") {
					callbacks.cancel();
				}
			}

			function selectTemplate(project) {
				selectedTemplate(project);
			}

			function selectTemplateIEHack(project) {
				//var ua = window.navigator.userAgent;

				//var oldIe = ua.indexOf("MSIE ") > -1;
				//var newIe = ua.indexOf("Trident/") > -1;

				//if(!oldIe && !newIe) {
				//	return;
				//}

				var selectedId = $("#TemplateSelector option:selected").attr("id");

				var selTemplate = null;

				var actArray = defaultTemplates();

				for (var idx = 0; idx < actArray.length; idx += 1) {
					var act = actArray[idx];
					if (act._id === selectedId) {
						selTemplate = act;
						break;
					}
				}

				if (!selTemplate) {
					actArray = userTemplates();
					for (var idx = 0; idx < actArray.length; idx += 1) {
						var act = actArray[idx];
						if (act._id === selectedId) {
							selTemplate = act;
							break;
						}
					}					
				}

				selectedTemplate(selTemplate);
			}

			var defaultTemplatesLoaded = false,
				userTemplatesLoaded = !withUserTemplates;

			edmPlugin.getDefaultTemplates(function(result) {
				result = result.filter(function(element) {
					return element.customData && element.customData.active;
				});

				defaultTemplates(result);

				if (result instanceof Array && result.length > 0) {
					selectTemplate(result[0]);
				}

				if (userTemplatesLoaded) {
					loading(false);
				}
				defaultTemplatesLoaded = true;
			});

			if (withUserTemplates) {
				edmPlugin.listProjects(function(result) {
					result = result.filter(function(element) {
						return element.customData && element.customData.active && !element.customData.campaign;
					});
					userTemplates(result);

					if (selectedTemplate() === null) {
						if (result instanceof Array && result.length > 0) {
							selectTemplate(result[0]);
						}
					}

					if (defaultTemplatesLoaded) {
						loading(false);
					}

					userTemplatesLoaded = true;
				});
			}

			return {
				l10n: l10n,

				title: title,

				selectedTemplate: selectedTemplate,
				defaultTemplates: defaultTemplates,
				userTemplates: userTemplates,

				preview: preview,

				selectTemplate: selectTemplate,
				selectTemplateIEHack: selectTemplateIEHack,

				createFromSelected: createFromSelected,
				createFromScratch: createFromScratch,
				cancel: cancel
			};
		}

		function subjectAndTextBodyVM(projectVM, callbacks) {
			var subject = ko.observable(projectVM.subject());
			if (subject() === "") {
				subject(projectVM.title());
			}
			var textBody = ko.observable("");

			if (callbacks.init) {
				callbacks.init(textBody);
			}

			var working = ko.observable(false);

			loading(false);

			var l10n = {
				title: "Subject and text body",

				subjectLabel: "Subject",
				textBodyLabel: "Text body",

				close: "Close",
				checkSpamButton: "Check for spam",

				regenerateTextVersionButton: "Regenerate text version",

				save: "Save",
				cancel: "Cancel",
				cancelConfirmMessage: "Are you sure? Your unsaved data will be lost"
			};

			if (i18n && i18n.subjectAndTextBodyVM) {
				l10n = i18n.subjectAndTextBodyVM;
			}

			function save() {
				if (callbacks && typeof callbacks.save === "function") {
					projectVM.subject(subject());
					projectVM.textBody(textBody());
					
					callbacks.save(projectVM);
				}
			}

			save.allowed = ko.computed(function() {
				return subject() !== "";
			});

			function cancel() {
				if (callbacks && typeof callbacks.cancel === "function") {
					callbacks.cancel();
				}
			}

			var htmlResult = ko.observable(null);

			function checkSpam() {
				if(callbacks && typeof callbacks.checkSpam === "function") {
					working(true);
					callbacks.checkSpam(function(result) {
						htmlResult(result);
						working(false);
					}, textBody());
				}
			}

			function regenerateTextVersion() {
				textBody(callbacks.regenerateTextVersion())
			}

			return {
				l10n: l10n,

				subject: subject,
				textBody: textBody,

				checkSpam: checkSpam,
				htmlResult: htmlResult,

				working: working,

				regenerateTextVersion: regenerateTextVersion,

				save: save,
				cancel: cancel
			};
		}

		return {
			projectVM:			projectVM,
			previewVM:			previewVM,
			editorVM:			editorVM,
			confirmDeleteVM:	confirmDeleteVM,

			projectListVM:		projectListVM,
			projectListVM2:		projectListVM2,

			templateSelectorWithPreviewVM: templateSelectorWithPreviewVM,

			subjectAndTextBodyVM: subjectAndTextBodyVM
		};
	};
}(jQuery, ko));