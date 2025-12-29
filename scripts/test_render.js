const ejs = require('ejs');

const renderAndLog = (filePath, data) => {
  ejs.renderFile(filePath, data, {}, (err, str) => {
    if (err) {
      console.error('Error rendering:', filePath);
      console.error(err);
      console.error(err.stack);
    } else {
      console.log('Rendered OK for:', filePath);
      console.log(str.slice(0, 200));
    }
  });
};

renderAndLog('views/pages/home.ejs', { title: 'Home', name: 'Abil' });
renderAndLog('views/pages/about.ejs', { title: 'About' });
renderAndLog('views/layout.ejs', { title: 'Layout Test', body: '<p>hello</p>' });
