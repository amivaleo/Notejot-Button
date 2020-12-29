// St : for creating UI elements
const St = imports.gi.St;
// Main : have all the UI elements
const Main = imports.ui.main;
const Util = imports.misc.util;
const Shell = imports.gi.Shell;

let notejotButton;

function init(extensionMeta) {}

function enable() {
	notejotButton = new St.Bin({
		style_class: 'panel-button',
		reactive: true,
		can_focus: true,
		track_hover: true});
						 
	let icon = new St.Icon({
		icon_name: 'document-edit-symbolic',
		style_class: 'system-status-icon'});
		
	notejotButton.set_child(icon);
	notejotButton.connect('button-press-event', toggleNotejot);

	Main.panel._rightBox.insert_child_at_index(notejotButton, 0);
}

function disable() {
	Main.panel._rightBox.remove_child(notejotButton);
}

function toggleNotejot() {
	try {
		Util.trySpawnCommandLine('/usr/bin/flatpak run --branch=stable --arch=x86_64 --command=com.github.lainsce.notejot com.github.lainsce.notejot --new-note');
	} catch(err) {
		try {
			Util.trySpawnCommandLine('com.github.lainsce.notejot --new-note');
		} catch(err) {
			Main.notify("Can't load Notejot. Is it installed?");
		}
	}
}
