import React, { useState, useCallback, Fragment, useEffect } from "react";
import Saturation from "@uiw/react-color-saturation";
import Alpha from "@uiw/react-color-alpha";
import EditableInput from "@uiw/react-color-editable-input";
import RGBA from "@uiw/react-color-editable-input-rgba";
import { PointerProps } from "@uiw/react-color-alpha/esm/Pointer";
import Hue from "@uiw/react-color-hue";
import {
  validHex,
  HsvaColor,
  hsvaToHex,
  hsvaToRgbaString,
  hexToHsva,
  color as handleColor,
  ColorResult,
  rgbStringToHsva,
  getContrastingColor,
  rgbaStringToHsva,
} from "@uiw/color-convert";
import Swatch, { SwatchPresetColor } from "./components/Swatch";
import IconColorPalette from "./components/IconColorPalette";
import { validRgb, validRgba } from "./utils";
import colorString from "color-string";

const PRESET_COLORS = [
  "rgb(245, 34, 45)",
  "rgb(250, 84, 28)",
  "rgb(250, 140, 22)",
  "rgb(250, 173, 20)",
  "rgb(250, 219, 20)",
  "rgb(160, 217, 17)",
  "rgb(82, 196, 26)",
  "rgb(19, 194, 194)",
  "rgb(24, 144, 255)",
  "rgb(47, 84, 235)",
  "rgb(114, 46, 209)",
  "rgb(235, 47, 150)",
  "rgb(255, 77, 79)",
  "rgb(255, 122, 69)",
  "rgb(255, 169, 64)",
  "rgb(255, 197, 61)",
  "rgb(255, 236, 61)",
  "rgb(186, 230, 55)",
  "rgb(115, 209, 61)",
  "rgb(54, 207, 201)",
  "rgb(64, 169, 255)",
  "rgb(89, 126, 247)",
  "rgb(255 255 255)",
  "rgba(255, 255, 255, 0)",
];

type HexColor = string;
type RgbColor = string;
type RgbaColor = string;
type StringColor = string;

type Color = HexColor | RgbaColor | RgbColor | StringColor;

export interface SketchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "color"> {
  prefixCls?: string;
  width?: number;
  color?: Color;
  presetColors?: false | SwatchPresetColor[];
  editableDisable?: boolean;
  onChange?: (newShade: ColorResult) => void;
}

const Bar = (props: PointerProps) => (
  <div
    style={{
      boxShadow: "rgb(0 0 0 / 60%) 0px 0px 2px",
      width: 4,
      top: 1,
      bottom: 1,
      left: props.left,
      borderRadius: 1,
      position: "absolute",
      backgroundColor: "#fff",
    }}
  />
);

