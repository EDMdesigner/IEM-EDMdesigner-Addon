<?php

// an array of tables that are created.
// we need this so if the addon is uninstalled, we know what we need to clean up.
$tables = array('edm_designer');

// the actual queries we're going to run.
$queries = array();

$queries[] = '
CREATE TABLE %%TABLEPREFIX%%edm_designer (
  edmid INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  userid INT DEFAULT 0 REFERENCES %%TABLEPREFIX%%users(userid),
  apikey VARCHAR(255) NOT NULL,
  createdate INT(11) UNSIGNED NOT NULL,
  updated INT(11) default NULL,
  activated CHAR(1) NULL,
  user_language VARCHAR(25) NOT NULL DEFAULT \'en\',
  PRIMARY KEY(edmid)
) CHARACTER SET=UTF8 ENGINE=INNODB
	';
