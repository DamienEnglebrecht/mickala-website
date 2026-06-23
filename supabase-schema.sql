-- Mickala Group Parts Ordering Portal Schema
-- Run this in Supabase SQL Editor

-- 1. PARTS CATEGORIES
CREATE TABLE parts_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. PARTS
CREATE TABLE parts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES parts_categories(id) ON DELETE SET NULL,
  sku TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  unit TEXT NOT NULL DEFAULT 'each',
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  min_order_qty INTEGER NOT NULL DEFAULT 1,
  image_url TEXT,
  specs JSONB DEFAULT '{}',
  compatible_with TEXT[] DEFAULT '{}',
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. CUSTOMERS (extended profile linked to auth.users)
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  postcode TEXT,
  country TEXT DEFAULT 'Australia',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. ORDERS
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','processing','shipped','delivered','cancelled')),
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  shipping_address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. ORDER ITEMS
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  part_id UUID NOT NULL REFERENCES parts(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL
);

-- 6. CART ITEMS
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  part_id UUID NOT NULL REFERENCES parts(id),
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(customer_id, part_id)
);

-- INDEXES
CREATE INDEX idx_parts_category ON parts(category_id);
CREATE INDEX idx_parts_sku ON parts(sku);
CREATE INDEX idx_parts_slug ON parts(slug);
CREATE INDEX idx_parts_available ON parts(is_available);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_cart_items_customer ON cart_items(customer_id);

-- ROW LEVEL SECURITY
ALTER TABLE parts_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Everyone can read parts catalog
CREATE POLICY "Parts categories are public" ON parts_categories FOR SELECT USING (true);
CREATE POLICY "Parts are public" ON parts FOR SELECT USING (true);

-- Customers can only read/write their own data
CREATE POLICY "Customers can read own profile" ON customers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Customers can insert own profile" ON customers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Customers can update own profile" ON customers FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Customers can read own orders" ON orders FOR SELECT USING (auth.uid() IN (SELECT user_id FROM customers WHERE id = customer_id));
CREATE POLICY "Customers can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() IN (SELECT user_id FROM customers WHERE id = customer_id));

CREATE POLICY "Customers can read own order items" ON order_items FOR SELECT USING (order_id IN (SELECT id FROM orders WHERE customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())));
CREATE POLICY "Customers can insert own order items" ON order_items FOR INSERT WITH CHECK (order_id IN (SELECT id FROM orders WHERE customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())));

CREATE POLICY "Customers can manage own cart" ON cart_items FOR ALL USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));

-- SEED DATA: Categories
INSERT INTO parts_categories (name, slug, description, sort_order) VALUES
  ('LED Heads & Lamps', 'led-heads', 'Replacement LED heads, lamps, and light modules for all Mickala tower models', 1),
  ('Mast & Tower Sections', 'mast-sections', 'Mast sections, telescopic assemblies, and structural components', 2),
  ('Electrical & Wiring', 'electrical', 'Wiring harnesses, connectors, control boxes, and electrical components', 3),
  ('Trailer & Undercarriage', 'trailer', 'Axles, wheels, suspension, drawbars, and trailer parts', 4),
  ('Hydraulics & Pneumatics', 'hydraulics', 'Hydraulic rams, pumps, hoses, and pneumatic system parts', 5),
  ('Hardware & Fasteners', 'hardware', 'Bolts, nuts, washers, pins, and general hardware', 6),
  ('Filters & Fluids', 'filters', 'Oil filters, fuel filters, air filters, and fluids for maintenance', 7),
  ('Safety & Accessories', 'safety', 'Safety signage, guards, extinguishers, and site accessories', 8);

