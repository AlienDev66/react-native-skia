import {
  add,
  Canvas,
  Circle,
  LinearGradient,
  Paint,
  vec,
  sub,
  Fill,
  useLoop,
  mix,
  Turbulence,
  BackdropFilter,
  DisplacementMap,
  Offset,
  Blur,
  useDerivedValue,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const c = vec(width / 2, height / 2);
const r = c.x - 32;
const rect = { x: 0, y: c.y, width, height: c.y };

export const Glassmorphism = () => {
  const progress = useLoop({ duration: 2000 });
  const start = useDerivedValue(
    () => sub(c, vec(0, mix(progress.value, r, r / 2))),
    [progress]
  );
  const end = useDerivedValue(
    () => add(c, vec(0, mix(progress.value, r, r / 2))),
    [progress]
  );
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="black" />
      <Paint>
        <LinearGradient
          start={start}
          end={end}
          colors={["#FFF723", "#E70696"]}
        />
      </Paint>
      <Circle c={c} r={() => mix(progress.value, r, r / 2)} />
      <BackdropFilter clip={rect}>
        <Blur sigmaX={2} sigmaY={2}>
          <Offset x={-5} y={0}>
            <DisplacementMap channelX="r" channelY="a" scale={20}>
              <Turbulence freqX={0.01} freqY={0.05} octaves={2} />
            </DisplacementMap>
          </Offset>
        </Blur>
        <Fill color="rgba(0, 0, 0, 0.3)" />
      </BackdropFilter>
    </Canvas>
  );
};
