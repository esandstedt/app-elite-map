import React, { useEffect, useState } from "react";

import "./App.css";
import { Canvas } from "./volume/Canvas";
import { fromUrl } from "./volume/Texture";

const options = [
  {
    value: process.env.PUBLIC_URL + "/data/all_low.dat",
    text: "All - Low"
  },
  {
    value: process.env.PUBLIC_URL + "/data/all_med.dat",
    text: "All - Medium"
  },
  {
    value: process.env.PUBLIC_URL + "/data/all_high.dat",
    text: "All - High"
  },
  {
    value: process.env.PUBLIC_URL + "/data/neutron_low.dat",
    text: "Neutron - Low"
  },
  {
    value: process.env.PUBLIC_URL + "/data/neutron_med.dat",
    text: "Neutron - Medium"
  },
  {
    value: process.env.PUBLIC_URL + "/data/neutron_high.dat",
    text: "Neutron - High"
  }
];

function App() {
  const [url, setUrl] = useState(options[0].value);
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
          value={url}
          onChange={e => {
            const { value } = e.target;
            setUrl(value);
            setData(undefined);
          }}
        >
          {options.map(({ value, text }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
      </div>
      <div>{data && <Canvas data={data} />}</div>
    </div>
  );
}

export default App;
