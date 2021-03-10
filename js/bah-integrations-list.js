(function () {
  'use strict';
  Polymer({
    is: 'bah-integrations-list',
    properties: {
    /**
    * Title for the list
    */
      title: {
        type: String,
        value: 'Integrations'
      },
    /**
    * Message for an empty list
    */
      emptyMessage: {
        type: String,
        value: 'No integrations have been added. Please add a new integration with '
      + 'the Add Integration button.'
      },
    /**
    * Items for the list
    */
      items: {
        type: Array
      },
      systemAnchor: {
        type: String,
        observer: '_systemAnchorChanged'
      }
    },

  /**
  * Fires event when item is tapped.
  * @event bah-integration-item-tap
  */
    _handleTap: function (e) {
      e.preventDefault();
      this.fire('bah-integration-item-tap', e);
    },

  /**
  * Fires event when item `edit` icon is tapped.
  * @event bah-integration-item-edit
  */
    _handleEdit: function (e) {
      e.preventDefault();
      this.fire('bah-integration-item-edit', e);
    },

  /**
  * Fires event when item `delete` icon is tapped.
  * @event bah-integration-item-delete
  */
    _handleDelete: function (e) {
      e.preventDefault();
      this.fire('bah-integration-item-delete', e);
    },

  /**
  * Determines if the integration is inbound or outbound
  *
  * @param {String} targetSystem
  * @return {Boolean} bool
  * */
    _isInbound: function(targetSystem) {
      if(targetSystem === 'eandon') {
        return true;
      }
      return false;
    },
    
    _removeEDHR: function() {
      var temp = [];
      for(var i = 0; i < this.items.length; i++) {
        if(this.items[i].source_system != 'edhr') {
          temp.push(this.items[i]);
        }
      }
      this.set('items', temp);
    },
    _checkLength: function(items) {
      if(items.length > 0){
        return true
      }
      return false;
    },

  /**
  * Determines which logo to draw for either infoream outbound or edhr inbound
  *
  * @param {String} targetSystem
  * @param {String} sourceSystem
  * @return {String} image pointer
  * */
    _getLogo: function(targetSystem, sourceSystem) {
      if(targetSystem.toLowerCase() === 'infoream') {
        return 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/49212/infor-img.png';
      }
      if(sourceSystem.toLowerCase() === 'edhr') {
        return 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/49212/edhr-img.png';
      } else {
        return '';
      }
    },

  /**
  * Retrieves integrations via the integration service and assigns results to items
  *
  * @param {String} systemAnchor
  * @return {Promise} promise
  * */
    _fetchIntegrations: function(systemAnchor) {
      var _this = this;
      var service = _this.$.integrationService;
      var promise = service.getIntegrationsBySystemAnchorId(systemAnchor);
      promise.then(function (integrations) {
        var noDublicates =_this.removeDuplicates(integrations, 'name');
        noDublicates.push({
          "id": 504,
          "name": "Raise alerts from EDHR Defects",
          "system_id": 4,
          "action_id": 4,
          "del_flg": "N",
          "data_map": null,
          "system_anchor_id": _this.systemAnchor,
          "direction": "inbound",
          "target_system": "eandon",
          "source_system": "edhr",
          "integration_id": 504
        });
        _this.set('items', noDublicates.reverse());
      }, function(e) {
        console.error(e);
      });
      return promise;
    },
  /**
  * Helper function to remove duplicate integration list items
  *
  * @param {Array} originalArray array that contains duplicates to be removed
  * @param {Array} objKey key to remove duplicates on
  * @return {Array} trimmedArray array that contains no duplicates
  * */
    removeDuplicates: function(originalArray, objKey) {
      var trimmedArray = [];
      var values = [];
      var value;

      for(var i = 0; i < originalArray.length; i++) {
        value = originalArray[i][objKey];

        if(values.indexOf(value) === -1) {
          trimmedArray.push(originalArray[i]);
          values.push(value);
        }
      }
      return trimmedArray;
    },

  /**
  * Triggers fetch integrations when a new system anchor is selected
  *
  * @param {String} systemAnchor
  * @return
  * */
    _systemAnchorChanged(value) {
      // dont process literal string  binding from eAndon or undefined
      if (value !== '{{selectedSite.id}}' && value !== undefined) {
        this._fetchIntegrations(this.systemAnchor);
      }
    }
  });
}());
