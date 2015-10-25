
import barComponent from './groupBarComponent';

const config = {
  WIDTH: 400,
  HEIGHT: 300
}

export default function group(parent, data) {

  console.info('groups', parent);

  data.groups.forEach(group => {
    group.pdoc = data.client.pdoc
  })

  var drag = d3.behavior.drag()
    .origin(d => d)
    .on('drag', function(d) {
      d.x = d3.event.x
      d.y = d3.event.y
      d3.select(this).attr('transform', 'translate(' + d.x + ',' + d.y + ')')
    })

  const groupInner = parent.selectAll('.group')
    .data(data.groups);

  // enter
  let addedGroups =
    groupInner
      .enter()
      .append('g')
      .attr('class', 'group')
      .style('filter', "url(#drop-shadow)")
      .attr('transform', function(d, i) {
        // console.log('groupInner', d);
        const yOffset = i * (config.HEIGHT + 20);
        d.x = 0;
        d.y = yOffset;
        return 'translate(' + d.x + ',' + d.y  + ')';
      })
      .call(drag)

  // Card BG
  addedGroups
    .append('rect')
    .attr('class', 'group__background')
    .attr('width', config.WIDTH)
    .attr('height', config.HEIGHT);

  // Card Title
  addedGroups.append('text')
    .attr('x', config.WIDTH / 2)
    .attr('y', 130)
    .attr('width', config.WIDTH)
    .attr('class', 'group__name')
    .text(d => d.name);

  // User Icon
  addedGroups.append('image')
    .attr('xlink:href', '/assets/gender-female.svg')
    .attr('x', config.WIDTH / 2 - 50)
    .attr('y', -20)
    .attr('width', 100)
    .attr('height', 100);

  // Conflict Icon
  addedGroups.append('image')
    .attr('xlink:href', d => {
      const degree = iconScale(d.conflict);
      return `/assets/icon-conflict-${degree}.svg`;
    })
    .attr('x', config.WIDTH / 2 - 100)
    .attr('y', 15)
    .attr('width', 30)
    .attr('height', 30);

  // Commonality Icon
  addedGroups.append('image')
    .attr('xlink:href', d => {
      const degree = iconScale(d.commonality);
      return `/assets/icon-common-${degree}.svg`;
    })
    .attr('x', config.WIDTH / 2 + 100 - 30)
    .attr('y', 15)
    .attr('width', 30)
    .attr('height', 30);

  groupInner.call(barComponent, config);
}

export function toggleAod(update_function, data) {
  return function() {
    if(data.client.pdoc == 'alcohol') {
      data.client.pdoc = 'other'
    } else {
      data.client.pdoc = 'alcohol'
    }

    update_function()
  }
}

function iconScale(data) {
  switch(data) {
  case 1:
    return 'lots';
  case 2:
    return 'some';
  default:
    return 'none';
  }
}
