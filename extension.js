const St = imports.gi.St;
const Main = imports.ui.main;
const Util = imports.misc.util;
const Shell = imports.gi.Shell;

let button;

function init(extensionMeta) {

	button = new St.Bin({
		style_class: 'panel-button',
		reactive: true,
		can_focus: true,
		x_fill: true,
		y_fill: false,
		track_hover: true});
						 
	let icon = new St.Icon({
		icon_name: 'document-edit-symbolic',
		style_class: 'system-status-icon'});
		
	button.set_child(icon);
	button.connect('button-press-event', _toggleNotejot);
}

function enable() {
	let children = Main.panel._rightBox.get_children();
	Main.panel._rightBox.insert_child_at_index(button, children.length-1);
}

function disable() {
	Main.panel._rightBox.remove_child(button);
}

function _toggleNotejot() {
	Util.trySpawnCommandLine('/usr/bin/flatpak run --branch=stable --arch=x86_64 --command=com.github.lainsce.notejot com.github.lainsce.notejot');
	Util.trySpawnCommandLine('com.github.lainsce.notejot');
}
