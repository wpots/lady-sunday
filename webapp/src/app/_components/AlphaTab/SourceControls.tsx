"use client";

import { AlphaTabContext } from "@/app/_store/alphaTab-context";
import { Button, Space } from "antd";
import { useContext, useEffect, useState } from "react";

export type Song = {
  id: number;
  name: string;
  file: string;
};

export default function SourceControls() {
  const [songSelected, setSongSelected] = useState<Song>({ id: 1, name: "Maria", file: "./maria.gp5" });
  const { apiInstance } = useContext(AlphaTabContext);
  useEffect(() => {
    if (apiInstance) apiInstance.load(songSelected.file);
  }, [songSelected]);
  const handleSongSelected = (song: Song) => {
    setSongSelected(song);
  };

  return (
    <Space>
      {[
        { id: 0, name: "Radio", file: "./radio.xml" },
        { id: 1, name: "Maria", file: "./maria.gp5" },
        { id: 2, name: "Suddenly I See", file: "./suddenly.gp4" },
        { id: 3, name: "You Know I'm No Good", file: "./nogood.gp5" },
      ].map((song: Song) => (
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
