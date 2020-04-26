import axios from "axios";
import JSZip from "jszip";

export async function fromUrl(url) {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const zip = await JSZip.loadAsync(response.data);

  const size = JSON.parse(await zip.file("size").async("string"));
  const array = new Int16Array(await zip.file("data").async("arraybuffer"));

  return {
    array,
    lengthX: size.x,
    lengthY: size.y,
    lengthZ: size.z
  };
}
