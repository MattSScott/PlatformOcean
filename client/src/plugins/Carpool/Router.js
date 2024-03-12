import Button from "@mui/material/Button";
import "./Carpool.css";
import { useState } from "react";

const Popup = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span style={{ display: "flex" }} onClick={() => props.setOpen(false)}>
          x
        </span>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d158886.6923811519!2d-0.3696564069843276!3d51.52047028604627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x4876184c98a92a7d%3A0x3868811e2305c7f2!2sEN4%208UA%2C%20Bohun%20Grove%2C%20London%2C%20Barnet!3m2!1d51.6425653!2d-0.1589333!4m5!1s0x48760a4ca89844e7%3A0x7bedbccfcb901205!2sLovelace%20Gardens%2C%20Surbiton%20KT6%206SS!3m2!1d51.3879586!2d-0.31064169999999997!5e0!3m2!1sen!2suk!4v1710235343908!5m2!1sen!2suk"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="embedded-mapper"
        />
      </div>
    </div>
  );
};

export default function Router({ locations }) {
  const [open, setOpen] = useState(false);

  const generateRoute = () => {
    for (const loc of locations) {
      console.log(loc);
    }
    setOpen(true);
  };

  return (
    locations.length > 1 && (
      <div>
        <Button
          variant="outlined"
          style={{ width: "200px" }}
          onClick={generateRoute}
        >
          Generate Route
        </Button>
        {open && <Popup setOpen={setOpen} />}
      </div>
    )
  );
}
