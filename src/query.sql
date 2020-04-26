/* 2D */
SELECT FLOOR(`x`/100) AS `gridX`, FLOOR(`z`/100) AS `gridY`, COUNT(*) AS `count`
FROM `system` 
WHERE `distanceToNeutron` IS NOT NULL 
  AND `distanceToNeutron` < 50
GROUP BY `gridX`, `gridY`;

/* 3D */
SELECT FLOOR(`x`/100) AS `gridX`, FLOOR(`y`/100) AS `gridY`, FLOOR(`z`/100) AS `gridZ`, COUNT(*) AS `count`
FROM `system` 
WHERE `distanceToNeutron` IS NOT NULL 
  AND `distanceToNeutron` < 50
GROUP BY `gridX`, `gridY`, `gridZ`;