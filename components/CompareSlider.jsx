import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export const CompareSlider = ({
  original,
  restored,
}) => {
  return (
    <ReactCompareSlider
      itemOne={< ReactCompareSliderImage src={original} alt="original video" />}
      itemTwo={< ReactCompareSliderImage src={restored} alt="generated feedback" />}
      portrait
      className="flex w-[600px] mt-5 h-96"
    />
  );
};
