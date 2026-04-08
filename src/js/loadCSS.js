const cssList = [
  'src/css/bootstrap.min.css',
  'src/css/font-awesome.min.css',
  'src/css/github-dark.min.css',
  'src/css/style.css',
];

function load(url) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

cssList.forEach(load);
