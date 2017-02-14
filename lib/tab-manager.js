'use babel';

import TabManagerView from './tab-manager-view';
import { CompositeDisposable } from 'atom';

export default {

  tabManagerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    console.log('running tab manager');
    this.tabManagerView = new TabManagerView(state.tabManagerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.tabManagerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tab-manager:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.tabManagerView.destroy();
  },

  serialize() {
    return {
      tabManagerViewState: this.tabManagerView.serialize()
    };
  },

  toggle() {
    console.log('TabManager was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
