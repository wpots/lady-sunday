"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { AlphaTabContext } from "../../_store/alphaTab-context";

import {
  SearchOutlined,
  DashOutlined,
  FieldTimeOutlined,
  PlayCircleFilled,
  PauseCircleFilled,
  StepBackwardFilled,
  PauseOutlined,
} from "@ant-design/icons";
import { Button, Tooltip, Slider, Select, Row, Col, Space, Divider } from "antd";
import { Footer } from "antd/es/layout/layout";
// https://alphatab.net/docs/reference/api

import "./Controls.css";
import AppIcon from "../UI/AppIcon";
export default function PlayerControls() {
  const { apiInstance } = useContext(AlphaTabContext);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

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
    <>
      <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
        <Space>
          <Tooltip title="libo">
            <Button
              type="primary"
              size="large"
              shape="circle"
              disabled={!isPlaying && progress === 0}
              icon={<StepBackwardFilled />}
              onClick={handleStop}
            />
          </Tooltip>
          <Tooltip title={isPlaying ? "pause" : "play"}>
            <Button
              type="primary"
              size="large"
              shape="circle"
              icon={<AppIcon name={isPlaying ? "pause" : "play"} />}
              onClick={handlePlayPause}
              className={isPlaying ? "active" : undefined}
            />
          </Tooltip>
        </Space>
      </Col>
      <Col span={4} offset={4} className="slider-wrapper small">
        <AppIcon name="volume-icon" style={{ color: "#1677ff" }} />
        <Slider
          min={0}
          max={1}
          onChange={handleVolumeChange}
          value={typeof volume === "number" ? volume : 0}
          step={0.1}
        />
      </Col>
    </>
  );
}
