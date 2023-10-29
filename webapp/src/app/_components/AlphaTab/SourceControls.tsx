"use client";

import { AlphaTabContext } from "@/app/_store/alphaTab-context";
import { Button, Space } from "antd";
import { useContext, useState } from "react";

export default function SourceControls() {
  const [songSelected, setSongSelected] = useState(1);
  const { apiInstance } = useContext(AlphaTabContext);
  const handleSongSelected = song => {
    console.log(song);
    if (apiInstance) apiInstance.load(song.file);
    setSongSelected(song);
  };

  return (
    <Space>
      {[
        { id: 0, name: "Radio", file: "./radio.xml" },
        { id: 1, name: "Maria", file: "./maria.gp5" },
        { id: 2, name: "Suddenly I See", file: "./suddenly.gp4" },
        { id: 3, name: "You Know I'm No Good", file: "./nogood.gp5" },
      ].map((song: Record<any, any>) => (
        <Button
          onClick={() => handleSongSelected(song)}
          key={song.id}
          className={songSelected.id === song.id ? "active" : undefined}
        >
          {song.name}
        </Button>
      ))}
    </Space>
  );
}
