import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

export default function ResizablePanel({
  children,
}) {
  let [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={height ? { height } : {}}
      style={height ? { height } : {}}
      className="relative w-full overflow-hidden"
      transition={{ type: "tween", duration: 0.5 }}
    >
      <div ref={ref} className={height ? "absolute inset-x-0" : "relative"}>
        {children}
      </div>
    </motion.div>
  );
}

// This code exports a React component named ResizablePanel that uses the Framer Motion library and the react-use-measure library.

// The ResizablePanel component takes a single prop named children which should be a React node representing the content that will be rendered within the resizable panel.

// The useMeasure hook is used to measure the height of the content inside the panel. The useMeasure hook is provided by the react-use-measure library and returns a ref and a height value that is updated when the content changes.

// The ResizablePanel component then renders a motion.div element that is used to animate the height of the panel when its content changes. If the height value returned by useMeasure is truthy (i.e., not zero or undefined), the motion.div element is animated to have the same height as the content. If the height value is falsy, the motion.div element is not animated and has no height.

// The content of the panel is rendered within a div element that has a ref set to the useMeasure hook's ref and is either absolutely positioned to fill the width of the panel (if the height is truthy) or relatively positioned (if the height is falsy).

// The transition prop is used to specify the animation transition. In this case, the type is set to "tween" and the duration is set to 0.5 seconds, which means that the height of the panel will animate smoothly over a half-second duration.

// Overall, this component provides a basic implementation for a resizable panel that animates smoothly when its content changes.
