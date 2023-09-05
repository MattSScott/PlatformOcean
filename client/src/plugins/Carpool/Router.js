import Button from "@mui/material/Button";

export default function Router({ locations }) {
  const generateRoute = () => {
    for (const loc of locations) {
      console.log(loc);
    }
  };

  return (
    locations.length > 1 && (
      <Button variant="outlined" onClick={generateRoute}>
        Generate Route
      </Button>
    )
  );
}
