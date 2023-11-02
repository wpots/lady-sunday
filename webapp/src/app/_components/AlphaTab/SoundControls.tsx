"use client";
import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { AlphaTabContext } from "../../_store/alphaTab-context";

import { StepBackwardFilled } from "@ant-design/icons";
import { Button, Tooltip, Slider, Select, Row, Col, Space, Divider, Grid } from "antd";
const { useBreakpoint } = Grid;
// https://alphatab.net/docs/reference/api

import "./PlaybackControls.scss";
import AppIcon from "../UI/AppIcon";

interface IPlayerControlsProps {
  onTrackControls: () => void;
  trackControlsOpen: boolean;
}

export default function SoundControls({ onTrackControls, trackControlsOpen }: IPlayerControlsProps) {
  const { apiInstance } = useContext(AlphaTabContext);
  const [volume, setVolume] = useState(1);

  const screens = useBreakpoint();

  useEffect(() => {
    if (apiInstance) apiInstance.masterVolume = volume;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);

  const handleVolumeChange = (volume: number) => {
    setVolume(volume);
  };

  return (
    <Space>
      <Tooltip title="track settings">
        <Button
          style={{ marginRight: "1rem" }}
          ghost={!trackControlsOpen}
          size="large"
          icon={<AppIcon name="settings-2" />}
          onClick={() => onTrackControls()}
          className={trackControlsOpen ? "active" : undefined}
        />
      </Tooltip>
      {screens.md && (
        <div className="slider-wrapper">
          <AppIcon name="sound-2" />
          <Slider
            min={0}
            max={1}
            onChange={handleVolumeChange}
            value={typeof volume === "number" ? volume : 0}
            step={0.1}
          />
        </div>
      )}
    </Space>
  );
}
