window.addEventListener('load', init, false);

function init() {
	// i18n of text strings
	$('extName').innerHTML = browser.i18n.getMessage('extName');
	$('version').innerHTML = browser.app.getDetails().version // undocumented method!
	$('options').innerHTML = browser.i18n.getMessage('options');
	$('general').innerHTML = browser.i18n.getMessage('general');
	$('optionClickNewTab').innerHTML = browser.i18n.getMessage('optionClickNewTab');
	$('optionOpenNewTab').innerHTML = browser.i18n.getMessage('optionOpenNewTab');
	$('optionCloseUnusedFolders').innerHTML = browser.i18n.getMessage('optionCloseUnusedFolders');
	$('optionPopupStays').innerHTML = browser.i18n.getMessage('optionPopupStays');
	$('optionConfirmOpenFolder').innerHTML = browser.i18n.getMessage('optionConfirmOpenFolder');
	$('optionRememberPrevState').innerHTML = browser.i18n.getMessage('optionRememberPrevState');
	$('accessibility').innerHTML = browser.i18n.getMessage('accessibility');
	$('optionZoom').innerHTML = browser.i18n.getMessage('optionZoom');
	$('customIcon').innerHTML = browser.i18n.getMessage('customIcon');
	$('customIconText').innerHTML = browser.i18n.getMessage('customIconText');
	$('resetSettings').innerHTML = browser.i18n.getMessage('resetSettings');
	var extName = browser.i18n.getMessage('extName');
	var version = browser.i18n.getMessage('version');
	$('resetText').innerHTML = browser.i18n.getMessage('resetText', [extName]);
	$('reset').innerHTML = browser.i18n.getMessage('reset');
	$('customStyles').innerHTML = browser.i18n.getMessage('customStyles');
	var linkGithubGist = '<a href="http://gist.github.com/">GitHub Gist</a>';
	$('customStylesText').innerHTML = browser.i18n.getMessage('customStylesText', [linkGithubGist]);
	var neaterEmail = '<a href="mailto:neaterbookmarks@gmail.com?body=%0d%0dSent from Neater Bookmarks Options page">neaterbookmarks@gmail.com</a>';
	$('optionsFooterText1').innerHTML = browser.i18n.getMessage('optionsFooterText1', [neaterEmail]);
	var neaterGithub = 'GitHub: <a href="http://goo.gl/s2kVi">http://goo.gl/s2kVi</a>';
	$('optionsFooterText2').innerHTML = browser.i18n.getMessage('optionsFooterText2', [extName, neaterGithub]);
	var neaterFaq = '<a href="http://goo.gl/DDMqE">http://goo.gl/DDMqE</a>';
	$('optionsFooterText3').innerHTML = browser.i18n.getMessage('optionsFooterText3', [neaterFaq]);
	var neaterIssues = '<a href="http://goo.gl/Ct39y">http://goo.gl/Ct39y</a>';
	$('optionsFooterText4').innerHTML = browser.i18n.getMessage('optionsFooterText4', [neaterIssues]);
	var neaterIcons = '<a href="http://goo.gl/0xQNp">http://goo.gl/0xQNp</a>';
	$('optionsFooterText5').innerHTML = browser.i18n.getMessage('optionsFooterText5', [neaterIcons]);
	var neaterTranslate = 'WebTranslateIt: <a href="http://goo.gl/oDXMm">http://goo.gl/oDXMm</a>';
	$('optionsFooterText6').innerHTML = browser.i18n.getMessage('optionsFooterText6', [extName, neaterTranslate]);
	var neatGithub = '<a href="http://github.com/cheeaun/neat-bookmarks">Neat Bookmarks</a>';
	var linkCheeAun = '<a href="http://twitter.com/cheeaun">Lim Chee Aun</a>';
	$('optionsFooterText7').innerHTML = browser.i18n.getMessage('optionsFooterText7', [neatGithub, linkCheeAun]);
};

var _m = browser.i18n.getMessage;

var __m = function(){
	document.write(_m.apply(this, arguments));
};

