const resizeWindow = (width: number) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
};

export { resizeWindow };
