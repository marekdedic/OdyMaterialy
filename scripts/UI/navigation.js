var navigationOpen = true;

function navigationSetup()
{
	window.addEventListener("resize", reflowNavigation)
	document.getElementById("navCloseButton").onclick = toggleNavigation;
	document.getElementById("overlay").onclick = toggleNavigation;
	document.getElementById("lessonOverview").onclick = function()
		{
			showLessonListView();
			return false;
		}
	reflowNavigation();
}

function toggleNavigation()
{
	navigationOpen = !navigationOpen;
	reflowNavigation();
}

function reflowNavigation()
{
	main = document.getElementsByTagName("main")[0].style;
	navBar = document.getElementsByTagName("nav")[0].style;
	overlay = document.getElementById("overlay").style;
	if(navigationOpen)
	{
		navBar.marginLeft = "0px"
		if(screen.width > 700)
		{
			main.marginLeft = "300px"
			overlay.display = "none";
		}
		else
		{
			main.marginLeft = "0px"
			overlay.display = "inline";
		}
	}
	else
	{
		navBar.marginLeft = "-300px"
		main.marginLeft = "0px"
		overlay.display = "none";
	}
}