const Sketch = React.forwardRef<HTMLDivElement, SketchProps>((props, ref) => {
  const {
    prefixCls = "w-color-sketch",
    className,
    onChange,
    width = 218,
    presetColors = PRESET_COLORS,
    color,
    editableDisable = true,
    style,
    ...other
  } = props;

  const [hsva, setHsva] = useState({ h: 209, s: 36, v: 90, a: 1 });

  useEffect(() => {
    const rgba = colorString.get.rgb(color || "transparent");
    // @ts-ignore
    setHsva(rgbaStringToHsva(colorString.to.rgb(rgba)));
  }, [color]);

  const handleChange = useCallback(
    (hsv: HsvaColor) => {
      setHsva(hsv);
      onChange && onChange(handleColor(hsv));
    },
    [hsva]
  );

  const handleHex = (value: string | number, evn: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof value === "string" && validHex(value) && /(3|6)/.test(String(value.length))) {
      handleChange(hexToHsva(value));
    }
  };

  return (
    <div
      {...other}
      className={`${prefixCls} ${className || ""}`}
      ref={ref}
      style={{
        background: "rgb(255, 255, 255)",
        borderRadius: 4,
        boxShadow: "rgb(0 0 0 / 15%) 0px 0px 0px 1px, rgb(0 0 0 / 15%) 0px 8px 16px",
        width,
        ...style,
      }}
    >
      <div style={{ padding: "10px 10px 8px" }}>
        <Saturation
          hsva={hsva}
          style={{ width: "auto", height: 150 }}
          onChange={(newColor) => handleChange({ ...hsva, ...newColor, a: hsva.a })}
        />
        <div style={{ display: "flex", marginTop: 4 }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            {"EyeDropper" in window ? (
              <div
                style={{
                  width: "22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "4px",
                }}
                onClick={async (e) => {
                  // @ts-ignore
                  const eyeDropper = new EyeDropper(); // 初始化一个EyeDropper对象
                  // console.log('按Esc可退出')
                  try {
                    const result = (await eyeDropper.open()) as any; // 开始拾取颜色
                    console.log("result", result);
                    handleChange(hexToHsva(result?.sRGBHex));
                    // @ts-ignore
                  } catch (e) {
                    // console.log('用户取消了取色')
                  }
                }}
              >
                <IconColorPalette />
              </div>
            ) : null}
            <div style={{ flex: 1 }}>
              <Hue
                width="auto"
                height={10}
                hue={hsva.h}
                pointer={Bar}
                innerProps={{
                  style: { marginLeft: 1, marginRight: 5 },
                }}
                onChange={(newHue) => handleChange({ ...hsva, ...newHue })}
              />
              <Alpha
                width="auto"
                height={10}
                hsva={hsva}
                pointer={Bar}
                style={{ marginTop: 4 }}
                innerProps={{
                  style: { marginLeft: 1, marginRight: 5 },
                }}
                onChange={(newAlpha) => {
                  handleChange({ ...hsva, ...{ a: newAlpha.a } });
                }}
              />
            </div>
          </div>

          <Alpha
            width={24}
            height={24}
            hsva={hsva}
            radius={2}
            style={{
              marginLeft: 4,
            }}
            bgProps={{ style: { background: "transparent" } }}
            innerProps={{
              style: {
                borderRadius: 2,
                background: hsvaToRgbaString(hsva),
                boxShadow: "rgb(0 0 0 / 15%) 0px 0px 0px 1px inset, rgb(0 0 0 / 25%) 0px 0px 4px inset",
              },
            }}
            pointer={() => <Fragment />}
          />
        </div>
      </div>
      {editableDisable && (
        <div style={{ display: "flex", margin: "0 10px 3px 10px" }}>
          <EditableInput
            label="Hex"
            value={hsvaToHex(hsva).replace(/^#/, "").toLocaleUpperCase()}
            onChange={(evn, val) => handleHex(val, evn)}
            style={{ minWidth: 58 }}
          />
          <RGBA hsva={hsva} style={{ marginLeft: 6 }} onChange={(result) => handleChange(result.hsva)} />
        </div>
      )}
      {presetColors && presetColors.length > 0 && (
        <Swatch
          style={{
            borderTop: "1px solid rgb(238, 238, 238)",
            paddingTop: 10,
            paddingLeft: 10,
          }}
          colors={presetColors}
          color={hsvaToHex(hsva)}
          onChange={(hsvColor) => handleChange(hsvColor)}
          rectProps={{
            // children: <Point />,
            style: {
              marginRight: 10,
              marginBottom: 10,
              borderRadius: 3,
              boxShadow: "rgb(0 0 0 / 15%) 0px 0px 0px 1px inset",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
          rectRender={({ style, checked, color, onClick }) => {
            if (color !== "rgba(255, 255, 255, 0)") {
              return <div key={color} style={style} onClick={onClick}></div>;
            }

            return (
              <div
                key={color}
                onClick={onClick}
                style={{
                  ...style,
                  background:
                    'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADFJREFUOE9jZGBgEGHAD97gk2YcNYBhmIQBgWSAP52AwoAQwJvQRg1gACckQoC2gQgAIF8IscwEtKYAAAAASUVORK5CYII=") left center',
                }}
              ></div>
            );
          }}
        />
      )}
    </div>
  );
});

Sketch.displayName = "Sketch";

export default Sketch;
