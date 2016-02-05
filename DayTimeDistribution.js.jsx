var DayTimeDistribution = React.createClass({

  getInitialState: function() {
    return {
      tbody: null,
      selectedRow: null,
      selectedIndex: null
    };
  },

  componentDidMount: function() {

    var dataset = [
      [40, 84, 26, 30, 32, 44, 57, 35, 54, 31],
      [22, 35, 54, 11, 43, 67, 78, 24, 26, 61],
      [84, 42, 30, 72, 37, 54, 29, 54, 11, 24],
      [10, 84, 26, 4, 32, 44, 57, 35, 54, 11],
      [22, 35, 54, 91, 43, 67, 78, 24, 26, 33],
      [44, 42, 30, 72, 37, 54, 29, 54, 11, 24],
      [70, 84, 26, 1, 32, 44, 57, 35, 54, 11],
      [12, 35, 54, 31, 43, 67, 78, 24, 26, 91],
      [44, 42, 30, 42, 37, 54, 29, 54, 11, 24],
    ];

    var that = this;

    var fill = d3.scale.quantize().domain([0, 100]).range(['#D9EAF8', '#A0B0CA', '#7284A8', '#47638D', '#114777']);

    var body = d3.select('#day-time-distribution');
    var table = body.append('table');
    var tr = table.selectAll('tr').data(dataset).enter().append('tr')
    .on('mouseover', function(value, rowIndex) {
      that.setState({ selectedRow: value});
      that.setState({ selectedRow: value },
      function() {
        DayTimeDistributionActions.selectDay(
          that.state.selectedRow, that.state.selectedIndex
        );
      });
    });

    var td = tr.selectAll('td')
    .data(function(d, i) {
      return d;
    })
    .enter()
    .append('td')
    .style('background-color', function(d) {
      return fill(d);
    })
    .text(function(d) {
      return d;
    });

    // Set event handler.
    td.on('mouseover', function(value, columnIndex) {
      var td = $(this);

      d3.select(this).style('color', 'white');
      that.setState({ selectedIndex: columnIndex });

    })
    .on('mouseout', function() {
      d3.select(this).style('color', 'black');
    });

    this.setState({
      table: table,
      tr: tr,
      td: td
    });

  },

  randomize: function() {
    var that = this;
    setInterval(function() {
      var ds = [];
      for(var i = 0; i < 9; i++) {
        var items = []
        for(var j = 0; j < 10; j++) {
          items.push(Math.round(Math.random() * 100));
        }
        ds.push(items)
      }

      that.updateGraph(ds);
    }, 1000);
  },

  updateGraph: function(data) {
    var colors = [
      ['#d2f1ff', '#a2d3ea', '#64a1be', '#337593', '#1a536e', '#063e58'],
      ['#b3e42e', '#9bc528', '#7fa221', '#6a871c', '#556c16', '#38480f'],
      ['#ffb759', '#ff942c', '#f58710', '#dd7a0f', '#bd680d', '#99540a'],
      ['#ff7e93', '#ff5575', '#e34c68', '#c04058', '#a03549', '#7b2938']
    ]
    var randomedColor = Math.round((Math.random() * 10)) % 4;
    console.log('random', randomedColor);
    var fill = d3.scale.quantize().domain([0, 100]).range(colors[randomedColor]);
    // var fill = d3.scale.quantize().domain([0, 100]).range(['#D9EAF8', '#A0B0CA', '#7284A8', '#47638D', '#114777']);
    var table = this.state.table;

    var tr = table.selectAll('tr').data(data)
    var td = tr.selectAll('td')
    .data(function(d, i) {
      return d;
    })
    .transition().duration(300)
    .style('background-color', function(d) {

      return fill(d);
    })
    .text(function(d) {
      return d;
    });
  },

  data1: function() {
    var d = [
      [70, 84, 26, 1, 32, 44, 57, 35, 54, 11],
      [12, 35, 54, 31, 43, 67, 78, 24, 26, 91],
      [44, 42, 30, 42, 37, 54, 29, 54, 11, 24],
      [40, 84, 26, 30, 32, 44, 57, 35, 54, 31],
      [22, 35, 54, 11, 43, 67, 78, 24, 26, 61],
      [84, 42, 30, 72, 37, 54, 29, 54, 11, 24],
      [10, 84, 26, 4, 32, 44, 57, 35, 54, 11],
      [22, 35, 54, 91, 43, 67, 78, 24, 26, 33],
      [44, 42, 30, 72, 37, 54, 29, 54, 11, 24]
    ];
    this.updateGraph(d);
  },

  data2: function() {
    var d = [
      [12, 35, 54, 31, 43, 67, 78, 24, 26, 91],
      [70, 84, 26, 1, 32, 44, 57, 35, 54, 11],
      [84, 42, 30, 72, 17, 54, 29, 14, 31, 24],
      [44, 42, 30, 42, 67, 94, 19, 54, 11, 42],
      [40, 84, 26, 30, 32, 44, 57, 35, 54, 31],
      [52, 11, 54, 91, 23, 17, 78, 44, 46, 33],
      [22, 35, 34, 11, 43, 97, 28, 24, 26, 61],
      [10, 84, 26, 4, 32, 44, 57, 35, 54, 11],
      [44, 42, 30, 72, 37, 54, 29, 54, 11, 24]
    ];
    this.updateGraph(d);
  },

  data3: function() {
    var d = [
      [9, 5, 4, 31, 43, 67, 8, 24, 26, 91],
      [70, 84, 86, 1, 32, 44, 57, 35, 54, 11],
      [52, 11, 54, 91, 13, 17, 78, 44, 46, 33],
      [84, 42, 30, 72, 37, 54, 29, 54, 31, 78],
      [44, 42, 70, 42, 34, 94, 19, 14, 11, 4],
      [40, 84, 26, 30, 32, 44, 57, 35, 54, 3],
      [22, 35, 44, 11, 43, 97, 28, 24, 26, 1],
      [10, 84, 26, 4, 32, 44, 57, 35, 54, 11],
      [44, 42, 10, 72, 37, 54, 29, 84, 11, 24]
    ];
    this.updateGraph(d);
  },

  render: function() {
    return (
      <div className='day-time-distribution'>
        <div id='day-time-distribution' />
        <div className='buttons'>
          <div onClick={this.data1}>Dataset 1</div>
          <div onClick={this.data2}>Dataset 2</div>
          <div onClick={this.data3}>Dataset 3</div>
        </div>
      </div>
    )
  }
});

window.DayTimeDistribution = DayTimeDistribution;
