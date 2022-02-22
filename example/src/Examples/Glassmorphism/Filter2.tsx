import {
  BackdropFilter,
  Canvas,
  ColorMatrix,
  Image,
  useImage,
  Skia,
  processTransform2d,
  useTouchHandler,
  useValue,
  rrect,
  rect,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";

import { BLACK_AND_WHITE, SEPIA } from "./components/ColorMatrices";

const { width, height } = Dimensions.get("window");

const star = Skia.Path.MakeFromSVGString(
  // eslint-disable-next-line max-len
  "M 0 0 C -27.1 0 -49 21.9 -49 49 C -49 76.1 -27.1 98 0 98 C 27 98 49 76.1 49 49 C 49 21.9 27 0 0 0 Z M 17.6 74.6 L 0 65.1 L -17.7 74.6 L -14.2 54.9 L -28.6 41 L -8.8 38.2 L 0 20.2 L 8.7 38.2 L 28.5 41 L 14.1 54.9 L 17.6 74.6 V 74.6 Z"
)!;
star.transform(processTransform2d([{ scale: 4 }]));

export const Glassmorphism = () => {
  const image = useImage(require("../../assets/oslo.jpg"));
  const x = useValue(0);
  const y = useValue(0);
  const offsetX = useValue(0);
  const offsetY = useValue(0);
  const onTouch = useTouchHandler({
    onStart: (pos) => {
      offsetX.value = x.value - pos.x;
      offsetY.value = y.value - pos.y;
    },
    onActive: (pos) => {
      x.value = offsetX.value + pos.x;
      y.value = offsetY.value + pos.y;
    },
  });
  if (!image) {
    return null;
  }
  return (
    <Canvas style={{ flex: 1 }} onTouch={onTouch}>
      <Image
        image={image}
        x={0}
        y={0}
        width={width}
        height={height}
        fit="cover"
      />
      <BackdropFilter
        clip={() => rrect(rect(x.value, y.value, 250, 250), 25, 25)}
      >
        <ColorMatrix matrix={BLACK_AND_WHITE} />
      </BackdropFilter>
    </Canvas>
  );
};
