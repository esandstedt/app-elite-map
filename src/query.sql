/* 2D */
SELECT FLOOR(`x`/100) AS `gridX`, FLOOR(`z`/100) AS `gridY`, COUNT(*) AS `count`
FROM `system` 
WHERE `distanceToNeutron` IS NOT NULL 
  AND `distanceToNeutron` < 50
GROUP BY `gridX`, `gridY`;

/* 3D */
/* Low=200, Medium=100, High=50 */
SELECT FLOOR(`x`/200) AS `gridX`, FLOOR(`y`/200) AS `gridY`, FLOOR(`z`/200) AS `gridZ`, COUNT(*) AS `count`
FROM `system` 
WHERE `sectorY` IN (-4,-3,-2,-1,0,1,2,3,4)
  AND `distanceToNeutron` IS NOT NULL 
  AND `distanceToNeutron` < 50
GROUP BY `gridX`, `gridY`, `gridZ`;