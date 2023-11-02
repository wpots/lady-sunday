"use client";
import { useContext, useEffect, useState, useRef } from "react";
import { AlphaTabContext } from "../../_store/alphaTab-context";

import { Flex, Progress, Space, Grid } from "antd";

// https://alphatab.net/docs/reference/api

import "./PlaybackControls.scss";

function formatDuration(milliseconds: number) {
  let seconds = milliseconds / 1000;
  const minutes = (seconds / 60) | 0;
  seconds = (seconds - minutes * 60) | 0;
  return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

export default function PlayerFeedback() {
  const { apiInstance } = useContext(AlphaTabContext);
  const [progress, setProgress] = useState({ start: 0, end: 0 });
  const [percent, setPercent] = useState(0);
  const prevTime = useRef(-1);

  useEffect(() => {
    apiInstance.playerPositionChanged?.on((e: any) => {
      const currentSeconds = (e.currentTime / 1000) | 0;
      if (currentSeconds == prevTime.current) return;
      if (!progress.end) setProgress(p => ({ ...p, end: e.endTime }));
      setProgress(p => ({ ...p, start: e.currentTime }));
    });
  }, [apiInstance.playerPositionChanged]);

  useEffect(() => {
    const percentage = Math.floor((progress.start / progress.end) * 100);
    setPercent(percentage);
  }, [progress]);

  return (
    <Flex gap="small">
      {formatDuration(progress.start)}
      <Progress percent={percent} showInfo={false} />
      {formatDuration(progress.end - progress.start)}
    </Flex>
  );
}
