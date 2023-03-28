// noinspection JSUnresolvedVariable

let col, row, coord, village, villages = [], currentVillage = null;

for (row = 0; row < TWMap.size[1]; row++) {
  for (col = 0; col < TWMap.size[0]; col++) {
    coord = TWMap.map.coordByPixel(TWMap.map.pos[0] + (TWMap.tileSize[0] * col), TWMap.map.pos[1] + (TWMap.tileSize[1] * row));
    if (coord) {
      village = TWMap.villages[coord.join("")];
      if (village) {
        villages.push({
          ...village,
          x: coord[0],
          y: coord[1]
        });
      }
    }
  }
}

villages.forEach(v => {
  if (v.id === TWMap.currentVillage.toString()) {
    currentVillage = v;
  }
});

let barbarVillages = [];
let targets = [];

villages.forEach(v => {
  if (v.owner === '0') {
    barbarVillages.push(v);
    targets.push({
      id: v.id,
      x: v.x,
      y: v.y,
      distance: getDistance(v, currentVillage)
    })
  }
})

targets = targets.sort((a, b) => { return a.distance - b.distance; });

function getDistance(end, start) {
  return Math.hypot(end.x - start.x, end.y - start.y);
}

localStorage.setItem('TW_BARBAR_TAGETS', JSON.stringify(targets));
let count = targets.length;
alert(`${count} barbar koyu hedef olarak tanımlandı.`);
