<link rel="stylesheet" href="includes/styles/stylesheet.css" type="text/css" />
<style type="text/css">
body {padding:0px; margin:5px; margin-top:10px; margin-left:12px; margin-right:10px; }
</style>
<script src="includes/js/jquery.js"></script>

<div class="Text">

	<div id="version_check"><img src="images/loading.gif" alt="{$lang.LoadingMessage}" /></div>

	<script>
		var latest_version = '';
		var feature_version = '';
		var latest_critical = 0;
		var feature_critical = 0;
	</script>
	<script src="http://www.version-check.net/version.js?p=9"></script>
	<script>
	$(function() {
		$('#version_check').load('index.php?Page=Addons&Addon=updatecheck&Action=check&Ajax=true');
	});
	</script>

</div>
