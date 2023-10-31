"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { AlphaTabContext } from "../../_store/alphaTab-context";

import { StepBackwardFilled, StopOutlined } from "@ant-design/icons";
import { Button, Tooltip, Slider, Select, Row, Col, Space, Divider, Badge } from "antd";

// https://alphatab.net/docs/reference/api

export type Toggles = {
  mute?: boolean;
  solo?: boolean;
};

export type TrackToggles = { [key: string]: Toggles };

interface ITrackControlsProps {
  id: string;
  idx: number;
  onToggleChange: (toggles: TrackToggles) => void;
}

import AppIcon from "../UI/AppIcon";
export default function TrackControls({ id, idx, onToggleChange }: ITrackControlsProps) {
  const { apiInstance } = useContext(AlphaTabContext);
  const [volume, setVolume] = useState(1);
  const [mute, setMute] = useState(false);
  const [solo, setSolo] = useState(false);

  useEffect(() => {
    if (apiInstance) apiInstance.changeTrackMute([apiInstance.score.tracks[idx]], mute);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mute]);

  useEffect(() => {
    if (apiInstance) apiInstance.changeTrackSolo([apiInstance.score.tracks[idx]], solo);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solo]);

  useEffect(() => {
    onToggleChange({ [id]: { mute, solo } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solo, mute]);

  useEffect(() => {
    if (apiInstance) apiInstance.changeTrackVolume = volume;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);

  const handleVolumeChange = (volume: number) => {
    setVolume(volume);
  };

  const handleToggles = (type: string) => {
    if (type === "mute") {
      setMute(!mute);
      if (!mute && solo) setSolo(!solo);
    }

    if (type === "solo") {
      setSolo(!solo);
      if (!solo && mute) setMute(!mute);
    }
  };

  return (
    <>
      <Col span={24}>
        <Space style={{ width: "100%", marginBottom: ".5rem", justifyContent: "space-between" }}>
          <Button ghost={!mute} onClick={() => handleToggles("mute")}>
            mute
          </Button>

          <Button ghost={!solo} onClick={() => handleToggles("solo")}>
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
