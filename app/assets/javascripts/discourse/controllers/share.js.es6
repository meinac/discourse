import DiscourseController from 'discourse/controllers/controller';

export default DiscourseController.extend({
  needs: ['topic'],

  // Close the share controller
  actions: {
    close: function() {
      this.setProperties({ link: '', postNumber: '' });
      return false;
    },

    sharePopup: function(target, url) {
      window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=600,height=' + Discourse.ShareLink.popupHeight(target));
      return false;
    }
  },

  shareLinks: function() {
    return Discourse.SiteSettings.share_links.split('|').map(function(i) {
      if( Discourse.ShareLink.supportedTargets.indexOf(i) >= 0 ) {
        return Discourse.ShareLink.create({target: i, link: this.get('link'), topicTitle: this.get('controllers.topic.title')});
      } else {
        return null;
      }
    }, this).compact();
  }.property('link')

});
