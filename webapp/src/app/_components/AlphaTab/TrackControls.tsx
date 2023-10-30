"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { AlphaTabContext } from "../../_store/alphaTab-context";

import { StepBackwardFilled } from "@ant-design/icons";
import { Button, Tooltip, Slider, Select, Row, Col, Space, Divider } from "antd";

// https://alphatab.net/docs/reference/api

type Toggles = {
  mute: boolean;
  solo: boolean;
};

import AppIcon from "../UI/AppIcon";
export default function TrackControls({ id }: { id: number }) {
  const { apiInstance } = useContext(AlphaTabContext);
  const [volume, setVolume] = useState(1);
  const [toggles, setToggles] = useState<Toggles>({ mute: false, solo: false });

  useEffect(() => {
    if (apiInstance && id) apiInstance.changeTrackMute([apiInstance.score.tracks[id]], toggles.mute);
    if (apiInstance && id) apiInstance.changeTrackSolo([apiInstance.score.tracks[id]], toggles.solo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggles, id]);

  useEffect(() => {
    if (apiInstance) apiInstance.changeTrackVolume = volume;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);

  const handleVolumeChange = (volume: number) => {
    setVolume(volume);
  };

  const handleToggles = (type: string) => {
    setToggles(prev => ({
      ...prev,
      [type]: !prev[type as keyof Toggles],
    }));
  };

  return (
    <>
      <Col span={24}>
        <Space style={{ width: "100%", marginBottom: ".5rem", justifyContent: "space-between" }}>
          <Button ghost={!toggles.mute} onClick={() => handleToggles("mute")}>
            mute
          </Button>
          <Button ghost={!toggles.solo} onClick={() => handleToggles("solo")}>
            solo
          </Button>
        </Space>
      </Col>
      <Col span={24} className="slider-wrapper">
        <AppIcon name="sound-2" />
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
