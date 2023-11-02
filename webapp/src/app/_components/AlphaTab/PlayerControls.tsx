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
  const [isLooping, setIsLooping] = useState(false);

  useEffect(() => {
    if (apiInstance) apiInstance.playPause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => {
    if (apiInstance) apiInstance.isLooping = isLooping;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLooping]);

  const playStart = !isPlaying;

  const handleStop = () => {
    apiInstance.stop();
  };

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const handleLooping = () => {
    setIsLooping(prev => !prev);
  };

  return (
    <Space style={{ display: "flex", justifyContent: "center" }}>
      <Tooltip title="libo" style={{ marginLeft: "auto" }}>
        <Button
          size="large"
          // disabled={progress === 0}
          icon={<AppIcon name="backward-2" />}
          onClick={handleStop}
        />
      </Tooltip>
      <Tooltip title={playStart ? "play" : "pause"}>
        <Button
          size="large"
          icon={<AppIcon name={playStart ? "play-2" : "pause-2"} />}
          onClick={handlePlayPause}
          className={isPlaying ? "active" : undefined}
        />
      </Tooltip>
      <Tooltip title="loop" style={{ marginLeft: "auto" }}>
        <Button ghost={!isLooping} size="large" icon={<AppIcon name="loop-2" />} onClick={handleLooping} />
      </Tooltip>
    </Space>
  );
}
