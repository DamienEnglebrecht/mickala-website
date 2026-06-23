INSERT INTO parts_categories (name, slug, description, sort_order) VALUES
  ('Other Components', 'other', 'Other Components for Mickala lighting towers', 10)
ON CONFLICT (slug) DO NOTHING;

-- Safety & Accessories (16 parts)

INSERT INTO parts (category_id, sku, name, slug, description, price, unit, stock_quantity, min_order_qty) VALUES
  ((SELECT id FROM parts_categories WHERE slug = 'safety'), 'S00001', 'SENSOR, FUEL LEVEL ASSY', 's00001', 'SENSOR, FUEL LEVEL ASSY', 0.00, 'each', 0, 1),
  ((SELECT id FROM parts_categories WHERE slug = 'safety'), 'S00002', 'LIGHT, LED FLASHING (RED) ASSY', 's00002', 'LIGHT, LED FLASHING (RED) ASSY', 0.00, 'each', 0, 1),
  ((SELECT id FROM parts_categories WHERE slug = 'safety'), 'S00003', 'LIGHT, LED FLASHING (AMBER) ASSY', 's00003', 'LIGHT, LED FLASHING (AMBER) ASSY', 0.00, 'each', 0, 1),
  ((SELECT id FROM parts_categories WHERE slug = 'safety'), 'S00004', 'LIGHT, LED TAIL INDICATOR ASSY', 's00004', 'LIGHT, LED TAIL INDICATOR ASSY', 0.00, 'each', 0, 1),
  ((SELECT id FROM parts_categories WHERE slug = 'safety'), 'S00005', 'LIGHT, WORK (CABIN) ASSY', 's00005', 'LIGHT, WORK (CABIN) ASSY', 0.00, 'each', 0, 1),
  ((SELECT id FROM parts_categories WHERE slug = 'safety'), 'S00006', 'LIGHT, NUMBER PLATE ASSY', 's00006', 'LIGHT, NUMBER PLATE ASSY', 0.00, 'each', 0, 1),
  ((SELECT id FROM parts_categories WHERE slug = 'safety'), 'S00007', 'SOLENOID, FUEL STARTSTOP (WOODWARD) ASSY', 's00007', 'SOLENOID, FUEL STARTSTOP (WOODWARD) ASSY', 0.00, 'each', 0, 1),
  ((SELECT id FROM parts_categories WHERE slug = 'safety'), 'S00008', 'SENSOR, SPEED (RPM) ASSY', 's00008', 'SENSOR, SPEED (RPM) ASSY', 0.00, 'each', 0, 1),
  ((SELECT id FROM parts_categories WHERE slug = 'safety'), 'S00009', 'BRAKE AWAY CONTROLLER SUIT ELECTRIC DRUM ASSY', 's00009', 'BRAKE AWAY CONTROLLER SUIT ELECTRIC DRUM ASSY', 0.00, 'each', 0, 1),
  ((SELECT id FROM parts_categories WHERE slug = 'safety'), 'S00010', 'BRAKE AWAY SWITCH SUIT ELECTRIC DRUM ASSY', 's00010', 'BRAKE AWAY SWITCH SUIT ELECTRIC DRUM ASSY', 0.00, 'each', 0, 1),
  ((SELECT id FROM parts_categories WHERE slug = 'safety'), 'S00011', 'PUMP, ELECTRIC FUEL PICKUP ASSY', 's00011', 'PUMP, ELECTRIC FUEL PICKUP ASSY', 0.00, 'each', 0, 1),
  ((SELECT id FROM parts_categories WHERE slug = 'safety'), 'S00012', 'SENSOR, FUEL LEVEL, COMPLETE ASSY (MLT1280)', 's00012', 'SENSOR, FUEL LEVEL, COMPLETE ASSY (MLT1280)', 0.00, 'each', 0, 1),
  ((SELECT id FROM parts_categories WHERE slug = 'safety'), 'S00013', 'SENSOR, FUEL LEVEL, COMPLETE ASSY (MLR)', 's00013', 'SENSOR, FUEL LEVEL, COMPLETE ASSY (MLR)', 0.00, 'each', 0, 1),
  ((SELECT id FROM parts_categories WHERE slug = 'safety'), 'S00014', 'SENSOR, FUEL LEVEL, COMPLETE ASSY (MLT1000)', 's00014', 'SENSOR, FUEL LEVEL, COMPLETE ASSY (MLT1000)', 0.00, 'each', 0, 1),
  ((SELECT id FROM parts_categories WHERE slug = 'safety'), 'S00015', 'LIGHT, LED TAIL INDICATOR ASSY (MLT1280)', 's00015', 'LIGHT, LED TAIL INDICATOR ASSY (MLT1280)', 0.00, 'each', 0, 1),
  ((SELECT id FROM parts_categories WHERE slug = 'safety'), 'SLED001', 'SLED001 - SLED, DRAGLINE', 'sled001', 'SLED001 - SLED, DRAGLINE', 0.00, 'each', 0, 1)
ON CONFLICT (sku) DO NOTHING;

