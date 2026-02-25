const generateColors = (num: number) => {
  const colors = [];
  for (let i = 0; i < num; i++) {
    const hue = Math.round((360 / num) * i); // chia vòng màu đều
    colors.push(`hsl(${hue}, 60%, 50%)`); // saturation 70%, lightness 50%
  }
  return colors;
};
export default generateColors;