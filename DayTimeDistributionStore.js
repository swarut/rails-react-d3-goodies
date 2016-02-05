var Actions = Reflux.createActions([
  'selectDay'
]);

var Store = Reflux.createStore({
  storeName: 'DayTimeDistributionStore',
  listenables: Actions,

  init: function() {
    this.selectedDayIndex = null;
    this.rowData = null;
  },

  onSelectDay: function(rowData, selectedDayIndex) {
    this.selectedDayIndex = selectedDayIndex;
    this.rowData = rowData;
    this.trigger();
  },

  getSelectedDayIndex: function() {
    return this.selectedDayIndex;
  },

  getRowData: function() {
    return this.rowData;
  }

});

window.DayTimeDistributionActions = Actions;
window.DayTimeDistributionStore = Store;
