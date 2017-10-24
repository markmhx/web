import Ember from 'ember';
import PhotoSwipeMixin from '../mixins/photoswipe';
import ScrollToUpdateAppNavMixin from '../mixins/scroll-to-update-app-nav';
import ComponentTransitionsMixin from '../mixins/component-transitions';

export default Ember.Component.extend(PhotoSwipeMixin, ScrollToUpdateAppNavMixin, ComponentTransitionsMixin, {
  tagName: 'section',
  classNames: ['photos'],
  attributeBindings: ['id'],
  id: 'photos',
  appNavOption: 'Photos',
  store: Ember.inject.service(),
  sortedPhotosProperties: ['publishedAt:desc'],
  sortedPhotos: Ember.computed.sort('photos', 'sortedPhotosProperties'),

  init: function() {
    this._super(...arguments);

    var query = this.get('store').query('photo', { limit: this.get('limit'), offset: this.get('offset') }).then((photos) => {
      this.set('photos', photos);

      Ember.run.next(() => {
        this.set('loaded', true);
      });
    }).catch((error) => {
      this.handleError(error);
    });

    this.deferRendering(query);
  },

  empty: Ember.computed('photos.length', function() {
    return (this.get('photos.length') === 0);
  })
});
