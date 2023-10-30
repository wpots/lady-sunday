"use client";
import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { AlphaTabContext } from "../../_store/alphaTab-context";

import { StepBackwardFilled } from "@ant-design/icons";
import { Button, Tooltip, Slider, Select, Row, Col, Space, Divider } from "antd";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    if (apiInstance) apiInstance.playPause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => {
    if (apiInstance) apiInstance.masterVolume = volume;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);

  const handleVolumeChange = (volume: number) => {
    setVolume(volume);
  };

  const handleStop = () => {
    if (isPlaying) apiInstance.stop();
  };

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <Space>
      <Tooltip title="track settings">
        <Button
          style={{ marginRight: "1rem" }}
          type="primary"
          ghost={!trackControlsOpen}
          size="large"
          shape="circle"
          icon={<AppIcon name="settings-2" />}
          onClick={() => onTrackControls()}
          className={trackControlsOpen ? "active" : undefined}
        />
      </Tooltip>
      <div className="slider-wrapper">
        <AppIcon name="sound-2" style={{ color: "#1677ff" }} />
        <Slider
          min={0}
          max={1}
          onChange={handleVolumeChange}
          value={typeof volume === "number" ? volume : 0}
          step={0.1}
        />
      </div>
    </Space>
  );
}
