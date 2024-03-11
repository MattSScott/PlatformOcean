import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { NetworkIPContext } from "../Contexts/ServerIPContext";
import { Button } from "@mui/material";

export default function PluginAdder() {
  const availablePlugs = [
    {
      developerName: "matt",
      pluginName: "Coords",
    },

    {
      developerName: "matt",
      pluginName: "Subtitler2",
    },

    {
      developerName: "matt",
      pluginName: "Carpool",
    },
  ];

  const [plugIdx, setPlugIdx] = React.useState("");
  const [msg, setMsg] = React.useState(null);
  const [labelWidth, setLabelWidth] = React.useState();
  const label = React.useRef();

  React.useEffect(() => {
    setLabelWidth(`${label.current.offsetWidth + 40}px`); // 24 for caret icon
  }, [label]);

  const handleChange = (event) => {
    const idx = event.target.value;
    setPlugIdx(idx);
    setMsg(availablePlugs[idx]);
  };

  const sender = async (IP) => {
    const route = `${IP}/plugins/add`;
    const data = JSON.stringify(msg);
    console.log(route, data);
    await fetch(route, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ minWidth: "maxContent" }}>
        <FormControl
          style={{
            minWidth: labelWidth,
          }}
        >
          <InputLabel
            id="demo-simple-select-required-label"
            style={{ minWidth: "max-content" }}
            ref={label}
          >
            Add Plugin
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={plugIdx}
            defaultValue=""
            label="Plugin"
            onChange={handleChange}
          >
            {availablePlugs.map((plug, i) => (
              <MenuItem key={i} value={i}>
                {plug.pluginName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <NetworkIPContext.Consumer>
        {(IP) => msg && <Button onClick={() => sender(IP)}>Add</Button>}
      </NetworkIPContext.Consumer>
    </div>
  );
}
