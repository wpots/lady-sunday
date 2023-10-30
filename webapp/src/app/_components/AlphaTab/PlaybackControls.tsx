"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { AlphaTabContext } from "../../_store/alphaTab-context";

import { Button, Tooltip, Slider, Row, Col, Space } from "antd";
import { Footer } from "antd/es/layout/layout";
// https://alphatab.net/docs/reference/api

import AppIcon from "../UI/AppIcon";
import PlayerControls from "./PlayerControls";
import "./Controls.css";

export default function PlaybackControls() {
  const { apiInstance } = useContext(AlphaTabContext);

  const [speed, setSpeed] = useState(1.0);
  const [countIn, setCountIn] = useState(false);
  const [metronome, setMetronome] = useState(false);

  useEffect(() => {
    if (apiInstance) apiInstance.playbackSpeed = speed;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed]);

  useEffect(() => {
    if (apiInstance) apiInstance.metronomeVolume = metronome;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countIn, metronome]);

  useEffect(() => {
    if (apiInstance) apiInstance.countInVolume = !countIn ? metronome || 0.5 : false;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metronome]);

  const handleSpeedChange = (speed: number) => {
    setSpeed(speed);
  };
  const handleCountIn = () => {
    setCountIn(prev => !prev);
  };
  const handleMetronome = () => {
    setMetronome(prev => !prev);
  };

  return (
    <Space>
      <div className="slider-wrapper">
        <AppIcon name="speed-2" style={{ color: "#1677ff" }} />
        <small className="speed-count">speed: {speed}</small>
        <Slider min={0} max={2} onChange={handleSpeedChange} value={typeof speed === "number" ? speed : 0} step={0.1} />
      </div>
      <Tooltip title="count in">
        <Button
          type="primary"
          ghost={!countIn}
          size="large"
          shape="circle"
          icon={<AppIcon name="countin-2" />}
          onClick={handleCountIn}
          className={countIn ? "active" : undefined}
        />
      </Tooltip>
      <Tooltip title="metronome">
        <Button
          type="primary"
          ghost={!metronome}
          size="large"
          shape="circle"
          icon={<AppIcon name="metronome-2" />}
          onClick={handleMetronome}
          className={metronome ? "active" : undefined}
        />
      </Tooltip>
    </Space>
  );
}
