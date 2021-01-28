const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');

function generateHtmlPlugins(templatePath) {
  // Read files in template directory
  const dirents = fs.readdirSync(templatePath, { withFileTypes: true });
  const templateFiles = dirents
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name);

  return templateFiles.map((item) => {
    // Split names and extension
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];

    // Create new HTMLWebpackPlugin with options
    return new HTMLWebpackPlugin({
      filename: `${name}.html`,
      template: `ejs-webpack-loader!${templatePath}/${name}.${extension}`,
    });
  });
}

module.exports = generateHtmlPlugins;