-- SEED DATA: Sample Parts
INSERT INTO parts (category_id, sku, name, slug, description, price, unit, stock_quantity, min_order_qty, specs, compatible_with) 
VALUES
  ((SELECT id FROM parts_categories WHERE slug = 'led-heads'), 'MLT-LED-100', '100W LED Light Head', '100w-led-light-head', 'High-output 100W LED light head with integrated heat sink. Suitable for all Mickala MLT series lighting towers.', 895.00, 'each', 50, 1, '{"wattage": "100W", "lumens": "14000", "color_temp": "5000K", "voltage": "24V DC", "ip_rating": "IP65"}', ARRAY['MLT-SA', 'MLT-DA', 'MLT-SM']),
  ((SELECT id FROM parts_categories WHERE slug = 'led-heads'), 'MLT-LED-200', '200W LED Light Head', '200w-led-light-head', 'Heavy-duty 200W LED light head for high-mast and large area illumination requirements.', 1650.00, 'each', 30, 1, '{"wattage": "200W", "lumens": "28000", "color_temp": "5000K", "voltage": "48V DC", "ip_rating": "IP65"}', ARRAY['MLT-SA', 'MLT-DA', 'MLT-SM', 'MLT-LR']),
  ((SELECT id FROM parts_categories WHERE slug = 'electrical'), 'MLT-CBL-10', '10m Power Lead 24V', '10m-power-lead-24v', 'Heavy-duty 10-metre power lead with Anderson plug connectors. Rated for 24V DC systems.', 245.00, 'each', 100, 1, '{"length": "10m", "voltage": "24V DC", "connector": "Anderson SB175", "cable_type": "2-core 6mm²"}', ARRAY['MLT-SA', 'MLT-DA', 'MLT-SM']),
  ((SELECT id FROM parts_categories WHERE slug = 'electrical'), 'MLT-CTL-01', 'Control Panel Assembly', 'control-panel-assembly', 'Complete control panel with digital display, circuit breakers, and master switch. Pre-wired and tested.', 1200.00, 'each', 15, 1, '{"type": "Digital", "inputs": "4 x circuit breaker", "display": "LCD", "voltage": "24V/48V"}', ARRAY['MLT-SA', 'MLT-DA', 'MLT-SM', 'MLT-LR']),
  ((SELECT id FROM parts_categories WHERE slug = 'mast-sections'), 'MLT-MST-3M', '3m Mast Section (Telescopic)', '3m-mast-section-telescopic', 'Aluminium telescopic mast section. 3m extended length with locking collar mechanism.', 680.00, 'each', 25, 1, '{"material": "Aluminium 6061-T6", "extended_length": "3m", "collapsed_length": "1.5m", "weight": "18kg"}', ARRAY['MLT-SA', 'MLT-DA']),
  ((SELECT id FROM parts_categories WHERE slug = 'trailer'), 'MLT-TRL-01', 'Single Axle Hub Assembly', 'single-axle-hub-assembly', 'Complete hub assembly for single axle Mickala trailers. Includes bearings, seals, and studs.', 450.00, 'each', 20, 1, '{"type": "Single axle", "stud_pattern": "5 x 165mm", "bearing_type": "LM67048/10", "capacity": "2000kg"}', ARRAY['MLT-SA']),
  ((SELECT id FROM parts_categories WHERE slug = 'hardware'), 'MLT-HDW-M12', 'M12 x 80mm HT Bolt Kit (10pk)', 'm12-bolt-kit', 'Grade 8.8 high-tensile M12 bolts with nyloc nuts and flat washers. 10-pack.', 28.50, 'pack', 500, 1, '{"size": "M12", "length": "80mm", "grade": "8.8", "finish": "Zinc plated"}', ARRAY['MLT-SA', 'MLT-DA', 'MLT-SM', 'MLT-LR']),
  ((SELECT id FROM parts_categories WHERE slug = 'filters'), 'MLT-FIL-01', 'Fuel Filter Assembly', 'fuel-filter-assembly', 'Complete fuel filter assembly with water separator. Compatible with Kubota diesel engines.', 85.00, 'each', 60, 1, '{"type": "Fuel/Water separator", "thread": "1/4 NPT", "micron": "10", "compatible_engine": "Kubota D722"}', ARRAY['MLT-SA', 'MLT-DA']),
  ((SELECT id FROM parts_categories WHERE slug = 'safety'), 'MLT-SFT-01', 'Safety Light Beacon (Amber)', 'safety-light-beacon-amber', 'LED amber rotating beacon for tower top. 360° visibility, magnetic mount.', 175.00, 'each', 40, 1, '{"type": "LED rotating", "color": "Amber", "voltage": "12-24V DC", "mount": "Magnetic", "visibility": "360°"}', ARRAY['MLT-SA', 'MLT-DA', 'MLT-SM', 'MLT-LR']),
  ((SELECT id FROM parts_categories WHERE slug = 'hydraulics'), 'MLT-HYD-01', 'Hydraulic Ram (1.5m Stroke)', 'hydraulic-ram-1-5m', 'Double-acting hydraulic ram for mast elevation. 1.5m stroke with 2T capacity.', 890.00, 'each', 10, 1, '{"type": "Double acting", "stroke": "1.5m", "capacity": "2T", "pressure": "180 bar"}', ARRAY['MLT-SM', 'MLT-LR']);
