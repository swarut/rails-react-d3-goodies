var BarChart = React.createClass({

  propTypes: {
    data: React.PropTypes.array,
    width: React.PropTypes.number,
    height: React.PropTypes.number
  },

  getInitialState: function() {
    return {
      svg: null
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.update();
  },

  componentDidMount: function() {
    var dataset = this.props.data;
    var height  = this.props.height;
    var width   = this.props.width;
    var fill    = d3.scale.category20b();

    var svg = d3.selectAll('#bar-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .call(this.setRect);

    svg.selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      .text(function(d) {
        return d;
      })
      .attr('fill', function(d) {
        return fill(d);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr('x', function(d, i) {
        return ((width/dataset.length) * i) + (width/dataset.length/2) ;
      })
      .attr('y', function(d, i) {
        return height - d - 4;
      })
      .attr("text-anchor", "middle");

    svg.selectAll('rect')
    .on('mouseover', function(){
      d3.select(this)
        .attr('fill', 'pink');
    })
    .on('mouseout', function(){
      d3.select(this)
        .attr('fill', function(d){
          return fill(d);
        });
    });

    this.setState({
      svg: svg
    });

  },

  setRect: function(sel) {
    var dataset = this.props.data;
    var height  = this.props.height;
    var width   = this.props.width;
    var fill    = d3.scale.category20b();

    sel.attr('x', function(d, i) {
      return (width/dataset.length) * i;
    })
    .attr('y', function(d, i) {
      return height - d;
    })
    .attr('width', function(d, i) {
      return (width/dataset.length) - 1;
    })
    .attr('height', function(d, i) {
      return d;
    })
    .attr('fill', function(d) {
      return fill(d);
    });

    return sel;
  },

  update: function() {

    var new_dataset = this.props.data;
    var height      = this.props.height;
    var width       = this.props.width;

    this.state.svg.selectAll('rect')
      .data(new_dataset)
      .transition()
      .duration(300)
      .call(this.setRect);
  },

  render: function() {
    return (
      <div id='bar-chart' />
    );
  }
});

window.BarChart = BarChart;
