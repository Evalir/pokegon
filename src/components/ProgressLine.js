import React, { useEffect, useState } from 'react'
import 'styled-components/macro'

const ProgressLine = ({
  label,
  backgroundColor = '#e5e5e5',
  // expected format for visual parts
  visualParts = [
    {
      percentage: '0%',
      color: 'white',
    },
  ],
}) => {
  // Starting values needed for the animation
  // Mapped by "visualParts" so it can work with multiple values dynamically
  // It's an array of percentage widths
  const [widths, setWidths] = useState(
    visualParts.map(() => {
      return 0
    })
  )

  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    // You need to wrap it to trigger the animation
    requestAnimationFrame(() => {
      // Set a new array of percentage widths based on the props
      setWidths(
        visualParts.map((item) => {
          return item.percentage
        })
      )
    })
  }, [visualParts])

  return (
    <>
      <div>{label}</div>
      <div
        css={`
          background-color: ${backgroundColor};
          display: flex;
          height: 6px;
          margin: 20px 0;
        `}
      >
        {visualParts.map((item, index) => {
          // map each part into separate div and each will be animated
          // because of the "transition: width 2s;" css in class "progressVisualPart"
          // and because of the new width ("widths[index]", previous one was 0)
          return (
            <div
              // There won't be additional changes in the array so the index can be used
              key={index}
              css={`
                transition: width 2s;
                width: ${widths[index]};
                background-color: ${item.color};
              `}
            />
          )
        })}
      </div>
    </>
  )
}

export default ProgressLine
