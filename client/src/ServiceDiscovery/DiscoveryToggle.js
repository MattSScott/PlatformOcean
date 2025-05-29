import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Public, Wifi } from "@mui/icons-material";

export default function DiscoveryToggle({ mode, setMode }) {
  const handleChange = (_, newValue) => {
    newValue !== null && setMode(newValue);
  };

  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      onChange={handleChange}
      aria-label="discovery mode"
      size="large"
    >
      <ToggleButton
        value={true}
        aria-label="local discovery"
        variant="outlined"
      >
        <Wifi color="primary" sx={{ mr: 1 }} />
      </ToggleButton>
      <ToggleButton
        value={false}
        aria-label="global discovery"
        variant="outlined"
      >
        <Public color="primary" sx={{ mr: 1 }} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
