import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, error) {
    Ember.Logger.debug(error.message);
    controller.set('message', error.message);
    this._super(...arguments);

    Ember.run.next(() => {
      if (!this.get('isDestroyed')) {
        controller.set('loadedClass', 'loaded');
      }
    });
  }
});
