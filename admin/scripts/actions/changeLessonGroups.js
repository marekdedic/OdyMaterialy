var lessonGroupsChanged = false;

function changeLessonGroupsOnClick(event)
{
	lessonGroupsChanged = false;
	sidePanelOpen();
	var html = "";
	outer:
	for(var i = 0; i < FIELDS.length; i++)
	{
		for(var j = 0; j < FIELDS[i].lessons.length; j++)
		{
			if(FIELDS[i].lessons[j].id == event.target.dataset.id)
			{
				html += "<h3 class=\"sidePanelTitle\">" + FIELDS[i].lessons[j].name + "</h3><div class=\"button\" id=\"sidePanelCancel\"><i class=\"icon-cancel\"></i>Zrušit</div><div class=\"button\" id=\"changeLessonGroupsSave\" data-id=\"" + FIELDS[i].lessons[j].id + "\"><i class=\"icon-floppy\"></i>Uložit</div>";
				break outer;
			}
		}
	}
	html += "<div id=\"groupList\"><div id=\"embeddedSpinner\"></div></div>";
	document.getElementById("sidePanel").innerHTML = html;
	document.getElementById("sidePanelCancel").onclick = function()
		{
			history.back();
		};
	document.getElementById("changeLessonGroupsSave").onclick = changeLessonGroupsSave;

	request("/API/v0.9/lesson/" + event.target.dataset.id + "/group", "GET", {}, function(response)
		{
			if(response.status === 200)
			{
				changeLessonGroupsRender(response.response);
			}
			else if(response.type === "AuthenticationException")
			{
				window.location.replace("https://odymaterialy.skauting.cz/API/v0.9/login");
			}
			else
			{
				dialog("Nastala neznámá chyba. Chybová hláška:<br>" + result.message, "OK");
			}
		});

	history.pushState({}, "title", "/admin/lessons");
	refreshLogin();
}

function changeLessonGroupsRender(currentGroups)
{
	var html = "<form id=\"sidePanelForm\">";
	for(var i = 0; i < GROUPS.length; i++)
	{
		html += "<div class=\"formRow\"><label class=\"formSwitch\"><input type=\"checkbox\"";
		if(currentGroups.indexOf(GROUPS[i].id) >= 0)
		{
			html += " checked";
		}
		html += " data-id=\"" + GROUPS[i].id + "\"";
		html += "><span class=\"formCustom formCheckbox\"></span></label>";
		if(GROUPS[i].id == "00000000-0000-0000-0000-000000000000")
		{
			html += "<span class=\"publicGroup\">" + GROUPS[i].name + "</span></div>";
		}
		else
		{
			html += GROUPS[i].name + "</div>";
		}
	}
	html += "</form>";
	document.getElementById("groupList").innerHTML = html;

	nodes = document.getElementById("sidePanelForm").getElementsByTagName("input");
	for(var k = 0; k < nodes.length; k++)
	{
		nodes[k].onchange = function()
			{
				lessonGroupsChanged = true;
			};
	}
}

function changeLessonGroupsSave()
{
	if(lessonGroupsChanged)
	{
	}
	else
	{
		history.back();
	}
}
