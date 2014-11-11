var edmDesignerEntryPoints = (function(ko) {
	function projectManager(userId, interSpireUserId, fromEmail, i18n, campaignMode, langCode, urls, callbacks) {
		var loading = ko.observable(true);
		var saveUrl = urls.saveUrl;
		//var userId = ko.observable(userIdVal);
		var pages = {
			projectList: ko.observable(null),
			preview: ko.observable(null),
			editor: ko.observable(null),
			creator: ko.observable(null),
			confirmDelete: ko.observable(null),
			campaignInfo: ko.observable(null)
		};
 
		var defaultConfirmMessage = "Are you sure you want to cancel creating a new email campaign? Your unsaved data will be lost";

		function clearPages() {
			loading(true);
			for (var prop in pages) {
				pages[prop](null);
			}

			if (window.removeEventListener) {
				window.removeEventListener("dragover", dragHack, false);
				window.removeEventListener("drop", dropHack, false);
			} else if (window.detachEvent) {
				window.detachEvent("dragover");
				window.detachEvent("drop");
			}
		}

		ko.applyBindings({
			loading: loading,
			pages: pages,

			userId: userId,
			campaignMode: campaignMode
		});

		initEDMdesignerPlugin(userId, function(edmPlugin) {
			var edmvms = initEDMdesignerViewModels(edmPlugin, fromEmail, i18n, langCode, loading, campaignMode);

			/*
			function updateProjectList() {
				clearPages();
				edmPlugin.listProjects({}, function(result) {
					var projects = [];
					//It's possible to filter the result here.
					//Without modifying the api, this is the only place to do it
					if (campaignMode) {
						projects = result.filter(function(element) {
							return element.customData && element.customData.campaign;
						});
					} else {
						projects = result.filter(function(element) {
							return !element.customData || !element.customData.campaign;
						});
					}
					pages.projectList(edmvms.projectListVM(projects, {
						editProject: editProject,
						previewProject: previewProject,
						removeProject: removeProject,
						duplicateProject: duplicateProject,

						createProject: createProject,

						editCampaignInfo: editCampaignInfo,
						sendCampaign: sendCampaign,
						setCampaignActivated: setActivatedCampaignInterspire
					}));
				});
			}
			//*/

			$(document).keydown(function(e) {
				if(event.keyCode === 8) {
					var target = e.srcElement || e.target;

					if(target.tagName.toUpperCase() !== "INPUT" && target.tagName.toUpperCase() !== "TEXTAREA") {
						e.preventDefault();
						return false;
					}
				}
			});

			//*
			function updateProjectList() {
				clearPages();
				pages.projectList(edmvms.projectListVM2({
					editProject: editProject,
					previewProject: previewProject,
					removeProject: removeProject,
					duplicateProject: duplicateProject,

					createProject: createProject,

					editCampaignInfo: editCampaignInfo,
					sendCampaign: sendCampaign,
					setCampaignActivated: setActivatedCampaignInterspire,
					setCampaignArchivated: setCampaignArchivated
				}));
			}
			//*/

			function createBlankCampaignInInterspire(callback) {
				$.post(saveUrl, {
					"action": "insert",
					"name": "name",
					"subject": "subject",
					"text_body": "textBody",
					"html_body": "generatedHtml",
					"user_id": interSpireUserId
				}, function(result) {
					if (typeof result === "string") {
						try {
							result = JSON.parse(result);
						} catch (e) {
							result = {};
						}
					}
					if (typeof callback === "function") {
						callback(result);
					}
				});
			}

			function insertCampaignInterspire(project, callback) {
				edmPlugin.generateProject(project._id, function(generatedHtml) {
					var name = project.title();
					var subject = project.subject();
					var textBody = project.textBody();

					if(textBody === "") {
						//textBody = generateTextBody(generatedHtml);
						textBody = "default textBody";
						project.textBody(textBody);
					}

					$.post(saveUrl, {
						"action": "insert",
						"name": name,
						"subject": subject,
						"text_body": textBody,
						"html_body": generatedHtml,
						"user_id": interSpireUserId
					}, function(result) {
						if (typeof callback === "function") {
							callback(result);
						}
					});
				});
			}

			function setActivatedCampaignInterspire(project, callback) {
				var action = project.active() ? "deactivate" : "activate";
				var id = project.customData.campaignId;
				$.post(saveUrl, {
					"action": action,
					"id": id
				}, function(result) {
					if (typeof callback === "function") {
						callback(result);
					}
				});
			}

			function setCampaignArchivated(project, callback) {
				var action = project.archive() ? "dearchivate" : "archivate";
				var id = project.customData.campaignId;
				$.post(saveUrl, {
					"action": action,
					"id": id
				}, function(result) {
					if (typeof callback === "function") {
						callback(result);
					}
				});
			}

			//this part should be refactored
			function updateCampaignInterspire(project, callback) {
				var interspireId = project.customData.campaignId;
				edmPlugin.generateProject(project._id, function(generatedHtml) {
					var id = project.customData.campaignId;
					var name = project.title();
					var subject = project.subject();

					$.post(saveUrl, {
						"action": "update",
						"id": id,
						"name": name,
						"subject": subject,
						"html_body": generatedHtml
					}, function(result) {
						if (typeof callback === "function") {
							callback(result, generatedHtml);
						}
					});
				});
			}

			function deleteCampaignInterspire(project, callback) {
				$.post(saveUrl, {
					"action": "delete",
					"id": project.customData.campaignId,
					"user_id": interSpireUserId
				}, function(result) {
					if (typeof result === "string") {
						try {
							result = JSON.parse(result);
						} catch (e) {
							result = {};
						}
					}
					if (typeof callback === "function") {
						callback(result);
					}
				});
			}

			function updateCampaignInfo(project, callback) {
				var isCampaign = project.customData ? project.customData.campaign : false;

				var data = {
					title: project.title()
				};

				if (isCampaign) {
					data.customData = {
						subject: project.subject()
					};
				}

				edmPlugin.updateProjectInfo(project._id, data, function(result) {
					if (result.err) {
						console.log("ERROR: ", result.err);
					}

					if (isCampaign) {
						updateCampaignInterspire(project, function(result) {
							if (typeof callback === "function") {
								callback();
							}
						});
					} else {
						callback();
					}
				});
			}

			function editProject(project) {
				clearPages();
				pages.editor(edmvms.editorVM(project, {
					save: function() {
						if (campaignMode) {
							updateCampaignInterspire(project, function(result) {
								console.log("Interspire save ok?");
							});
							updateCampaignInfo(project);
						}
					},
					cancel: function() {
						if(confirm((i18n && i18n.editorVM && i18n.editorVM.cancelConfirmMessage) ? i18n.editorVM.cancelConfirmMessage : defaultConfirmMessage) === true) {
							updateProjectList();
						}
					},
					close: function() {

					},
					saveAndClose: function() {
						if (campaignMode) {
							loading(true);
							updateCampaignInfo(project, function() {
								updateCampaignInterspire(project, function(result, generatedHtml) {
									editCampaignInfo(project, generatedHtml);
								});
							});
						} else {
							loading(true);
							updateCampaignInfo(project, updateProjectList);
						}
					},
					preview: function() {
						previewProject(project);
					}
				}));

				if (window.addEventListener) {
					window.addEventListener("dragover", dragHack, false);
					window.addEventListener("drop", dropHack, false);
				} else if (window.attachEvent) {
					window.attachEvent("dragover", dragHack);
					window.attachEvent("drop", dropHack);
				}
			}

			function duplicateProject(project) {
				clearPages();
				if(campaignMode) {
					insertCampaignInterspire(project, function(campaign) {
						var id = null;
						try {
							id = JSON.parse(campaign)._id;
						} catch(e) {
							console.log("Error ", e);
						}
						edmPlugin.duplicateProject(project._id, function(result) {
							edmPlugin.updateProjectInfo(result._id,
								{
									customData: {
										campaignId: id,
										active: false
									}
								},
								function(updateResult) {
									updateProjectList();
								}
							);
						});
					});
				} else {
					edmPlugin.duplicateProject(project._id, function(result) {
						updateProjectList();
					});
				}
			}

			function previewProject(project) {
				pages.preview(edmvms.previewVM(project, {
					close: function() {
						pages.preview(null);
					},
					sendTestEmail: function(from, to, subject, callback) {
						edmPlugin.generateProject(project._id, function(generatedHtml) {
							//+ "?Page=Newsletters&Action=SendPreviewDisplay&keepThis=true"
							//sendPreviewDisplay
							$.post(urls.baseUrl + "?Page=Newsletters&Action=SendPreview", {
								"action": "sendPreview",
								"subject": subject,
								"PreviewEmail": to,
								"FromPreviewEmail": from,
								"TextContent": generateTextBody(generatedHtml),
								"myDevEditControl_html": generatedHtml,
								"id": interSpireUserId,
							}, function(result) {
								callback(result);
							});
						});
					},
					checkSpam: checkSpam(project._id)
				}));
			}

			function removeProject(project) {
				pages.confirmDelete(edmvms.confirmDeleteVM(project, {
					confirm: function() {
						loading(true);

						var isCampaign = project.customData ? project.customData.campaign : false;

						edmPlugin.removeProject(project._id, function() {
							if (isCampaign) {
								deleteCampaignInterspire(project, function() {
									updateProjectList();
								});
							} else {
								updateProjectList();
							}
						});
					},
					cancel: function() {
						pages.confirmDelete(null);
					}
				}));
			}

			function editCampaignInfo(project, generatedHtml) {
				clearPages();

				pages.campaignInfo(edmvms.subjectAndTextBodyVM(project, {
					init: function(textBody) {
						$.get(saveUrl, {
							"action": "getTextBody",
							"id": project.customData.campaignId,
							"user_id": interSpireUserId
						}, function(result) {
							if (result === "" || result === "default textBody" || result === "textBody") {
								if (generatedHtml) {
									return textBody(generateTextBody(generatedHtml));
								}
							}

							textBody(result);
						});
					},
					save: function() {
						updateCampaignInfo(project, function() {
							$.post(saveUrl, {
								"action": "setTextBody",
								"textBody": project.textBody,
								"id": project.customData.campaignId,
								"user_id": interSpireUserId
							}, function(result) {
								if (typeof result === "string") {
									try {
										result = JSON.parse(result);
									} catch (e) {
										result = {};
									}
								}

								if (!result.success) {
									console.log("Saving to localdb unsuccessful!");
								}

								updateProjectList();
							});
						});
					},
					cancel: function() {
						if(confirm((i18n && i18n.subjectAndTextBodyVM && i18n.subjectAndTextBodyVM.cancelConfirmMessage) ? i18n.subjectAndTextBodyVM.cancelConfirmMessage : defaultConfirmMessage) === true) {
							updateProjectList();
						}
					},
					checkSpam: checkSpam(project._id)
				}));
			}

			function sendCampaign(project) {
				var campaignId = project.customData.campaignId;
				location = "index.php?Page=Send&id=" + campaignId;
			}

			/*var data = getDataFromRequest(req);

			checkDocument(req, res, data.document, function(err, document) {
				if(!err) {
					projectHandler.create(req, res, {
						user: req.user._id,
						title: data.title,
						description: data.description || "",
						customData: data.customData,
						document: document
					}, null, "createProject - " + mode);
				} else {
					res[mode]({err: err});
				}
			});
			*/

			function createProject () {
				var SCRATCH_TEMPLATE = {
					root: {
						children: [
							{
								isLeftHigher: "true",
								leftBackgroundColor: "",
								leftChildren: [
									{
										type: "BOX",
										background: {color: "#FFFFFF"},
										padding: {left: 5, top: 5, right: 5, bottom: 5},
										margin: {left: 0, top: 0, right: 0, bottom: 0},
										border: {
											left: {width: 0},
											top: {width: 0},
											right: {width: 0},
											bottom: {width: 0}
										}
									}
								],
								order: "LTR",
								rightBackgroundColor: "",
								twoCell: "false",
								type: "FULLWIDTH_CONTAINER"
							}
						]
					}
				};

				clearPages();
				pages.creator(edmvms.templateSelectorWithPreviewVM(userId !== "templater", {
					createFromScratch: function(title) {
						loading(true);
						
						function _create(campaignId) {
							var data = {
								title: title,

								document: SCRATCH_TEMPLATE,

								customData: {
									active: false
								}
							};

							if (campaignMode) {
								data.customData.active = true;
								data.customData.archive = true;

								data.customData.campaign = true;
								data.customData.campaignId = campaignId;
							}

							edmPlugin.createProject(data, function (result) {
								data._id = result._id;

								var projectVM = edmvms.projectVM(data);

								editProject(projectVM);
							});
						}

						if (campaignMode) {
							createBlankCampaignInInterspire(function(result) {
								_create(result._id);
							});
						} else {
							_create();
						}
					},
					createFromSelected: function(selectedProject, title, isDefault) {
						loading(true);

						function _create(campaignId) {
							var data = {
								title: title,

								customData: {
									active: false
								}
							};

							if (campaignMode) {
								data.customData.active = true;
								data.customData.archive = true;

								data.customData.campaign = true;
								data.customData.campaignId = campaignId;
							}


							if (isDefault) {
								edmPlugin.createFromDefaults(selectedProject._id, data, function(result) {
									data._id = result._id;

									var projectVM = edmvms.projectVM(data);

									editProject(projectVM);
								});
							} else {
								edmPlugin.createFromOwn(selectedProject._id, data, function(result) {
									data._id = result._id;

									var projectVM = edmvms.projectVM(data);

									editProject(projectVM);
								});
							}
						}


						if (campaignMode) {
							createBlankCampaignInInterspire(function(result) {
								_create(result._id);
							});
						} else {
							_create();
						}
					},
					cancel: function() {
						if(confirm((i18n && i18n.templateSelectorWithPreviewVM && i18n.templateSelectorWithPreviewVM.cancelConfirmMessage) ? i18n.templateSelectorWithPreviewVM.cancelConfirmMessage : defaultConfirmMessage) === true) {
							updateProjectList();
						}
					}
				}));
			}

			function generateTextBody(generatedHtml) {
				var firstIndex = generatedHtml.indexOf("<!-- content -->");
				var secondIndex = generatedHtml.indexOf("<!-- content end -->");
				var tmp = generatedHtml.slice(firstIndex+16, secondIndex);

				//links (a tags)
				$(tmp).find("a").each(function(index) {
					tmp = tmp.replace(this.outerHTML, "[" + this.outerHTML.replace(/[\r\n]/, "") + "](" + this.href + ")");
				});

				//Headers (h1-h6)
				for(var i = 1; i < 7; i++) {
					$(tmp).find("H" + i).each(setHeaders);
				}

				function setHeaders(index) {
					var preStr = "";
					for(var j = 0; j < i; j++) {
						preStr += "#";
					}
					tmp = tmp.replace(this.outerHTML, preStr + " " + this.outerHTML + "\n ------------------------------" );
				}

				//lists (li)
				$(tmp).find("li").each(function(index) {
					tmp = tmp.replace(this.outerHTML, " * " + this.outerHTML + "\n");
				});

				return $(tmp).text().replace(/[\r\n]{2,}/g, "\r\n\r\n").trim();
			}

			function checkSpam(projectId) {
				return function(callback, textBody) {
					edmPlugin.generateProject(projectId, function(generatedHtml) {
						$.post(urls.baseUrl + "?Page=Newsletters&Action=CheckSpam", {
							"action": "CheckSpam",
							"myDevEditControl_html": generatedHtml,
							"TextContent": textBody || generateTextBody(generatedHtml)
						}, function(result) {
							callback(result);
						});
					});
				};
			}

			updateProjectList();
		});

		
	}

	function dragHack(e) {
		e = e || event;
		e.preventDefault();
	}
	
	function dropHack(e) {
		e = e || event;
		e.preventDefault();
	}

	return {
		projectManager: projectManager
	};
}(ko));