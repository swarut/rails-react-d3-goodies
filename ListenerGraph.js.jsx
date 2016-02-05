var ListenerGraph = React.createClass({

  mixins: [
    Reflux.listenTo(DayTimeDistributionStore, 'onDayTimeDistributionStoreChange')
  ],

  getInitialState: function() {
    return {
      value: [100],
      svg: null
    };
  },

  componentDidMount: function() {
    var svg = d3.select('#listener-graph').append('svg')
    .attr('width', 600)
    .attr('height', 200);

    svg.selectAll('rect')
    .data(this.state.value)
    .enter()
    .append('rect')
    .attr('fill', 'black')
    .attr('x', 0)
    .attr('y', function(d) {
      return 200 - d;
    })
    .attr('width', 30)
    .attr('height', function(d) {
      return d;
    });

    this.setState({
      svg: svg
    });
  },

  updateGraph: function(sel) {
    var value = DayTimeDistributionStore.getRowData();
    var selectedIndex = DayTimeDistributionStore.getSelectedDayIndex();
    sel.attr('fill', function(d,i) {
      if(i === selectedIndex) {
        return 'green';
      }
      else {
        return '#eee';
      }
    })
    .attr('x', function(d,i){
      return i * 30 + 1;
    })
    .attr('y', function(d) {
      return 200 - d;
    })
    .attr('width', 30 - 1)
    .attr('height', function(d) {
      return d;
    });
    return sel;
  },

  onDayTimeDistributionStoreChange: function() {

    var value = DayTimeDistributionStore.getRowData();
    this.setState({
      value: value
    }, function() {
      // Add
      this.state.svg.selectAll('rect')
      .data(this.state.value)
      .enter()
      .append('rect')
      .call(this.updateGraph);

      // Update
      this.state.svg.selectAll('rect')
      .data(this.state.value)
      .transition().duration(200)
      .call(this.updateGraph);

    });
  },

  render: function() {
    return (
      <div id='listener-graph'></div>
    );
  }
});

window.ListenerGraph = ListenerGraph;
