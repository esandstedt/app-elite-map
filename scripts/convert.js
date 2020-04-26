const fs = require("fs");
const JSZip = require("jszip");

const { convert } = require("../src/volume/convert");

(async function() {
  const inputPath = process.argv[2];

  console.log("Loading sectors...");

  const json = JSON.parse(fs.readFileSync(inputPath));
  const data = convert(json);

  console.log("Exporting texture...");

  const zip = new JSZip();
  zip
    .file(
      "size",
      JSON.stringify({
        x: data.lengthX,
        y: data.lengthY,
        z: data.lengthZ
      })
    )
    .file("data", Buffer.from(data.array.buffer))
    .generateNodeStream({
      type: "nodebuffer",
      streamFiles: true,
      compression: "DEFLATE",
      compressionOptions: { level: 9 }
    })
    .pipe(fs.createWriteStream("output.zip"));
})();
