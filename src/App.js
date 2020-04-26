import React, { useEffect, useState } from "react";

import "./App.css";
//import { Canvas } from "./Canvas";
import { Canvas } from "./volume/Canvas";
import { fromUrl } from "./volume/Texture";

//import sectors_200423 from "./sectors/200423";
//import sectors_200425 from "./sectors/200425";

//import sectors from "./sectors/200425_3d_neutron_low";
//import sectors from "./sectors/200425_3d_neutron_med";
//import sectors from "./sectors/200425_3d_neutron_high";
//import sectors from "./sectors/200425_3d_all_low";
//import sectors from "./sectors/200425_3d_all_medium";

//import { convert } from "./volume/convert";

function App() {
  const [url, setUrl] = useState(
    "https://s3-eu-west-1.amazonaws.com/s3.sandstedt.eu/react-elite-map/neutron_low.dat"
  );
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      setData(await fromUrl(url));
    })();
  }, [url]);

  if (!data) {
  }

  return (
    <div>
      <div style={{ position: "absolute", top: "5px", right: "5px" }}>
        <select
          onChange={e => {
            const { value } = e.target;
            setUrl(value);
            setData(undefined);
          }}
        >
          <option value="https://s3-eu-west-1.amazonaws.com/s3.sandstedt.eu/react-elite-map/neutron_low.dat">
            Neutron - Low
          </option>
          <option value="https://s3-eu-west-1.amazonaws.com/s3.sandstedt.eu/react-elite-map/neutron_med.dat">
            Neutron - Medium
          </option>
          <option value="https://s3-eu-west-1.amazonaws.com/s3.sandstedt.eu/react-elite-map/neutron_high.dat">
            Neutron - High
          </option>
          <option value="https://s3-eu-west-1.amazonaws.com/s3.sandstedt.eu/react-elite-map/all_low.dat">
            All - Low
          </option>
          <option value="https://s3-eu-west-1.amazonaws.com/s3.sandstedt.eu/react-elite-map/all_med.dat">
            All - Medium (!!!)
          </option>
        </select>
      </div>
      <div>{data && <Canvas data={data} />}</div>
    </div>
  );
}

export default App;
