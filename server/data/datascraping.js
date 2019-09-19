const boxes = document.getElementsByClassName('box__content')


const data2 = [];


for (let i =0; i< boxes.length; i++) {
  let out = {};
  let d = boxes[i].getElementsByClassName('thumbnail__details')[0];
  out['rating'] = Number(d.getAttribute('data-rating'));
  out['phone'] = d.getAttribute('data-phone');
  out['location'] = d.getAttribute('data-location');
  out['name'] = d.getAttribute('data-name');
  out['lat'] = Number(d.getAttribute('data-lat'));
  out['lng'] = Number(d.getAttribute('data-lng'));  
  out['img_src'] = boxes[i].getElementsByTagName('img')[0].src;
  data2.push(out);
}


console.save = function (data, filename) {
  if (!data) {
      console.error('Console.save: No data')
      return;
  }

  if (!filename) filename = 'story.json'

  if (typeof data === "object") {
      data = JSON.stringify(data, undefined, 4)
  }

  var blob = new Blob([data], {
          type: 'text/json'
      }),
      e = document.createEvent('MouseEvents'),
      a = document.createElement('a')

  a.download = filename
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  a.dispatchEvent(e)
}

console.save(data2, 'la.json')