var Map = React.createClass({

  propTypes: {
    colorsPalettes: React.PropTypes.object,
    data: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      colorsPalettes: {
        defaultFill: 'rgb(246, 185, 129)',
        orange: 'rgb(226, 126, 23)'
      },
      data: {
        JPN: {
          fillKey: 'orange',
          numberOfThings: 200
        },
        THA: {
          fillKey: 'orange',
          numberOfThings: 100
        }
      }
    };
  },

  componentDidMount: function() {

    var map = new Datamap({
      element: document.getElementById('map'),
      projection: 'equirectangular',
      geographyConfig: {
        //dataUrl: 'https://gist.github.com/osoken/b8e5859295757bb2ec5b/raw/a7cfceaa4c50d710363f6c0943e96a9e2926e95e/japan.topojson'
        dataUrl: 'https://github.com/dataofjapan/land/raw/master/tokyo.topojson'
      },
      fills: this.props.colorsPalettes,
      data: this.props.data,
      geographyConfig: {
        popupTemplate: function(geo, data) {
          return ['<div class="hoverinfo"><strong>',
                  'Number of things in ' + geo.properties.name,
                  ': ' + data.numberOfThings,
                  '</strong></div>'].join('');
        }
      }

    });
  },

  render: function() {
    return (
      <div id="map" />
    );
  }
});

window.Map = Map;
