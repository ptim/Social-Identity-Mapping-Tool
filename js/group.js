
import _ from 'lodash';

const HEIGHT = 150;
const WIDTH = 200;

export default function group(parent, data) {

  console.info('groups', parent);


  const groupInner = parent.selectAll('.group')
    .data(data.groups);

  // enter
  groupInner.enter().append('g')
    .attr('class', 'group')
    .attr('transform', function(d, i) {
      // console.log('groupInner', d);
      const yOffset = i * (HEIGHT + 20);
      return 'translate(' + 0 + ',' + yOffset  + ')';
    });

  groupInner.append('rect')
      .attr('class', 'group__background')
      .attr('width', WIDTH)
      .attr('height', HEIGHT);

  groupInner.call(barComponent);
}


function barComponent(parent) {

  const barGroup = parent.append('g')
    .attr('class', 'barGroup');

  const bar = barGroup.selectAll('.group__bar')
    .data( d => {
      let xOffset = 0;

      const total = _.total(d.behaviours.alcohol, group => group.level);

      _.each(d.behaviours.alcohol, (segment) => {
        const prevOffset = xOffset;
        xOffset = xOffset + (segment.level / total) * WIDTH;
        segment.offset = prevOffset;
        segment.width = (segment.level / total) * WIDTH;
      });
      return d.behaviours.alcohol;
    });

  // enter
  bar.enter().append('rect')
    .attr('class', 'group__bar');

  // update
  bar.attr('x', d => d.offset)
    .attr('class', (d, i) => {
      return 'palette-' + (i + 1);
    })
    .attr('y', 0)
    .attr('width', d => d.width)
    .attr('height', 30)
}

function makeBars(data) {
  console.log('makeBars', data);
}

export function toggleAod() {
  console.log('toggleAod');
}
