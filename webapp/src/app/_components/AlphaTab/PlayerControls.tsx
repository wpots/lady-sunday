"use client";
import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { AlphaTabContext } from "../../_store/alphaTab-context";

import { StepBackwardFilled } from "@ant-design/icons";
import { Button, Tooltip, Slider, Select, Row, Col, Space, Divider } from "antd";

// https://alphatab.net/docs/reference/api

import "./PlaybackControls.scss";
import AppIcon from "../UI/AppIcon";

export default function PlayerControls() {
  const { apiInstance } = useContext(AlphaTabContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    if (apiInstance) apiInstance.playPause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  const handleStop = () => {
    if (isPlaying) apiInstance.stop();
  };

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <Space>
      <Tooltip title="libo" style={{ marginLeft: "auto" }}>
        <Button
          size="large"
          disabled={isPlaying && progress === 0}
          icon={<AppIcon name="backward-2" />}
          onClick={handleStop}
        />
      </Tooltip>
      <Tooltip title={isPlaying ? "pause" : "play"}>
        <Button
          size="large"
          icon={<AppIcon name={isPlaying ? "pause-2" : "play-2"} />}
          onClick={handlePlayPause}
          className={isPlaying ? "active" : undefined}
        />
      </Tooltip>
      <Tooltip title="loop" style={{ marginLeft: "auto" }}>
        <Button ghost={!loop} size="large" icon={<AppIcon name="loop-2" />} onClick={handlePlayPause} />
      </Tooltip>
    </Space>
  );
}
