"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { AlphaTabContext } from "../../_store/alphaTab-context";

import { StepBackwardFilled } from "@ant-design/icons";
import { Button, Tooltip, Slider, Select, Row, Col, Space, Divider } from "antd";

// https://alphatab.net/docs/reference/api

type Toggles = {
  mute:boolean,
  solo: boolean
}

import "./Controls.css";
import AppIcon from "../UI/AppIcon";
export default function PlayerControls() {
  const { apiInstance } = useContext(AlphaTabContext);
  const [volume, setVolume] = useState(1);
  const [toggles, setToggles] = useState<Toggles>({mute:false, solo:false});


  useEffect(() => {
    if (apiInstance) apiInstance.playPause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggles]);

  useEffect(() => {
    if (apiInstance) apiInstance.masterVolume = volume;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);

  const handleVolumeChange = (volume: number) => {
    setVolume(volume);
  };


  const handleToggles = (type: string) => {
    setToggles(prev => ({
      ...prev,
      prev[type as keyof Toggles]: !prev[type as keyof Toggles]
    })
    )
  };

  return (
    <>
      <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
        <Space>
<Button onClick={() => handleToggles('mute')}>mute</Button><Button onClick={() => handleToggles('solo')}>solo</Button>
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
