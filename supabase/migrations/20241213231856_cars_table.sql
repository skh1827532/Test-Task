CREATE TABLE public.cars (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Basic car information
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    
    -- Pricing and financial details
    price NUMERIC(10, 2) NOT NULL,
    
    -- Image storage
    image_url TEXT,
    
    -- Additional car details
    mileage INTEGER,
    color TEXT,
    transmission TEXT,
    fuel_type TEXT,
    
    -- Condition and ownership
    condition TEXT CHECK (condition IN ('new', 'used', 'certified')),
    owner_count INTEGER DEFAULT 1,
    
    -- Tracking and metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Optional soft delete
    deleted_at TIMESTAMPTZ
);