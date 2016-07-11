import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['post'],
  classNameBindings: ['shown'],
  store: Ember.inject.service(),
  bodyShown: false,

  didReceiveAttrs() {
    var self = this;
    this.set('bodyShown', false); // hack to force component rerender 

    Ember.run.next(function() {
      self.set('bodyShown', true);
      self.set('shown', true);
    });
  }
});