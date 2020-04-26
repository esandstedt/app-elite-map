function convert(sectors) {
  let minX = 1e6,
    maxX = -1e6,
    minY = 1e6,
    maxY = -1e6,
    minZ = 1e6,
    maxZ = -1e6,
    maxCount = 0;

  sectors.forEach(({ gridX, gridY, gridZ, count }) => {
    minX = Math.min(minX, parseInt(gridX));
    maxX = Math.max(maxX, parseInt(gridX));
    minY = Math.min(minY, parseInt(gridY));
    maxY = Math.max(maxY, parseInt(gridY));
    minZ = Math.min(minZ, parseInt(gridZ));
    maxZ = Math.max(maxZ, parseInt(gridZ));
    maxCount = Math.max(maxCount, parseInt(count));
  });

  const lengthX = maxX - minX + 1;
  const lengthY = maxY - minY + 1;
  const lengthZ = maxZ - minZ + 1;

  const points = {};

  sectors.forEach(({ gridX, gridY, gridZ, count }) => {
    const x = lengthX - (parseInt(gridX) - minX);
    const y = parseInt(gridY) - minY;
    const z = parseInt(gridZ) - minZ;

    if (!points[x]) {
      points[x] = {};
    }

    if (!points[x][y]) {
      points[x][y] = {};
    }

    points[x][y][z] = count;
  });

  const array = new Int16Array(lengthX * lengthY * lengthZ);

  for (let x = 0; x < lengthX; x++) {
    for (let y = 0; y < lengthY; y++) {
      for (let z = 0; z < lengthZ; z++) {
        const index = z * (lengthX * lengthY) + y * lengthX + x;
        const value = ((points[x] || {})[y] || {})[z] || 0;
        array[index] = value;
      }
    }
  }

  return {
    array,
    lengthX,
    lengthY,
    lengthZ
  };
}

module.exports = {
  convert
};
