var Sink = React.createClass({

  componentDidMount: function() {
    var that = this;
    // setInterval(function() {
    //   that.setState({});
    // }, 400);
  },

  renderMap: function() {
    var colors = {
      defaultFill: 'rgb(246, 185, 129)',
      orange: 'rgb(226, 126, 23)',
      pink: 'rgb(255, 87, 117)'
    };
    var data = {
      JPN: {
        fillKey: 'orange',
        numberOfThings: 200
      },
      THA: {
        fillKey: 'pink',
        numberOfThings: 100
      }
    };
    return (
      <Map data={data} colorsPalettes={colors} />
    )
  },

  renderBarChart: function() {

    var data = [];
    for (var i = 0; i < 20 ; i++ ){
      data.push(Math.round(Math.random() * 100));
    }
    return (
      <BarChart data={data} width={600} height={300} />
    )
  },

  render: function() {
    console.log('sink render');
    var map = this.renderMap();
    var barchart = this.renderBarChart();

    return (
      <div id="sink">
        <h3>Map</h3>
        {map}
        <h3>Barchart</h3>
        {barchart}
      </div>
    );
  }
});

window.Sink = Sink;
