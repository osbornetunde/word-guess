import React from 'react';

const createMotionComponent = (Component: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.forwardRef((props: any, ref: React.Ref<any>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
      children,
      whileHover,
      whileTap,
      initial,
      animate,
      exit,
      transition,
      variants,
      layout,
      drag,
      dragConstraints,
      onDragStart,
      onDrag,
      onDragEnd,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ...rest
    } = props;
    return React.createElement(Component, { ...rest, ref }, children);
  });

export const motion = {
  div: createMotionComponent('div'),
  button: createMotionComponent('button'),
  span: createMotionComponent('span'),
  h1: createMotionComponent('h1'),
  h2: createMotionComponent('h2'),
  h3: createMotionComponent('h3'),
  h4: createMotionComponent('h4'),
  p: createMotionComponent('p'),
};

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => children;
