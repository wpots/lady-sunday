"use client";
import { useContext, useEffect, useState } from "react";
import { Badge, Typography } from "antd";
import { AlphaTabContext } from "@/app/_store/alphaTab-context";
import AppIcon from "../UI/AppIcon";
import { Toggles } from "./TrackControls";
import { CustomerServiceOutlined, StopOutlined } from "@ant-design/icons";

interface TrackItemProps {
  id: string;
  track: Record<any, any>;
  toggles: Toggles;
}
export default function TrackItem({ id, track, toggles }: TrackItemProps) {
  // const [imgSrc, setImgSrc] = useState(`/icons/keyboard.svg`);
  const { activeTrack, setActiveTrack, apiInstance } = useContext(AlphaTabContext);

  useEffect(() => {
    if (apiInstance && activeTrack === id) apiInstance.renderTracks([track]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTrack, track]);

  const resolveIconByName = (name: string) => {
    const sanitizedName = name.toLowerCase();
    if (sanitizedName.includes("voice")) return "microphone";
    if (sanitizedName.includes("drums") || sanitizedName.includes("drum-set") || sanitizedName.includes("hi-hat"))
      return "drums";
    if (sanitizedName.includes("bells")) return "tambourine";
    if (sanitizedName.includes("flute")) return "flute";
    if (sanitizedName.includes("violin")) return "violin";
    if (sanitizedName.includes("piano")) return "keyboard";
    if (sanitizedName.includes("shaker")) return "maracas";
    if (sanitizedName.includes("electric") || sanitizedName.includes("bass")) return "electric-guitar";
    if (sanitizedName.includes("guitar")) return "guitar";
    return "keyboard";
  };

  const classes = () => {
    let trackClass = `at-track`;
    if (activeTrack === id) trackClass += ` active`;
    if (toggles?.mute) trackClass += ` mute`;
    if (toggles?.solo) trackClass += ` solo`;
    return trackClass;
  };

  const handleTrackClick = (e: any) => {
    // e.preventDefault();
    setActiveTrack(id);
  };
  return (
    <div className={classes()} onClick={handleTrackClick}>
      <div className="at-track-icon">
        <Badge
          dot={activeTrack === id || toggles?.solo}
          count={
            toggles?.mute ? (
              <StopOutlined style={{ color: "red", fontSize: ".5rem" }} />
            ) : toggles?.solo ? (
              <CustomerServiceOutlined style={{ color: "var(--md-sys-color-primary)", fontSize: ".5rem" }} />
            ) : null
          }
          color={"var(--md-sys-color-tertiary)"}
          style={{ boxShadow: "none" }}
        >
          <AppIcon name={resolveIconByName(track.name)} />
        </Badge>
      </div>
      <div className="at-track-details">
        <Typography.Text ellipsis={true}>{track.name}</Typography.Text>
      </div>
    </div>
  );
}