document.addEventListener('DOMContentLoaded', function(){
	document.title = _m('extName') + ' ' + _m('options');
	
	var clickNewTab = $('click-new-tab');
	clickNewTab.checked = !!localStorage.leftClickNewTab;
	clickNewTab.addEventListener('change', function(){
		localStorage.leftClickNewTab = clickNewTab.checked ? '1' : '';
	});
	
	var openNewTabBg = $('open-new-tab-bg');
	openNewTabBg.checked = !!localStorage.middleClickBgTab;
	openNewTabBg.addEventListener('change', function(){
		localStorage.middleClickBgTab = openNewTabBg.checked ? '1' : '';
	});
	
	var closeUnusedFolders = $('close-unused-folders');
	closeUnusedFolders.checked = !!localStorage.closeUnusedFolders;
	closeUnusedFolders.addEventListener('change', function(){
		localStorage.closeUnusedFolders = closeUnusedFolders.checked ? '1' : '';
	});
	
	var popupStayOpen = $('popup-stay-open');
	popupStayOpen.checked = !!localStorage.bookmarkClickStayOpen;
	popupStayOpen.addEventListener('change', function(){
		localStorage.bookmarkClickStayOpen = popupStayOpen.checked ? '1' : '';
	});
	
	var confirmOpenFolder = $('confirm-open-folder');
	confirmOpenFolder.checked = !localStorage.dontConfirmOpenFolder;
	confirmOpenFolder.addEventListener('change', function(){
		localStorage.dontConfirmOpenFolder = confirmOpenFolder.checked ? '' : '1';
	});
	
	var rememberPrevState = $('remember-prev-state');
	rememberPrevState.checked = !localStorage.dontRememberState;
	rememberPrevState.addEventListener('change', function(){
		localStorage.dontRememberState = rememberPrevState.checked ? '' : '1';
	});
	
	var zoom = $('zoom-input');
	setInterval(function(){
		zoom.value = localStorage.zoom || 100;
	}, 1000);
	zoom.addEventListener('input', function(){
		var val = zoom.value.toInt();
		if (val == 100){
			localStorage.removeItem('zoom');
		} else {
			localStorage.zoom = val;
		}
	});
	
	var customIconPreview = $('custom-icon-preview').firstElementChild;
	var canvas = document.createElement('canvas');
	canvas.width = canvas.height = 19;
	var ctx = canvas.getContext('2d');
	var dontLoad = true;
	customIconPreview.onload = function(){
		if (dontLoad){
			dontLoad = false;
			return;
		}
		ctx.clearRect(0, 0, 19, 19);
		ctx.drawImage(customIconPreview, 0, 0, 19, 19);
		var imageData = ctx.getImageData(0, 0, 19, 19);
		browser.browserAction.setIcon({imageData: imageData});
		localStorage.customIcon = JSON.stringify(imageData.data);
	};
	if (localStorage.customIcon){
		var customIcon = JSON.parse(localStorage.customIcon);
		var imageData = ctx.getImageData(0, 0, 19, 19);
		for (var key in customIcon) imageData.data[key] = customIcon[key];
		ctx.putImageData(imageData, 0, 0);
		customIconPreview.src = canvas.toDataURL();
	}
	
	var customIconFile = $('custom-icon-file');
	customIconFile.addEventListener('change', function(){
		var files = this.files;
		if (files && files.length){
			var file = files[0];
			if (/image\/[a-z]+/i.test(file.type)){
				reader = new FileReader();
				reader.onload = function(e){
					var result = e.target.result;
					customIconPreview.src = result;
				};
				reader.readAsDataURL(files[0]);
			} else {
				alert('Not an image. Try another one.');
			}
		}
	});
	
	$('reset-button').addEventListener('click', function(){
		localStorage.clear();
		delete localStorage.customIcon;
		browser.browserAction.setIcon({path: 'icon.png'});
		customIconPreview.src = 'icon.png';
		dontLoad = true;
		location.reload();
		alert(_m('extName') + ' has been reset.');
	}, false);
	
	var textareaUserstyle = $('userstyle');
	if (localStorage.userstyle) textareaUserstyle.value = localStorage.userstyle;
	CodeMirror.fromTextArea(textareaUserstyle, {
		onChange: function(c){
			localStorage.userstyle = c.getValue();
		}
	});
});

document.addEventListener('DOMContentLoaded', function(){
	// check if options can be saved locally
	if (window.localStorage == null) {
		alert("LocalStorage must be enabled for managing options.");
		return;
	}
});

onerror = function(){
	browser.extension.sendRequest({error: [].slice.call(arguments)})
};
