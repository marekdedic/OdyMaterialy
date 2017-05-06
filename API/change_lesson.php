<?php
const _API_EXEC = 1;

require_once('internal/database.secret.php');

if(!isset($_GET['id']))
{
	throw new Exception('GET argument "id" must be provided.');
}

$id = $_GET['id'];

if(isset($_GET['name']))
{
	$name = $_GET['name'];
}
if(isset($_GET['body']))
{
	$body = $_GET['body'];
}

$db = new mysqli(OdyMaterialyAPI\DB_SERVER, OdyMaterialyAPI\DB_USER, OdyMaterialyAPI\DB_PASSWORD, OdyMaterialyAPI\DB_DBNAME);

if ($db->connect_error)
{
	throw new Exception('Failed to connect to the database. Error: ' . $db->connect_error);
}

$selectSQL = <<<SQL
SELECT name, body FROM lessons WHERE id = ?;
SQL;

$updateSQL = <<<SQL
UPDATE lessons
SET name = ?, version = version + 1, body = ?
WHERE id = ?;
SQL;

$selectStatement = $db->prepare($selectSQL);
if ($selectStatement === false)
{
	throw new Exception('Invalid SQL: "' . $selectSQL . '". Error: ' . $db->error);
}
$selectStatement->bind_param('i', $id);
$selectStatement->execute();
$selectStatement->store_result();
$origName = '';
$origBody = '';
$selectStatement->bind_result($origName, $origBody);
if(!$selectStatement->fetch())
{
	throw new Exception('No lesson with id "' * $id * '" found.');
}
if(!isset($name))
{
	$name = $origName;
}
if(!isset($body))
{
	$body = $origBody;
}
$selectStatement->close();


$updateStatement = $db->prepare($updateSQL);
if ($updateStatement === false)
{
	throw new Exception('Invalid SQL: "' . $updateSQL . '". Error: ' . $db->error);
}
$updateStatement->bind_param('ssi', $name, $body, $id);
$updateStatement->execute();
$updateStatement->close();
$db->close();
